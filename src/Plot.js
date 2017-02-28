import {extent, max, merge, min, range} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";
import * as d3Shape from "d3-shape";

import {AxisBottom, AxisLeft, AxisRight, AxisTop, date} from "d3plus-axis";
import {colorAssign} from "d3plus-color";
import {accessor, assign, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

import {default as BarBuffer} from "./buffers/Bar.js";
import {default as CircleBuffer} from "./buffers/Circle.js";
import {default as RectBuffer} from "./buffers/Rect.js";
import {default as LineBuffer} from "./buffers/Line.js";

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
    this._barPadding = 5;
    this._buffer = {
      Bar: BarBuffer,
      Circle: CircleBuffer,
      Line: LineBuffer,
      Rect: RectBuffer
    };
    this._groupPadding = 20;
    this._shape = constant("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Area: {
        fontResize: true,
        label: (d, i) => this._stacked ? this._drawLabel(d, i) : false
      },
      Bar: {
        textAnchor: () => this._discrete === "x" ? "middle" : "end",
        verticalAlign: () => this._discrete === "x" ? "top" : "middle"
      },
      Circle: {
        r: constant(5)
      },
      Line: {
        fill: constant("none"),
        label: false,
        stroke: (d, i) => colorAssign(this._id(d, i)),
        strokeWidth: constant(1)
      },
      Rect: {
        height: constant(10),
        width: constant(10)
      }
    });
    this._stackOffset = d3Shape.stackOffsetNone;
    this._stackOrder = d3Shape.stackOrderDescending;
    this._x = accessor("x");
    this._xAxis = new AxisBottom().align("end");
    this._x2Axis = new AxisTop().align("start");
    this._xTest = new AxisBottom().align("end").gridSize(0);
    this._xConfig = {
      title: "X Axis"
    };
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

      data = data.sort((a, b) => {
        const a1 = a[this._discrete], b1 = b[this._discrete];
        if (a1 - b1 !== 0) return a1 - b1;
        return a.group - b.group;
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

      stackData = d3Shape.stack()
        .keys(stackKeys)
        .offset(this._stackOffset)
        .order(this._stackOrder)
        .value((group, key) => {
          const d = group.filter(g => g.id === key);
          return d.length ? d[0][opp] : 0;
        })(stackData);

      domains = {
        [this._discrete]: extent(data, d => d[this._discrete]),
        [opp]: [min(stackData.map(g => min(g.map(p => p[1])))), max(stackData.map(g => max(g.map(p => p[1]))))]
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
      xDomain = Array.from(new Set(data.map(d => d.x))).sort();
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
      yDomain = Array.from(new Set(data.map(d => d.y))).sort();
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
    shapeData.forEach(d => {
      if (this._buffer[d.key]) {
        const res = this._buffer[d.key].bind(this)(d.values, x, y, this._shapeConfig[d.key]);
        x = res[0];
        y = res[1];
      }
    });
    xDomain = x.domain();
    yDomain = y.domain();

    const testGroup = elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}),
          xTicks = this._discrete === "x" && !xTime ? domains.x : undefined,
          yTicks = this._discrete === "y" && !yTime ? domains.y : undefined;

    const yC = assign({
      barConfig: {"stroke-width": !this._discrete || this._discrete === "y" ? 1 : 0},
      gridConfig: {"stroke-width": !this._discrete || this._discrete === "x" ? 1 : 0},
      shapeConfig: {stroke: this._discrete ? "transparent" : this._yTest.barConfig().stroke}
    }, this._yConfig);

    this._yTest
      .domain(yDomain)
      .height(height)
      .scale(yScale.toLowerCase())
      .select(testGroup.node())
      .ticks(yTicks)
      .width(width)
      .config(yC)
      .render();

    const yBounds = this._yTest.outerBounds();
    const xOffset = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

    const xC = assign({
      barConfig: {"stroke-width": !this._discrete || this._discrete === "x" ? 1 : 0},
      gridConfig: {"stroke-width": !this._discrete || this._discrete === "y" ? 1 : 0},
      shapeConfig: {stroke: this._discrete ? "transparent" : this._xTest.barConfig().stroke}
    }, this._xConfig);

    this._xTest
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(testGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .render();

    const xGroup = elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}});

    this._xAxis
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(xGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .render();

    x = this._xAxis._d3Scale;

    this._x2Axis
      .config(xC)
      .domain(xDomain)
      .gridSize(0)
      .height(height)
      .labels([])
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(xGroup.node())
      .ticks([])
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._xAxis.barConfig()["stroke-width"]})
      .render();

    const yGroup = elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform}, update: {transform}});

    this._yAxis
      .domain(yDomain)
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yScale.toLowerCase())
      .select(yGroup.node())
      .ticks(yTicks)
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .config(yC)
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
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._yAxis.barConfig()["stroke-width"]})
      .render();

    y = this._yAxis._d3Scale;

    let shapeConfig = {
      duration: this._duration,
      label: d => this._drawLabel(d.data, d.i),
      select: elem("g.d3plus-plot-shapes", {parent, transition, enter: {transform}, update: {transform}}).node(),
      x: d => x(d.x),
      y: d => y(d.y)
    };

    function wrapConfig(config) {
      const obj = {};
      for (const k in config) {
        if ({}.hasOwnProperty.call(config, k) && !shapes[k]) {
          obj[k] = typeof config[k] === "function" ? d => config[k](d.data, d.i) : config[k];
        }
      }
      return obj;
    }

    shapeConfig = assign(shapeConfig, wrapConfig(this._shapeConfig));

    const positions = {
      x0: this._discrete === "x" ? shapeConfig.x : x(0),
      x1: this._discrete === "x" ? null : shapeConfig.x,
      y0: this._discrete === "y" ? shapeConfig.y : y(0),
      y1: this._discrete === "y" ? null : shapeConfig.y
    };

    if (this._stacked) {
      const scale = opp === "x" ? x : y;
      positions[`${opp}`] = positions[`${opp}0`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(0);
      };
      positions[`${opp}1`] = d => {
        const dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(0);
      };
    }

    shapeConfig = assign(shapeConfig, positions);

    const events = Object.keys(this._on);
    shapeData.forEach(d => {

      const s = new shapes[d.key]().config(shapeConfig).data(d.values);

      if (d.key === "Bar") {

        let space;
        const scale = this._discrete === "x" ? x : y;
        const vals = scale.domain().filter(d => typeof d !== "string" || d.indexOf("d3plus-buffer-") < 0);
        const range = scale.range();
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

      s.config(this._shapeConfig[d.key] ? wrapConfig(this._shapeConfig[d.key]) : {}).render();
      this._shapes.push(s);

    });

    return this;

  }

  /**
      @memberof Plot
      @desc Sets the pixel space between each bar in a group of bars.
      @param {Number} [*value* = 5]
  */
  barPadding(_) {
    return arguments.length ? (this._barPadding = _, this) : this._barPadding;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the baseline for the x/y plot and returns the current class instance. If *value* is not specified, returns the current baseline.
      @param {Number} [*value*]
  */
  baseline(_) {
    return arguments.length ? (this._baseline = _, this) : this._baseline;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the discrete axis to the specified string and returns the current class instance. If *value* is not specified, returns the current discrete axis.
      @param {String} [*value*]
  */
  discrete(_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
  }

  /**
      @memberof Plot
      @desc Sets the pixel space between groups of bars.
      @param {Number} [*value* = 20]
  */
  groupPadding(_) {
    return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.
      @param {Boolean} [*value* = false]
  */
  stacked(_) {
    return arguments.length ? (this._stacked = _, this) : this._stacked;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the stack offset and returns the current class instance. If *value* is not specified, returns the current stack offset function.
      @param {Function|String} [*value* = "descending"]
  */
  stackOffset(_) {
    return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape[`stackOffset${_.charAt(0).toUpperCase() + _.slice(1)}`], this) : this._stackOffset;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the stack order and returns the current class instance. If *value* is not specified, returns the current stack order function.
      @param {Function|String} [*value* = "none"]
  */
  stackOrder(_) {
    return arguments.length ? (this._stackOrder = typeof _ === "function" ? _ : d3Shape[`stackOrder${_.charAt(0).toUpperCase() + _.slice(1)}`], this) : this._stackOrder;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
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
      @desc If *value* is specified, sets the config method for the x-axis and returns the current class instance. If *value* is not specified, returns the current x-axis configuration.
      @param {Object} [*value*]
  */
  xConfig(_) {
    return arguments.length ? (this._xConfig = assign(this._xConfig, _), this) : this._xConfig;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the x domain to the specified array and returns the current class instance. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  xDomain(_) {
    return arguments.length ? (this._xDomain = _, this) : this._xDomain;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
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
      @desc If *value* is specified, sets the config method for the y-axis and returns the current class instance. If *value* is not specified, returns the current y-axis configuration.

*Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
      @param {Object} [*value*]
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
      @desc If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  yDomain(_) {
    return arguments.length ? (this._yDomain = _, this) : this._yDomain;
  }

}
