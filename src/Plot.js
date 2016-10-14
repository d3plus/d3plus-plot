import {extent, min, max} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";
import {stack} from "d3-shape";
import {mouse} from "d3-selection";

import {AxisBottom, AxisLeft, date} from "d3plus-axis";
import {assign} from "d3plus-color";
import {accessor, closest, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

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
    this._buffer = {
      Circle: CircleBuffer,
      Line: LineBuffer,
      Rect: RectBuffer
    };
    this._shape = constant("Circle");
    this._shapeConfig = Object.assign(this._shapeConfig, {
      Circle: {
        r: constant(5)
      },
      Line: {
        fill: constant("none"),
        label: false,
        stroke: (d, i) => assign(this._id(d, i)),
        strokeWidth: constant(1)
      },
      Rect: {
        height: constant(10),
        width: constant(10)
      }
    });
    this._x = accessor("x");
    this._xAxis = new AxisBottom().align("end");
    this._xTest = new AxisBottom().align("end").gridSize(0);
    this._xConfig = {
      title: "X Axis"
    };
    this._y = accessor("y");
    this._yAxis = new AxisLeft().align("start");
    this._yTest = new AxisLeft().align("start").gridSize(0);
    this._yConfig = {
      title: "Y Axis"
    };

  }

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  render(callback) {

    super.render(callback);

    const data = this._filteredData.map((d, i) => ({
            data: d,
            i,
            id: this._id(d, i),
            shape: this._shape(d, i),
            x: this._x(d, i),
            y: this._y(d, i)
          })),
          height = this._height - this._margin.top - this._margin.bottom,
          opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
          parent = this._select,
          that = this,
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    let domains, stackData, stackKeys;
    if (this._stacked) {

      stackKeys = Array.from(new Set(data.map(d => d.id)));
      stackData = stack()
        .keys(stackKeys)
        .value((group, key) => group.filter(d => d.id === key)[0][opp])
        (nest().key(d => d[this._discrete]).entries(data).map(d => d.values));

      domains = {
        [this._discrete]: extent(data, d => d[this._discrete]),
        [opp]: [min(stackData.map(g => min(g.map(p => p[1])))), max(stackData.map(g => max(g.map(p => p[1]))))]
      };

    }
    else domains = {x: extent(data, d => d.x), y: extent(data, d => d.y)};

    const xTime = this._time && this._x(data[0], 0) === this._time(data[0], 0),
          yTime = this._time && this._y(data[0], 0) === this._time(data[0], 0);

    if (xTime || yTime) {
      data.forEach(d => {
        if (xTime) d.x = date(d.x);
        if (yTime) d.y = date(d.y);
      });
    }

    let xDomain = this._xDomain ? this._xDomain.slice() : domains.x;
    if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
    if (xDomain[1] === void 0) xDomain[1] = domains.x[1];
    if (xTime) xDomain = xDomain.map(date);

    let yDomain = this._yDomain ? this._yDomain.slice() : domains.y;
    if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
    if (yDomain[1] === void 0) yDomain[1] = domains.y[1];
    if (yTime) yDomain = yDomain.map(date);

    domains = {x: xDomain, y: yDomain};

    if (opp && this._baseline !== void 0) {
      const b = this._baseline;
      if (domains[opp][0] > b) domains[opp][0] = b;
      else if (domains[opp][1] < b) domains[opp][1] = b;
    }

    let x = scales[`scale${xTime ? "Time" : "Linear"}`]().domain(domains.x).range([0, width]),
        y = scales[`scale${yTime ? "Time" : "Linear"}`]().domain(domains.y.reverse()).range([0, height]);

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

    const xTicks = this._discrete === "x" && !xTime ? Array.from(new Set(data.map(d => d.x))) : undefined,
          yTicks = this._discrete === "y" && !yTime ? Array.from(new Set(data.map(d => d.y))) : undefined;

    this._yTest
      .domain(yDomain)
      .height(height)
      .scale(yTime ? "time" : "linear")
      .select(elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .ticks(yTicks)
      .width(width)
      .config(this._yConfig)
      .render();

    const xOffset = this._yTest.outerBounds().width + this._yTest.padding();

    this._xTest
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xTime ? "time" : "linear")
      .select(elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .ticks(xTicks)
      .width(width)
      .config(this._xConfig)
      .render();

    this._xAxis
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xTime ? "time" : "linear")
      .select(elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .ticks(xTicks)
      .width(width)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._yAxis
      .domain(yDomain)
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yTime ? "time" : "linear")
      .select(elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .ticks(yTicks)
      .width(x.range()[1] + this._xAxis.padding())
      .config(this._yConfig)
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

    shapeConfig = Object.assign(shapeConfig, wrapConfig(this._shapeConfig));

    const positions = {
      x0: this._discrete === "x" ? shapeConfig.x : x(0),
      x1: this._discrete === "x" ? null : shapeConfig.x,
      y0: this._discrete === "y" ? shapeConfig.y : y(0),
      y1: this._discrete === "y" ? null : shapeConfig.y
    };

    if (this._stacked) {
      const scale = opp === "x" ? x : y;
      positions[`${opp}0`] = (d, i) => {
        const index = stackKeys.indexOf(d.id);
        return index >= 0 ? scale(stackData[index][i][0]) : scale(0);
      };
      positions[`${opp}1`] = (d, i) => {
        const index = stackKeys.indexOf(d.id);
        return index >= 0 ? scale(stackData[index][i][1]) : scale(0);
      };
    }

    shapeConfig = Object.assign(shapeConfig, positions);

    /**
        @desc Handles mouse events for nested shapes, finding the closest discrete data point to send to the defined event function.
        @private
    */
    function mouseEvent(d) {
      if (d.nested && d.values) {
        const axis = that._discrete,
              cursor = mouse(that._select.node())[axis === "x" ? 0 : 1],
              values = d.values.map(d => shapeConfig[axis](d));
        d = d.values[values.indexOf(closest(cursor, values))];
      }
      return this(d.data, d.i);
    }

    const events = Object.keys(this._on);
    shapeData.forEach(d => {

      const s = new shapes[d.key]().config(shapeConfig).data(d.values);
      const classEvents = events.filter(e => e.includes(`.${d.key}`)),
            globalEvents = events.filter(e => !e.includes(".")),
            shapeEvents = events.filter(e => e.includes(".shape"));
      for (let e = 0; e < globalEvents.length; e++) s.on(globalEvents[e], mouseEvent.bind(this._on[globalEvents[e]]));
      for (let e = 0; e < shapeEvents.length; e++) s.on(shapeEvents[e], mouseEvent.bind(this._on[shapeEvents[e]]));
      for (let e = 0; e < classEvents.length; e++) s.on(classEvents[e], mouseEvent.bind(this._on[classEvents[e]]));
      s.config(this._shapeConfig[d.key] ? wrapConfig(this._shapeConfig[d.key]) : {}).render();
      this._shapes.push(s);

    });

    return this;

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
      @desc If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.
      @param {Boolean} [*value* = false]
  */
  stacked(_) {
    return arguments.length ? (this._stacked = _, this) : this._stacked;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
  */
  x(_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : constant(_), this) : this._x;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the x-axis and returns the current class instance. If *value* is not specified, returns the current x-axis configuration.
      @param {Object} [*value*]
  */
  xConfig(_) {
    return arguments.length ? (this._xConfig = Object.assign(this._xConfig, _), this) : this._xConfig;
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
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the y-axis and returns the current class instance. If *value* is not specified, returns the current y-axis configuration.
      @param {Object} [*value*]
  */
  yConfig(_) {
    return arguments.length ? (this._yConfig = Object.assign(this._yConfig, _), this) : this._yConfig;
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
