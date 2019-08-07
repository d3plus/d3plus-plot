/* eslint no-cond-assign: 0 */

import {extent, max, merge, min, range, sum} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";
import * as d3Shape from "d3-shape";

import {AxisBottom, AxisLeft, AxisRight, AxisTop, date} from "d3plus-axis";
import {colorAssign} from "d3plus-color";
import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

import {default as BarBuffer} from "./buffers/Bar.js";
import {default as BoxBuffer} from "./buffers/Box.js";
import {default as CircleBuffer} from "./buffers/Circle.js";
import {default as LineBuffer} from "./buffers/Line.js";
import {default as RectBuffer} from "./buffers/Rect.js";

/**
    @desc Logic for determining default sizes of shapes using the sizeScaleD3 internal function.
    @private
*/
function defaultSize(d) {
  return this._sizeScaleD3(this._size ? this._size(d) : null);
}

/**
    @desc Logic for determining stackOrder ascending using groups.
    @private
*/
function stackOrderAscending(series) {
  const sums = series.map(stackSum);
  const keys = series.map(d => d.key.split("_")[0]);
  return d3Shape.stackOrderNone(series).sort((a, b) => keys[b].localeCompare(keys[a]) || sums[a] - sums[b]);
}

/**
    @desc Logic for determining stackOrder descending using groups.
    @private
*/
function stackOrderDescending(series) {
  return stackOrderAscending(series).reverse();
}

/**
    @desc Logic for determining default sum of shapes using the stackSum function used in d3Shape.
    @private
*/
function stackSum(series) {
  let i = -1, s = 0, v;
  const n = series.length;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

/**
    @class Plot
    @extends Viz
    @desc Creates an x/y plot based on an array of data.
*/
export default class Plot extends Viz {

  /**
      @memberof Plot
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
  */
  constructor() {

    super();
    this._annotations = [];
    this._backgroundConfig = {
      duration: 0,
      fill: "transparent"
    };
    this._barPadding = 0;
    this._buffer = {
      Bar: BarBuffer,
      Box: BoxBuffer,
      Circle: CircleBuffer,
      Line: LineBuffer,
      Rect: RectBuffer
    };
    this._confidenceConfig = {
      fillOpacity: constant(0.5)
    };
    this._discreteCutoff = 100;
    this._groupPadding = 5;
    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Area: {
        label: (d, i) => this._stacked ? this._drawLabel(d, i) : false,
        labelConfig: {
          fontResize: true
        }
      },
      ariaLabel: (d, i) => {
        let ariaLabelStr = "";
        if (d.nested) ariaLabelStr = `${this._drawLabel(d.data, d.i)}`;
        else {
          ariaLabelStr = `${this._drawLabel(d, i)}`;
          if (this._x(d, i) !== undefined) ariaLabelStr += `, x: ${this._x(d, i)}`;
          if (this._y(d, i) !== undefined) ariaLabelStr += `, y: ${this._y(d, i)}`;
          if (this._x2(d, i) !== undefined) ariaLabelStr += `, x2: ${this._x2(d, i)}`;
          if (this._y2(d, i) !== undefined) ariaLabelStr += `, y2: ${this._y2(d, i)}`;
        }
        return `${ariaLabelStr}.`;
      },
      Bar: {
        labelConfig: {
          textAnchor: () => this._discrete === "x" ? "middle" : "end",
          verticalAlign: () => this._discrete === "x" ? "top" : "middle"
        }
      },
      Circle: {
        r: defaultSize.bind(this)
      },
      Line: {
        fill: constant("none"),
        label: false,
        stroke: (d, i) => colorAssign(this._id(d, i)),
        strokeWidth: constant(1)
      },
      Rect: {
        height: d => defaultSize.bind(this)(d) * 2,
        width: d => defaultSize.bind(this)(d) * 2
      }
    });
    this._shapeOrder = ["Area", "Path", "Bar", "Box", "Line", "Rect", "Circle"];
    this._shapeSort = (a, b) => this._shapeOrder.indexOf(a) - this._shapeOrder.indexOf(b);
    this._sizeMax = 20;
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._stackOffset = d3Shape.stackOffsetDiverging;
    this._stackOrder = stackOrderDescending;
    this._timelineConfig = assign(this._timelineConfig, {brushing: true});

    this._x = accessor("x");
    this._xAxis = new AxisBottom().align("end");
    this._xTest = new AxisBottom().align("end").gridSize(0);
    this._xConfig = {};
    this._xCutoff = 150;

    this._x2 = accessor("x2");
    this._x2Axis = new AxisTop().align("start");
    this._x2Test = new AxisTop().align("start").gridSize(0);
    this._x2Config = {
      padding: 0
    };

    this._y = accessor("y");
    this._yAxis = new AxisLeft().align("start");
    this._yTest = new AxisLeft().align("start").gridSize(0);
    this._yConfig = {
      gridConfig: {
        stroke: d => {
          const domain = this._yAxis.domain();
          return domain[domain.length - 1] === d.id ? "transparent" : "#ccc";
        }
      }
    };
    this._yCutoff = 150;

    this._y2 = accessor("y2");
    this._y2Axis = new AxisRight().align("end");
    this._y2Test = new AxisLeft().align("end").gridSize(0);
    this._y2Config = {};

  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {

    if (!this._filteredData.length) return this;

    const stackGroup = (d, i) => this._stacked
      ? `${this._groupBy.length > 1 ? this._ids(d, i).slice(0, -1).join("_") : "group"}`
      : `${this._ids(d, i).join("_")}`;

    let data = this._filteredData.map((d, i) => ({
      __d3plus__: true,
      data: d,
      group: stackGroup(d, i),
      i,
      hci: this._confidence && this._confidence[1] && this._confidence[1](d, i),
      id: this._ids(d, i).slice(0, this._drawDepth + 1).join("_"),
      lci: this._confidence && this._confidence[0] && this._confidence[0](d, i),
      shape: this._shape(d, i),
      x: this._x(d, i),
      x2: this._x2(d, i),
      y: this._y(d, i),
      y2: this._y2(d, i)
    }));

    this._formattedData = data;

    if (this._size) {
      const rExtent = extent(data, d => this._size(d.data));
      this._sizeScaleD3 = () => this._sizeMin;
      this._sizeScaleD3 = scales[`scale${this._sizeScale.charAt(0).toUpperCase()}${this._sizeScale.slice(1)}`]()
        .domain(rExtent)
        .range([rExtent[0] === rExtent[1] ? this._sizeMax : min([this._sizeMax / 2, this._sizeMin]), this._sizeMax]);
    }
    else {
      this._sizeScaleD3 = () => this._sizeMin;
    }

    const x2Exists = data.some(d => d.x2 !== undefined),
          y2Exists = data.some(d => d.y2 !== undefined);

    const height = this._height - this._margin.top - this._margin.bottom,
          opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
          opp2 = this._discrete ? this._discrete === "x" ? "y2" : "x2" : undefined,
          opps = [opp, opp2],
          parent = this._select,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const x2Time = this._time && data[0].x2 === this._time(data[0].data, data[0].i),
          xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
          y2Time = this._time && data[0].y2 === this._time(data[0].data, data[0].i),
          yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (xTime) d.x = date(d.x);
      if (x2Time) d.x2 = date(d.x2);
      if (yTime) d.y = date(d.y);
      if (y2Time) d.y2 = date(d.y2);
      d.discrete = d.shape === "Bar" ? `${d[this._discrete]}_${d.group}` : `${d[this._discrete]}`;
    }

    let discreteKeys, domains, stackData, stackKeys;
    if (this._stacked) {

      const groupValues = nest()
        .key(d => d.group)
        .entries(data)
        .reduce((obj, d) => {
          if (!obj[d.key]) obj[d.key] = 0;
          obj[d.key] += sum(d.values, dd => dd[opp]);
          return obj;
        }, {});

      data = data.sort((a, b) => {
        if (this[`_${this._discrete}Sort`]) return this[`_${this._discrete}Sort`](a.data, b.data);
        const a1 = a[this._discrete], b1 = b[this._discrete];
        if (a1 - b1 !== 0) return a1 - b1;
        if (a.group !== b.group) return groupValues[b.group] - groupValues[a.group];
        return b[opp] - a[opp];
      });

      discreteKeys = Array.from(new Set(data.map(d => d.discrete)));
      stackKeys = Array.from(new Set(data.map(d => d.id)));

      stackData = nest()
        .key(d => d.discrete)
        .entries(data)
        .map(d => d.values);

      stackData.forEach(g => {
        const ids = Array.from(new Set(g.map(d => d.id)));
        if (ids.length < stackKeys.length) {
          stackKeys.forEach(k => {
            if (!ids.includes(k)) {
              const d = data.filter(d => d.id === k)[0];
              if (d.shape === "Area") {
                const group = stackGroup(d.data, d.i);
                const fillerPoint = {
                  __d3plus__: true,
                  data: d.data,
                  discrete: d.shape === "Bar" ? `${g[0][this._discrete]}_${group}` : `${g[0][this._discrete]}`,
                  group,
                  id: k,
                  shape: d.shape,
                  [this._discrete]: g[0][this._discrete],
                  [opp]: 0
                };
                data.push(fillerPoint);
              }
            }
          });
        }
      });

      if (this[`_${this._discrete}Sort`]) {
        data.sort((a, b) => this[`_${this._discrete}Sort`](a.data, b.data));
      }
      else {
        data.sort((a, b) => a[this._discrete] - b[this._discrete]);
      }

      const order = this._stackOrder;

      if (order instanceof Array) stackKeys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      else if (order === d3Shape.stackOrderNone) stackKeys.sort((a, b) => a.localeCompare(b));

      stackData = d3Shape.stack()
        .keys(stackKeys)
        .offset(this._stackOffset)
        .order(order instanceof Array ? d3Shape.stackOrderNone : order)
        .value((group, key) => {
          const d = group.filter(g => g.id === key);
          return d.length ? d[0][opp] : 0;
        })(stackData);

      domains = {
        [this._discrete]: extent(data, d => d[this._discrete]),
        [opp]: [min(stackData.map(g => min(g.map(p => p[0])))), max(stackData.map(g => max(g.map(p => p[1]))))]
      };

    }
    else {
      const xData = this._discrete === "x" ? data.map(d => d.x) : data.map(d => d.x)
        .concat(this._confidence && this._confidence[0] ? data.map(d => d.lci) : [])
        .concat(this._confidence && this._confidence[1] ? data.map(d => d.hci) : []);

      const x2Data = this._discrete === "x" ? data.map(d => d.x2) : data.map(d => d.x2)
        .concat(this._confidence && this._confidence[0] ? data.map(d => d.lci) : [])
        .concat(this._confidence && this._confidence[1] ? data.map(d => d.hci) : []);

      const yData = this._discrete === "y" ? data.map(d => d.y) : data.map(d => d.y)
        .concat(this._confidence && this._confidence[0] ? data.map(d => d.lci) : [])
        .concat(this._confidence && this._confidence[1] ? data.map(d => d.hci) : []);

      const y2Data = this._discrete === "y" ? data.map(d => d.y2) : data.map(d => d.y2)
        .concat(this._confidence && this._confidence[0] ? data.map(d => d.lci) : [])
        .concat(this._confidence && this._confidence[1] ? data.map(d => d.hci) : []);

      if (this[`_${this._discrete}Sort`]) {
        data.sort((a, b) => this[`_${this._discrete}Sort`](a.data, b.data));
      }
      else {
        data.sort((a, b) => a[this._discrete] - b[this._discrete]);
      }

      domains = {
        x: this._xSort ? Array.from(new Set(data.filter(d => d.x).sort((a, b) => this._xSort(a.data, b.data)).map(d => d.x))) : extent(xData, d => d),
        x2: this._x2Sort ? Array.from(new Set(data.filter(d => d.x2).sort((a, b) => this._x2Sort(a.data, b.data)).map(d => d.x2))) : extent(x2Data, d => d),
        y: this._ySort ? Array.from(new Set(data.filter(d => d.y).sort((a, b) => this._ySort(a.data, b.data)).map(d => d.y))) : extent(yData, d => d),
        y2: this._y2Sort ? Array.from(new Set(data.filter(d => d.y2).sort((a, b) => this._y2Sort(a.data, b.data)).map(d => d.y2))) : extent(y2Data, d => d)
      };
    }

    let xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
        xScale = this._xSort ? "Point" : "Linear";

    if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
    if (xDomain[1] === void 0) xDomain[1] = domains.x[1];

    if (xTime) {
      xDomain = xDomain.map(date);
      xScale = "Time";
    }
    else if (this._discrete === "x") {
      xDomain = Array.from(new Set(data.filter(d => d.x).sort((a, b) => this._xSort ? this._xSort(a.data, b.data) : a.x - b.x).map(d => d.x)));
      xScale = "Point";
    }

    let x2Domain = this._x2Domain ? this._x2Domain.slice() : domains.x2,
        x2Scale = this._x2Sort ? "Point" : "Linear";

    if (x2Domain && x2Domain[0] === void 0) x2Domain[0] = domains.x2[0];
    if (x2Domain && x2Domain[1] === void 0) x2Domain[1] = domains.x2[1];

    if (x2Time) {
      x2Domain = x2Domain.map(date);
      x2Scale = "Time";
    }
    else if (this._discrete === "x") {
      x2Domain = Array.from(new Set(data.filter(d => d.x2).sort((a, b) => this._x2Sort ? this._x2Sort(a.data, b.data) : a.x2 - b.x2).map(d => d.x2)));
      x2Scale = "Point";
    }

    let yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
        yScale = this._ySort ? "Point" : "Linear";

    if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
    if (yDomain[1] === void 0) yDomain[1] = domains.y[1];

    let y2Domain = this._y2Domain ? this._y2Domain.slice() : domains.y2,
        y2Scale = this._y2Sort ? "Point" : "Linear";

    if (y2Domain && y2Domain[0] === void 0) y2Domain[0] = domains.y2[0];
    if (y2Domain && y2Domain[1] === void 0) y2Domain[1] = domains.y2[1];

    if (yTime) {
      yDomain = yDomain.map(date);
      yScale = "Time";
    }
    else if (this._discrete === "y") {
      yDomain = Array.from(new Set(data.sort((a, b) => this._ySort ? this._ySort(a.data, b.data) : a.y - b.y).map(d => d.y)));
      yScale = "Point";

      y2Domain = Array.from(new Set(data.sort((a, b) => this._y2Sort ? this._y2Sort(a.data, b.data) : a.y2 - b.y2).map(d => d.y2)));
      y2Scale = "Point";
    }

    if (y2Time) {
      y2Domain = y2Domain.map(date);
      y2Scale = "Time";
    }

    domains = {x: xDomain, x2: x2Domain || xDomain, y: yDomain, y2: y2Domain || yDomain};

    opps.forEach(opp => {
      if (this[`_${opp}Config`].domain) {
        const d = this[`_${opp}Config`].domain;
        if (this._discrete === "x") d.reverse();
        domains[opp] = d;
      }
      else if (opp && this._baseline !== void 0) {
        const b = this._baseline;
        if (domains[opp] && domains[opp][0] > b) domains[opp][0] = b;
        else if (domains[opp] && domains[opp][1] < b) domains[opp][1] = b;
      }
    });

    let x = scales[`scale${xScale}`]().domain(domains.x).range(range(0, width + 1, width / (domains.x.length - 1))),
        x2 = scales[`scale${x2Scale}`]().domain(domains.x2).range(range(0, width + 1, width / (domains.x2.length - 1))),
        y = scales[`scale${yScale}`]().domain(domains.y.reverse()).range(range(0, height + 1, height / (domains.y.length - 1))),
        y2 = scales[`scale${y2Scale}`]().domain(domains.y2.reverse()).range(range(0, height + 1, height / (domains.y2.length - 1)));

    const shapeData = nest()
      .key(d => d.shape)
      .entries(data)
      .sort((a, b) => this._shapeSort(a.key, b.key));

    const oppScale = this._discrete === "x" ? yScale : xScale;
    if (this._xConfig.scale !== "log" && this._yConfig.scale !== "log" && oppScale !== "Point") {
      shapeData.forEach(d => {
        if (this._buffer[d.key]) {
          const res = this._buffer[d.key].bind(this)({data: d.values, x, y, config: this._shapeConfig[d.key]});
          if (this._xConfig.scale !== "log") x = res[0];
          if (this._yConfig.scale !== "log") y = res[1];
          const res2 = this._buffer[d.key].bind(this)({data: d.values, x: x2, y: y2, x2: true, y2: true, config: this._shapeConfig[d.key]});
          if (this._x2Config.scale !== "log") x2 = res2[0];
          if (this._y2Config.scale !== "log") y2 = res2[1];
        }
      });
    }
    xDomain = x.domain();
    x2Domain = x2.domain();
    yDomain = y.domain();
    y2Domain = y2.domain();

    const defaultConfig = {
      barConfig: {"stroke-width": 0},
      gridSize: 0,
      labels: [],
      title: false,
      tickSize: 0
    };

    const defaultX2Config = x2Exists ? {} : defaultConfig;
    const defaultY2Config = y2Exists ? {} : defaultConfig;
    const showX = this._discrete === "x" && this._width > this._discreteCutoff || this._width > this._xCutoff;
    const showY = this._discrete === "y" && this._height > this._discreteCutoff || this._height > this._yCutoff;

    const yC = {
      gridConfig: {stroke: !this._discrete || this._discrete === "x" ? this._yTest.gridConfig().stroke : "transparent"},
      locale: this._locale,
      scalePadding: y.padding ? y.padding() : 0
    };
    if (!showX) {
      yC.barConfig = {stroke: "transparent"};
      yC.tickSize = 0;
      yC.shapeConfig = {
        labelBounds: (d, i) => {
          const {width, y} = d.labelBounds;
          const height = this._height / 2;
          const x = i ? -height : 0;
          return {x, y, width, height};
        },
        labelConfig: {
          padding: 0,
          rotate: 0,
          verticalAlign: d => d.id === yTicks[0] ? "top" : "bottom"
        },
        labelRotation: false
      };
    }

    const testGroup = elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}),
          x2Ticks = this._discrete === "x" && !x2Time ? domains.x2 : undefined,
          xTicks = !showY ? extent(domains.x) : this._discrete === "x" && !xTime ? domains.x : undefined,
          y2Ticks = this._discrete === "y" && !y2Time ? domains.y2 : undefined,
          yTicks = !showX ? extent(domains.y) : this._discrete === "y" && !yTime ? domains.y : undefined;

    if (showY) {
      this._yTest
        .domain(yDomain)
        .height(height)
        .maxSize(width / 2)
        .range([undefined, undefined])
        .scale(yScale.toLowerCase())
        .select(testGroup.node())
        .ticks(yTicks)
        .width(width)
        .config(yC)
        .config(this._yConfig)
        .render();
    }

    let yBounds = this._yTest.outerBounds();
    let yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

    if (y2Exists) {
      this._y2Test
        .domain(y2Domain)
        .height(height)
        .range([undefined, undefined])
        .scale(y2Scale.toLowerCase())
        .select(testGroup.node())
        .ticks(y2Ticks)
        .width(width)
        .config(yC)
        .config(defaultY2Config)
        .config(this._y2Config)
        .render();
    }

    let y2Bounds = this._y2Test.outerBounds();
    let y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;

    const xC = {
      gridConfig: {stroke: !this._discrete || this._discrete === "y" ? this._xTest.gridConfig().stroke : "transparent"},
      locale: this._locale,
      scalePadding: x.padding ? x.padding() : 0
    };
    if (!showY) {
      xC.barConfig = {stroke: "transparent"};
      xC.tickSize = 0;
      xC.shapeConfig = {
        labelBounds: (d, i) => {
          const {height, y} = d.labelBounds;
          const width = this._width / 2;
          const x = i ? -width : 0;
          return {x, y, width, height};
        },
        labelConfig: {
          padding: 0,
          rotate: 0,
          textAnchor: d => d.id === xTicks[0] ? "start" : "end"
        },
        labelRotation: false
      };
    }

    if (showX) {
      this._xTest
        .domain(xDomain)
        .height(height)
        .maxSize(height / 2)
        .range([undefined, undefined])
        .scale(xScale.toLowerCase())
        .select(testGroup.node())
        .ticks(xTicks)
        .width(width)
        .config(xC)
        .config(this._xConfig)
        .render();
    }

    if (x2Exists) {
      this._x2Test
        .domain(x2Domain)
        .height(height)
        .range([undefined, undefined])
        .scale(x2Scale.toLowerCase())
        .select(testGroup.node())
        .ticks(x2Ticks)
        .width(width)
        .config(xC)
        .tickSize(0)
        .config(defaultX2Config)
        .config(this._x2Config)
        .render();
    }

    const xTestRange = this._xTest._getRange();
    const x2TestRange = this._x2Test._getRange();

    const x2Bounds = this._x2Test.outerBounds();
    const x2Height = x2Exists ? x2Bounds.height + this._x2Test.padding() : 0;

    let xOffsetLeft = max([yWidth, xTestRange[0], x2TestRange[0]]);

    if (showX) {
      this._xTest
        .range([xOffsetLeft, undefined])
        .render();
    }

    const topOffset = showY ? this._yTest.shapeConfig().labelConfig.fontSize() / 2 : 0;

    let xOffsetRight = max([y2Width, width - xTestRange[1], width - x2TestRange[1]]);
    const xBounds = this._xTest.outerBounds();
    const xHeight = xBounds.height + (showY ? this._xTest.padding() : 0);

    this._padding.left += xOffsetLeft;
    this._padding.right += xOffsetRight;
    this._padding.bottom += xHeight;
    this._padding.top += x2Height + topOffset;

    super._draw(callback);

    const horizontalMargin = this._margin.left + this._margin.right;
    const verticalMargin = this._margin.top + this._margin.bottom;
    let yRange = [x2Height, height - (xHeight + topOffset + verticalMargin)];

    if (showY) {
      this._yTest
        .domain(yDomain)
        .height(height)
        .maxSize(width / 2)
        .range(yRange)
        .scale(yScale.toLowerCase())
        .select(testGroup.node())
        .ticks(yTicks)
        .width(width)
        .config(yC)
        .config(this._yConfig)
        .render();
    }

    yBounds = this._yTest.outerBounds();
    yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;
    xOffsetLeft = max([yWidth, xTestRange[0], x2TestRange[0]]);

    if (y2Exists) {
      this._y2Test
        .config(yC)
        .domain(y2Domain)
        .gridSize(0)
        .height(height)
        .range(yRange)
        .scale(y2Scale.toLowerCase())
        .select(testGroup.node())
        .width(width - max([0, xOffsetRight - y2Width]))
        .title(false)
        .config(this._y2Config)
        .config(defaultY2Config)
        .render();
    }

    y2Bounds = this._y2Test.outerBounds();
    y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
    xOffsetRight = max([0, y2Width, width - xTestRange[1], width - x2TestRange[1]]);
    const xRange = [xOffsetLeft, width - (xOffsetRight + horizontalMargin)];

    const rectGroup = elem("g.d3plus-plot-background", {parent, transition});

    const transform = `translate(${this._margin.left}, ${this._margin.top + x2Height + topOffset})`;
    const x2Transform = `translate(${this._margin.left}, ${this._margin.top + topOffset})`;

    const xGroup = showX && elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}});
    const x2Group = x2Exists && elem("g.d3plus-plot-x2-axis", {parent, transition, enter: {transform: x2Transform}, update: {transform: x2Transform}});

    const xTrans = xOffsetLeft > yWidth ? xOffsetLeft - yWidth : 0;
    const yTransform = `translate(${this._margin.left + xTrans}, ${this._margin.top + topOffset})`;
    const yGroup = showY && elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform: yTransform}, update: {transform: yTransform}});

    const y2Transform = `translate(-${this._margin.right}, ${this._margin.top + topOffset})`;
    const y2Group = y2Exists && elem("g.d3plus-plot-y2-axis", {parent, transition, enter: {transform: y2Transform}, update: {transform: y2Transform}});

    this._xAxis
      .domain(xDomain)
      .height(height - (x2Height + topOffset + verticalMargin))
      .maxSize(height / 2)
      .range(xRange)
      .scale(xScale.toLowerCase())
      .select(showX ? xGroup.node() : undefined)
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .config(this._xConfig)
      .render();

    if (x2Exists) {
      this._x2Axis
        .domain(x2Domain)
        .height(height - (xHeight + topOffset + verticalMargin))
        .range(xRange)
        .scale(x2Scale.toLowerCase())
        .select(x2Group.node())
        .ticks(x2Ticks)
        .width(width)
        .config(xC)
        .config(defaultX2Config)
        .config(this._x2Config)
        .render();
    }

    x = (d, x) => {
      if (x === "x2") {
        if (this._x2Config.scale === "log" && d === 0) d = x2Domain[0] < 0 ? -1 : 1;
        return this._x2Axis._getPosition.bind(this._x2Axis)(d);
      }
      else {
        if (this._xConfig.scale === "log" && d === 0) d = xDomain[0] < 0 ? -1 : 1;
        return this._xAxis._getPosition.bind(this._xAxis)(d);
      }
    };

    yRange = [this._xAxis.outerBounds().y + x2Height, height - (xHeight + topOffset + verticalMargin)];

    this._yAxis
      .domain(yDomain)
      .height(height)
      .maxSize(width / 2)
      .range(yRange)
      .scale(yScale.toLowerCase())
      .select(showY ? yGroup.node() : undefined)
      .ticks(yTicks)
      .width(xRange[xRange.length - 1])
      .config(yC)
      .config(this._yConfig)
      .render();

    if (y2Exists) {
      this._y2Axis
        .config(yC)
        .domain(y2Exists ? y2Domain : yDomain)
        .gridSize(0)
        .height(height)
        .range(yRange)
        .scale(y2Exists ? y2Scale.toLowerCase() : yScale.toLowerCase())
        .select(y2Group.node())
        .width(width - max([0, xOffsetRight - y2Width]))
        .title(false)
        .config(this._y2Config)
        .config(defaultY2Config)
        .render();
    }

    y = (d, y) => {
      if (y === "y2") {
        if (this._y2Config.scale === "log" && d === 0) d = y2Domain[0] < 0 ? -1 : 1;
        return this._y2Axis._getPosition.bind(this._y2Axis)(d) - x2Height;
      }
      else {
        if (this._yConfig.scale === "log" && d === 0) d = yDomain[0] < 0 ? -1 : 1;
        return this._yAxis._getPosition.bind(this._yAxis)(d) - x2Height;
      }
    };

    new shapes.Rect()
      .data([{}])
      .select(rectGroup.node())
      .x(xRange[0] + (xRange[1] - xRange[0]) / 2)
      .width(xRange[1] - xRange[0])
      .y(this._margin.top + topOffset + yRange[0] + (yRange[1] - yRange[0]) / 2)
      .height(yRange[1] - yRange[0])
      .config(this._backgroundConfig)
      .render();

    const annotationGroup = elem("g.d3plus-plot-annotations", {parent, transition, enter: {transform}, update: {transform}}).node();
    this._annotations.forEach(annotation => {
      new shapes[annotation.shape]()
        .config(annotation)
        .config({
          x: d => d.x2 ? x(d.x2, "x2") : x(d.x),
          x0: this._discrete === "x" ? d => d.x2 ? x(d.x2, "x2") : x(d.x) : x(domains.x[0]),
          x1: this._discrete === "x" ? null : d => d.x2 ? x(d.x2, "x2") : x(d.x),
          y: d => d.y2 ? y(d.y2, "y2") : y(d.y),
          y0: this._discrete === "y" ? d => d.y2 ? y(d.y2, "y2") : y(d.y) : y(domains.y[1]) - yOffset,
          y1: this._discrete === "y" ? null : d => d.y2 ? y(d.y2, "y2") : y(d.y) - yOffset
        })
        .select(annotationGroup)
        .render();
    });

    let yOffset = this._xAxis.barConfig()["stroke-width"];
    if (yOffset) yOffset /= 2;

    const shapeConfig = {
      duration: this._duration,
      label: d => this._drawLabel(d.data, d.i),
      select: elem("g.d3plus-plot-shapes", {parent, transition, enter: {transform}, update: {transform}}).node(),
      x: d => d.x2 ? x(d.x2, "x2") : x(d.x),
      x0: this._discrete === "x" ? d => d.x2 ? x(d.x2, "x2") : x(d.x) : x(domains.x[0]),
      x1: this._discrete === "x" ? null : d => d.x2 ? x(d.x2, "x2") : x(d.x),
      y: d => d.y2 ? y(d.y2, "y2") : y(d.y),
      y0: this._discrete === "y" ? d => d.y2 ? y(d.y2, "y2") : y(d.y) : y(domains.y[1]) - yOffset,
      y1: this._discrete === "y" ? null : d => d.y2 ? y(d.y2, "y2") : y(d.y) - yOffset
    };

    if (this._stacked) {
      const scale = opp === "x" ? x : y;
      shapeConfig[`${opp}`] = shapeConfig[`${opp}0`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(domains[opp][opp === "x" ? 0 : 1]);
      };
      shapeConfig[`${opp}1`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(domains[opp][opp === "x" ? 0 : 1]);
      };
    }

    const events = Object.keys(this._on);
    shapeData.forEach(d => {

      const s = new shapes[d.key]().config(shapeConfig).data(d.values);

      if (d.key === "Bar") {

        let space;
        const scale = this._discrete === "x" ? x : y;
        const vals = (this._discrete === "x" ? xDomain : yDomain).filter(d => typeof d !== "string" || d.indexOf("d3plus-buffer-") < 0);
        const range = this._discrete === "x" ? xRange : yRange;
        if (vals.length > 1) space = scale(vals[1]) - scale(vals[0]);
        else space = range[range.length - 1] - range[0];
        space -= this._groupPadding;

        let barSize = space;

        const groups = nest()
          .key(d => d[this._discrete])
          .key(d => d.group)
          .entries(d.values);

        const ids = merge(groups.map(d => d.values.map(v => v.key)));
        const uniqueIds = Array.from(new Set(ids));

        if (max(groups.map(d => d.values.length)) === 1) {
          s[this._discrete]((d, i) => shapeConfig[this._discrete](d, i));
        }
        else {

          barSize = (barSize - this._barPadding * uniqueIds.length - 1) / uniqueIds.length;

          const offset = space / 2 - barSize / 2;

          const xMod = scales.scaleLinear()
            .domain([0, uniqueIds.length - 1])
            .range([-offset, offset]);

          s[this._discrete]((d, i) => shapeConfig[this._discrete](d, i) + xMod(uniqueIds.indexOf(d.group)));

        }

        s.width(barSize);
        s.height(barSize);

      }
      else if (d.key === "Line" && this._confidence) {

        const areaConfig = Object.assign({}, shapeConfig);
        const key = this._discrete === "x" ? "y" : "x";
        const scaleFunction = this._discrete === "x" ? y : x;
        areaConfig[`${key}0`] = d => scaleFunction(this._confidence[0] ? d.lci : d[key]);
        areaConfig[`${key}1`] = d => scaleFunction(this._confidence[1] ? d.hci : d[key]);

        const area = new shapes.Area().config(areaConfig).data(d.values);
        const confidenceConfig = Object.assign(this._shapeConfig, this._confidenceConfig);
        area.config(configPrep.bind(this)(confidenceConfig, "shape", "Area")).render();
        this._shapes.push(area);
      }

      const classEvents = events.filter(e => e.includes(`.${d.key}`)),
            globalEvents = events.filter(e => !e.includes(".")),
            shapeEvents = events.filter(e => e.includes(".shape"));
      for (let e = 0; e < globalEvents.length; e++) s.on(globalEvents[e], d => this._on[globalEvents[e]](d.data, d.i));
      for (let e = 0; e < shapeEvents.length; e++) s.on(shapeEvents[e], d => this._on[shapeEvents[e]](d.data, d.i));
      for (let e = 0; e < classEvents.length; e++) s.on(classEvents[e], d => this._on[classEvents[e]](d.data, d.i));

      s.config(configPrep.bind(this)(this._shapeConfig, "shape", d.key)).render();
      this._shapes.push(s);

    });

    return this;

  }

  /**
      @memberof Plot
      @desc Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.
      @param {Array|Object} *annotations* = []
      @chainable
  */
  annotations(_) {
    return arguments.length ? (this._annotations = _ instanceof Array ? _ : [_], this) : this._annotations;
  }

  /**
       @memberof Plot
       @desc A d3plus-shape configuration Object used for styling the background rectangle of the inner x/y plot (behind all of the shapes and gridlines).
       @param {Object} [*value*]
       @chainable
   */
  backgroundConfig(_) {
    return arguments.length ? (this._backgroundConfig = assign(this._backgroundConfig, _), this) : this._backgroundConfig;
  }

  /**
      @memberof Plot
      @desc Sets the pixel space between each bar in a group of bars.
      @param {Number} *value* = 0
      @chainable
  */
  barPadding(_) {
    return arguments.length ? (this._barPadding = _, this) : this._barPadding;
  }

  /**
      @memberof Plot
      @desc Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.
      @param {Number} *value*
      @chainable
  */
  baseline(_) {
    return arguments.length ? (this._baseline = _, this) : this._baseline;
  }

  /**
       @memberof Plot
       @desc Sets the confidence to the specified array of lower and upper bounds.
       @param {String[]|Function[]} *value*
       @chainable
       @example <caption>Can be called with accessor functions or static keys:</caption>
       var data = {id: "alpha", value: 10, lci: 9, hci: 11};
       ...
       // Accessor functions
       .confidence([function(d) { return d.lci }, function(d) { return d.hci }])

       // Or static keys
       .confidence(["lci", "hci"])
   */
  confidence(_) {
    if (arguments.length && _ instanceof Array) {
      this._confidence = [];
      const lower = _[0];
      this._confidence[0] = typeof lower === "function" || !lower ? lower : accessor(lower);
      const upper = _[1];
      this._confidence[1] = typeof upper === "function" || !upper ? upper : accessor(upper);

      return this;
    }
    else return this._confidence;
  }

  /**
       @memberof Plot
       @desc If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.
       @param {Object} [*value*]
       @chainable
   */
  confidenceConfig(_) {
    return arguments.length ? (this._confidenceConfig = assign(this._confidenceConfig, _), this) : this._confidenceConfig;
  }

  /**
      @memberof Plot
      @desc Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.
      @param {String} *value*
      @chainable
  */
  discrete(_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
  }

  /**
      @memberof Plot
      @desc When the width or height of the chart is less than or equal to this pixel value, the discrete axis will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
      @param {Number} *value*
      @chainable
  */
  discreteCutoff(_) {
    return arguments.length ? (this._discreteCutoff = _, this) : this._discreteCutoff;
  }

  /**
      @memberof Plot
      @desc Sets the pixel space between groups of bars.
      @param {Number} [*value* = 5]
      @chainable
  */
  groupPadding(_) {
    return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
  }

  /**
      @memberof Plot
      @desc A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.
      @param {Function} *value*
      @chainable
  */
  shapeSort(_) {
    return arguments.length ? (this._shapeSort = _, this) : this._shapeSort;
  }

  /**
      @memberof Plot
      @desc Sets the size of bubbles to the given Number, data key, or function.
      @param {Function|Number|String} *value* = 10
      @chainable
  */
  size(_) {
    return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : accessor(_), this) : this._size;
  }

  /**
      @memberof Plot
      @desc Sets the size scale maximum to the specified number.
      @param {Number} *value* = 20
      @chainable
  */
  sizeMax(_) {
    return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
  }

  /**
      @memberof Plot
      @desc Sets the size scale minimum to the specified number.
      @param {Number} *value* = 5
      @chainable
  */
  sizeMin(_) {
    return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
  }

  /**
      @memberof Plot
      @desc Sets the size scale to the specified string.
      @param {String} *value* = "sqrt"
      @chainable
  */
  sizeScale(_) {
    return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.
      @param {Boolean} *value* = false
      @chainable
  */
  stacked(_) {
    return arguments.length ? (this._stacked = _, this) : this._stacked;
  }

  /**
      @memberof Plot
      @desc Sets the stack offset. If *value* is not specified, returns the current stack offset function.
      @param {Function|String} *value* = "descending"
      @chainable
  */
  stackOffset(_) {
    return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape[`stackOffset${_.charAt(0).toUpperCase() + _.slice(1)}`], this) : this._stackOffset;
  }

  /**
      @memberof Plot
      @desc Sets the stack order. If *value* is not specified, returns the current stack order function.
      @param {Function|String|Array} *value* = "none"
      @chainable
  */
  stackOrder(_) {
    if (arguments.length) {
      if (typeof _ === "string") this._stackOrder = _ === "ascending" ? stackOrderAscending : _ === "descending" ? stackOrderDescending : d3Shape[`stackOrder${_.charAt(0).toUpperCase() + _.slice(1)}`];
      else this._stackOrder = _;
      return this;
    }
    else return this._stackOrder;
  }

  /**
      @memberof Plot
      @desc Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} *value*
      @chainable
  */
  x(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._x = _;
      else {
        this._x = accessor(_);
        if (!this._aggs[_] && this._discrete === "x") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._x;
  }

  /**
       @memberof Plot
       @desc Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.
       @param {Function|Number} *value*
       @chainable
   */
  x2(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._x2 = _;
      else {
        this._x2 = accessor(_);
        if (!this._aggs[_] && this._discrete === "x") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._x2;
  }

  /**
      @memberof Plot
      @desc Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.
      @param {Object} *value*
      @chainable
  */
  xConfig(_) {
    return arguments.length ? (this._xConfig = assign(this._xConfig, _), this) : this._xConfig;
  }

  /**
      @memberof Plot
      @desc When the width of the chart is less than or equal to this pixel value, and the x-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
      @param {Number} *value*
      @chainable
  */
  xCutoff(_) {
    return arguments.length ? (this._xCutoff = _, this) : this._xCutoff;
  }

  /**
      @memberof Plot
      @desc Sets the config method for the secondary x-axis. If *value* is not specified, returns the current secondary x-axis configuration.
      @param {Object} *value*
      @chainable
  */
  x2Config(_) {
    return arguments.length ? (this._x2Config = assign(this._x2Config, _), this) : this._x2Config;
  }

  /**
      @memberof Plot
      @desc Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} *value*
      @chainable
  */
  xDomain(_) {
    return arguments.length ? (this._xDomain = _, this) : this._xDomain;
  }

  /**
       @memberof Plot
       @desc Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
       @param {Array} *value*
       @chainable
   */
  x2Domain(_) {
    return arguments.length ? (this._x2Domain = _, this) : this._x2Domain;
  }

  /**
      @memberof Plot
      @desc Defines a custom sorting comparitor function to be used for discrete x axes.
      @param {Function} *value*
      @chainable
  */
  xSort(_) {
    return arguments.length ? (this._xSort = _, this) : this._xSort;
  }

  /**
       @memberof Plot
       @desc Defines a custom sorting comparitor function to be used for discrete x2 axes.
       @param {Function} *value*
       @chainable
   */
  x2Sort(_) {
    return arguments.length ? (this._x2Sort = _, this) : this._x2Sort;
  }

  /**
      @memberof Plot
      @desc Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} *value*
      @chainable
  */
  y(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._y = _;
      else {
        this._y = accessor(_);
        if (!this._aggs[_] && this._discrete === "y") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._y;
  }

  /**
       @memberof Plot
       @desc Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.
       @param {Function|Number} *value*
       @chainable
   */
  y2(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._y2 = _;
      else {
        this._y2 = accessor(_);
        if (!this._aggs[_] && this._discrete === "y2") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._y2;
  }

  /**
      @memberof Plot
      @desc Sets the config method for the y-axis. If *value* is not specified, returns the current y-axis configuration.

*Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
      @param {Object} *value*
      @chainable
  */
  yConfig(_) {
    if (arguments.length) {
      if (_.domain) _.domain = _.domain.slice().reverse();
      this._yConfig = assign(this._yConfig, _);
      return this;
    }
    return this._yConfig;
  }

  /**
      @memberof Plot
      @desc When the height of the chart is less than or equal to this pixel value, and the y-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
      @param {Number} *value*
      @chainable
  */
  yCutoff(_) {
    return arguments.length ? (this._yCutoff = _, this) : this._yCutoff;
  }

  /**
      @memberof Plot
      @desc Sets the config method for the secondary y-axis. If *value* is not specified, returns the current secondary y-axis configuration.
      @param {Object} *value*
      @chainable
  */
  y2Config(_) {
    return arguments.length ? (this._y2Config = assign(this._y2Config, _), this) : this._y2Config;
  }

  /**
      @memberof Plot
      @desc Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} *value*
      @chainable
  */
  yDomain(_) {
    return arguments.length ? (this._yDomain = _, this) : this._yDomain;
  }

  /**
       @memberof Plot
       @desc Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
       @param {Array} *value*
       @chainable
   */
  y2Domain(_) {
    return arguments.length ? (this._y2Domain = _, this) : this._y2Domain;
  }

  /**
      @memberof Plot
      @desc Defines a custom sorting comparitor function to be used for discrete y axes.
      @param {Function} *value*
      @chainable
  */
  ySort(_) {
    return arguments.length ? (this._ySort = _, this) : this._ySort;
  }

  /**
       @memberof Plot
       @desc Defines a custom sorting comparitor function to be used for discrete y2 axes.
       @param {Function} *value*
       @chainable
   */
  y2Sort(_) {
    return arguments.length ? (this._y2Sort = _, this) : this._y2Sort;
  }

}
