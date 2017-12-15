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
import {default as CircleBuffer} from "./buffers/Circle.js";
import {default as RectBuffer} from "./buffers/Rect.js";
import {default as LineBuffer} from "./buffers/Line.js";

function defaultSize(d) {
  return this._sizeScaleD3(this._size ? this._size(d) : null);
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
    this._barPadding = 0;
    this._buffer = {
      Bar: BarBuffer,
      Circle: CircleBuffer,
      Line: LineBuffer,
      Rect: RectBuffer
    };
    this._groupPadding = 5;
    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Area: {
        label: (d, i) => this._stacked ? this._drawLabel(d, i) : false,
        labelConfig: {
          fontResize: true
        }
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
    this._sizeMax = 20;
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._stackOffset = d3Shape.stackOffsetDiverging;
    this._stackOrder = d3Shape.stackOrderNone;
    this._x = accessor("x");
    this._xAxis = new AxisBottom().align("end");
    this._x2Axis = new AxisTop().align("start");
    this._xTest = new AxisBottom().align("end").gridSize(0);
    this._xConfig = {
      title: "X Axis"
    };
    this._x2Config = {};
    this._y = accessor("y");
    this._yAxis = new AxisLeft().align("start");
    this._y2Axis = new AxisRight().align("end");
    this._yTest = new AxisLeft().align("start").gridSize(0);
    this._yConfig = {
      gridConfig: {
        stroke: d => {
          const domain = this._yAxis.domain();
          return domain[domain.length - 1] === d.id ? "transparent" : "#ccc";
        }
      },
      title: "Y Axis"
    };
    this._y2Config = {};

  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {

    super._draw(callback);

    if (!this._filteredData.length) return this;

    const stackGroup = (d, i) => this._stacked
      ? `${this._groupBy.length > 1 ? this._ids(d, i).slice(0, -1).join("_") : "group"}`
      : `${this._ids(d, i).join("_")}`;

    let data = this._filteredData.map((d, i) => ({
      __d3plus__: true,
      data: d,
      group: stackGroup(d, i),
      i,
      id: this._ids(d, i).slice(0, this._drawDepth + 1).join("_"),
      shape: this._shape(d, i),
      x: this._x(d, i),
      y: this._y(d, i)
    }));

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

    const height = this._height - this._margin.top - this._margin.bottom,
          opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
          parent = this._select,
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
          yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (xTime) d.x = date(d.x);
      if (yTime) d.y = date(d.y);
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

      data.sort((a, b) => a[this._discrete] - b[this._discrete]);
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
    else domains = {x: extent(data, d => d.x), y: extent(data, d => d.y)};

    let xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
        xScale = "Linear";

    if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
    if (xDomain[1] === void 0) xDomain[1] = domains.x[1];

    if (xTime) {
      xDomain = xDomain.map(date);
      xScale = "Time";
    }
    else if (this._discrete === "x") {
      xDomain = Array.from(new Set(data.sort((a, b) => this._xSort ? this._xSort(a.data, b.data) : a.x - b.x).map(d => d.x)));
      xScale = "Ordinal";
    }

    let yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
        yScale = "Linear";

    if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
    if (yDomain[1] === void 0) yDomain[1] = domains.y[1];

    if (yTime) {
      yDomain = yDomain.map(date);
      yScale = "Time";
    }
    else if (this._discrete === "y") {
      yDomain = Array.from(new Set(data.sort((a, b) => this._ySort ? this._ySort(a.data, b.data) : a.y - b.y).map(d => d.y)));
      yScale = "Ordinal";
    }

    domains = {x: xDomain, y: yDomain};

    if (opp && this._baseline !== void 0) {
      const b = this._baseline;
      if (domains[opp][0] > b) domains[opp][0] = b;
      else if (domains[opp][1] < b) domains[opp][1] = b;
    }

    let x = scales[`scale${xScale}`]().domain(domains.x).range(range(0, width + 1, width / (domains.x.length - 1))),
        y = scales[`scale${yScale}`]().domain(domains.y.reverse()).range(range(0, height + 1, height / (domains.y.length - 1)));

    const shapeData = nest().key(d => d.shape).entries(data);
    if (this._xConfig.scale !== "log" && this._yConfig.scale !== "log") {
      shapeData.forEach(d => {
        if (this._buffer[d.key]) {
          const res = this._buffer[d.key].bind(this)(d.values, x, y, this._shapeConfig[d.key]);
          if (this._xConfig.scale !== "log") x = res[0];
          if (this._yConfig.scale !== "log") y = res[1];
        }
      });
    }
    xDomain = x.domain();
    yDomain = y.domain();

    const testGroup = elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}),
          xTicks = this._discrete === "x" && !xTime ? domains.x : undefined,
          yTicks = this._discrete === "y" && !yTime ? domains.y : undefined;

    const yC = {
      gridConfig: {stroke: !this._discrete || this._discrete === "x" ? this._yTest.gridConfig().stroke : "transparent"}
    };

    this._yTest
      .domain(yDomain)
      .height(height)
      .scale(yScale.toLowerCase())
      .select(testGroup.node())
      .ticks(yTicks)
      .width(width)
      .config(yC)
      .config(this._yConfig)
      .render();

    const yBounds = this._yTest.outerBounds();
    const yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

    const xC = {
      gridConfig: {stroke: !this._discrete || this._discrete === "y" ? this._xTest.gridConfig().stroke : "transparent"}
    };

    this._xTest
      .domain(xDomain)
      .height(height)
      .range([undefined, undefined])
      .scale(xScale.toLowerCase())
      .select(testGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .config(this._xConfig)
      .render();

    const xOffset = max([yWidth, this._xTest._getRange()[0]]);

    this._xTest
      .range([xOffset, undefined])
      .render();

    const xGroup = elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}});

    const xTrans = xOffset > yWidth ? xOffset - yWidth : 0;
    const yTransform = `translate(${this._margin.left + xTrans}, ${this._margin.top})`;
    const yGroup = elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform: yTransform}, update: {transform: yTransform}});

    const x2Group = elem("g.d3plus-plot-x2-axis", {parent, transition, enter: {transform}, update: {transform}});

    this._xAxis
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(xGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .config(this._xConfig)
      .render();

    x = d => {
      if (this._xConfig.scale === "log" && d === 0) d = xDomain[0] < 0 ? -1 : 1;
      return this._xAxis._getPosition.bind(this._xAxis)(d);
    };
    const xRange = this._xAxis._getRange();

    this._x2Axis
      .config(xC)
      .domain(xDomain)
      .gridSize(0)
      .height(height)
      .labels([])
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(x2Group.node())
      .ticks([])
      .width(xRange[xRange.length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._xAxis.barConfig()["stroke-width"]})
      .config(this._x2Config)
      .render();

    this._yAxis
      .domain(yDomain)
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yScale.toLowerCase())
      .select(yGroup.node())
      .ticks(yTicks)
      .width(xRange[xRange.length - 1] + this._xAxis.padding())
      .config(yC)
      .config(this._yConfig)
      .render();

    this._y2Axis
      .config(yC)
      .domain(yDomain)
      .gridSize(0)
      .height(height)
      .labels([])
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yScale.toLowerCase())
      .select(yGroup.node())
      .ticks([])
      .width(xRange[xRange.length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._yAxis.barConfig()["stroke-width"]})
      .config(this._y2Config)
      .render();

    y = d => {
      if (this._yConfig.scale === "log" && d === 0) d = yDomain[0] < 0 ? -1 : 1;
      return this._yAxis._getPosition.bind(this._yAxis)(d);
    };
    const yRange = this._yAxis._getRange();

    const annotationGroup = elem("g.d3plus-plot-annotations", {parent, transition, enter: {transform}, update: {transform}}).node();
    this._annotations.forEach(annotation => {
      new shapes[annotation.shape]()
        .config(annotation)
        .config({
          x: d => x(d.x),
          x0: this._discrete === "x" ? d => x(d.x) : x(0),
          x1: this._discrete === "x" ? null : d => x(d.x),
          y: d => y(d.y),
          y0: this._discrete === "y" ? d => y(d.y) : y(0) - yOffset,
          y1: this._discrete === "y" ? null : d => y(d.y) - yOffset
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
      x: d => x(d.x),
      x0: this._discrete === "x" ? d => x(d.x) : x(0),
      x1: this._discrete === "x" ? null : d => x(d.x),
      y: d => y(d.y),
      y0: this._discrete === "y" ? d => y(d.y) : y(0) - yOffset,
      y1: this._discrete === "y" ? null : d => y(d.y) - yOffset
    };

    if (this._stacked) {
      const scale = opp === "x" ? x : y;
      shapeConfig[`${opp}`] = shapeConfig[`${opp}0`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(0);
      };
      shapeConfig[`${opp}1`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(0);
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
      @desc Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.
      @param {String} *value*
      @chainable
  */
  discrete(_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
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
    return arguments.length ? (this._stackOrder = typeof _ === "string" ? d3Shape[`stackOrder${_.charAt(0).toUpperCase() + _.slice(1)}`] : _, this) : this._stackOrder;
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
      @desc Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.
      @param {Object} *value*
      @chainable
  */
  xConfig(_) {
    return arguments.length ? (this._xConfig = assign(this._xConfig, _), this) : this._xConfig;
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
      @desc Defines a custom sorting comparitor function to be used for discrete x axes.
      @param {Function} *value*
      @chainable
  */
  xSort(_) {
    return arguments.length ? (this._xSort = _, this) : this._xSort;
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
      @desc Defines a custom sorting comparitor function to be used for discrete y axes.
      @param {Function} *value*
      @chainable
  */
  ySort(_) {
    return arguments.length ? (this._ySort = _, this) : this._ySort;
  }

}
