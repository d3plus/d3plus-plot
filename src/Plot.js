import {extent} from "d3-array";
import {nest} from "d3-collection";
import * as scales from "d3-scale";

import {AxisBottom, AxisLeft} from "d3plus-axis";
import {accessor, constant, elem} from "d3plus-common";
import * as shapes from "d3plus-shape";
import {Viz} from "d3plus-viz";

import {default as CircleBuffer} from "./buffers/Circle.js";
import {default as RectBuffer} from "./buffers/Rect.js";

/**
    @class Plot
    @extends Viz
    @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
export default class Plot extends Viz {

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
        label: false
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
          transform = `translate(${this._margin.left}, ${this._margin.top})`,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    let x = scales.scaleLinear().domain(extent(data, d => d.x)).range([0, width]),
        y = scales.scaleLinear().domain(extent(data, d => d.y).reverse()).range([0, height]);

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
      .width(width)
      .config(this._yConfig)
      .render();

    const xOffset = this._yTest.outerBounds().width + this._yTest.padding();

    this._xTest
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .width(width)
      .config(this._xConfig)
      .render();

    this._xAxis
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(elem("g.d3plus-plot-x-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .width(width)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._yAxis
      .domain(y.domain())
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .select(elem("g.d3plus-plot-y-axis", {parent, transition, enter: {transform}, update: {transform}}).node())
      .width(x.range()[1] + this._xAxis.padding())
      .config(this._yConfig)
      .render();

    y = this._yAxis._d3Scale;

    const shapeConfig = {
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

    const events = Object.keys(this._on);
    shapeData.forEach(d => {

      const s = new shapes[d.key]().config(shapeConfig).data(d.values);
      const classEvents = events.filter(e => e.includes(`.${d.key}`)),
            globalEvents = events.filter(e => !e.includes(".")),
            shapeEvents = events.filter(e => e.includes(".shape"));
      for (let e = 0; e < globalEvents.length; e++) s.on(globalEvents[e], d => this._on[globalEvents[e]](d.data, d.i));
      for (let e = 0; e < shapeEvents.length; e++) s.on(shapeEvents[e], d => this._on[shapeEvents[e]](d.data, d.i));
      for (let e = 0; e < classEvents.length; e++) s.on(classEvents[e], d => this._on[classEvents[e]](d.data, d.i));
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
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
