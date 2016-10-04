import {extent, min, max} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";
import {mouse} from "d3-selection";

import {AxisBottom, AxisLeft} from "d3plus-axis";
import {assign} from "d3plus-color";
import {accessor, closest, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

import {default as CircleBuffer} from "./buffers/Circle.js";
import {default as RectBuffer} from "./buffers/Rect.js";

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
          parent = this._select,
          that = this,
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const xDomain = this._xDomain ? this._xDomain.slice() : extent(data, d => d.x);
    if (xDomain[0] === void 0) xDomain[0] = min(data, d => d.x);
    if (xDomain[1] === void 0) xDomain[1] = max(data, d => d.x);
    const yDomain = this._yDomain ? this._yDomain.slice() : extent(data, d => d.y);
    if (yDomain[0] === void 0) yDomain[0] = min(data, d => d.y);
    if (yDomain[1] === void 0) yDomain[1] = max(data, d => d.y);

    let x = scales.scaleLinear().domain(xDomain).range([0, width]),
        y = scales.scaleLinear().domain(yDomain.reverse()).range([0, height]);

    const shapeData = nest().key(d => d.shape).entries(data);
    shapeData.forEach(d => {
      if (this._buffer[d.key]) {
        const res = this._buffer[d.key](d.values, x, y, this._shapeConfig[d.key]);
        x = res[0];
        y = res[1];
      }
    });

    this._yTest
      .domain(y.domain())
      .height(height)
      .select(elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .ticks(this._discrete === "y" ? Array.from(new Set(data.map(d => d.y))) : undefined)
      .width(width)
      .config(this._yConfig)
      .render();

    const xOffset = this._yTest.outerBounds().width + this._yTest.padding();

    this._xTest
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .ticks(this._discrete === "x" ? Array.from(new Set(data.map(d => d.x))) : undefined)
      .width(width)
      .config(this._xConfig)
      .render();

    this._xAxis
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .ticks(this._discrete === "x" ? Array.from(new Set(data.map(d => d.x))) : undefined)
      .width(width)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._yAxis
      .domain(y.domain())
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .select(elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .ticks(this._discrete === "y" ? Array.from(new Set(data.map(d => d.y))) : undefined)
      .width(x.range()[1] + this._xAxis.padding())
      .config(this._yConfig)
      .render();

    y = this._yAxis._d3Scale;

    let shapeConfig = {
      duration: this._duration,
      fill: d => this._shapeConfig.fill(d.data, d.i),
      label: d => this._drawLabel(d.data, d.i),
      opacity: d => this._shapeConfig.opacity(d.data, d.i),
      select: elem("g.d3plus-plot-shapes", {parent, transition}).node(),
      stroke: d => this._shapeConfig.stroke(d.data, d.i),
      strokeWidth: d => this._shapeConfig.strokeWidth(d.data, d.i),
      x: d => x(d.x),
      y: d => y(d.y)
    };

    shapeConfig = Object.assign(shapeConfig, {
      x0: this._discrete === "x" ? shapeConfig.x : x(0),
      x1: this._discrete === "x" ? null : shapeConfig.x,
      y0: this._discrete === "y" ? shapeConfig.y : y(0),
      y1: this._discrete === "y" ? null : shapeConfig.y
    });

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
      s.config(this._shapeConfig[d.key] || {}).render();
      this._shapes.push(s);

    });

    return this;

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
      @desc If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  yDomain(_) {
    return arguments.length ? (this._yDomain = _, this) : this._yDomain;
  }

}
