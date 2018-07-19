/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
import {nest} from "d3-collection";
import {accessor, assign, configPrep, constant, elem} from "d3plus-common";

import {Area, Circle, Path} from "d3plus-shape";
import {TextBox} from "d3plus-text";
import {default as Plot} from "./Plot";

const tau = Math.PI * 2;

/**
    @class Radar
    @extends Plot
    @desc Creates a radar visualization based on an array of data.
*/
export default class Radar extends Plot {

  /**
      @memberof LinePlot
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {
    super();
    this._discrete = "x";
    this._legend = false;
    this._levels = 6; // CHECK

    this._radarPadding = 100;

    this._shape = constant("Path");
    this._shapeConfig = assign(this._shapeConfig, {
      Circle: {
        fill: constant("none"),
        stroke: constant("#CCC"),
        strokeWidth: constant(1)
      },
      Area: {
        fill: constant("none"),
        stroke: constant("#CCC"),
        strokeWidth: constant(1)
      },
      Path: {
        fillOpacity: constant(0.8)
      }
    });
    this._xConfig = {
      height: 0
    };
    this._value = accessor("value");
  }

  /**
      Extends the draw behavior of the abstract Plot class.
      @private
  */
  _draw(callback) {
    super._draw(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    const radius = (Math.min(height, width) - this._radarPadding) / 2,
          transform = `translate(${width / 2}, ${height / 2})`;

    const maxValue = Math.max(...this._data.map((d, i) => this._value(d, i))),
          nestedAxisData = nest()
        .key(this._y)
        .entries(this._data),
          nestedGroupData = nest()
        .key(this._x)
        .entries(this._data);

    const spaceAxis = Array.from(
      new Set(this._data.map((d, i) => this._x(d, i)))
    );

    this._shapes.push(
      new Circle()
        .data(Array.from(Array(this._levels).keys()))
        .r((d, i) => radius * ((i + 1) / this._levels))
        .select(
          elem("g.d3plus-Radar-radial-circles", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(this._shapeConfig.Area)
        .render()
    );

    const totalAxis = nestedAxisData.length;
    const polarAxis = nestedAxisData
      .map((d, i) => {
        const angle = tau / totalAxis * i;
        return {
          id: i,
          angle: 360 / totalAxis * i,
          text: d.key,
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
        };
      })
      .sort((a, b) => a.key - b.key);

    this._shapes.push(
      new TextBox()
        .data(polarAxis)
        .rotate(d => Math.abs(d.angle) > 90 ? d.angle + 180 : d.angle)
        .rotateAnchor([0, 0])
        .textAnchor(d => Math.abs(d.angle) > 90 ? "start" : "start") // PAY ATENTION
        .x(d => d.x)
        .y(d => d.y)
        .select(
          elem("g.d3plus-Radar-text", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .render()
    );

    this._shapes.push(
      new Area()
        .data(polarAxis)
        .x0(d => 0)
        .y0(d => 0)
        .x1(d => d.x)
        .y1(d => d.y)
        .select(
          elem("g.d3plus-Radar-axis", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Area"))
        .render()
    );

    const groupPath = nestedGroupData.map((h, x) => {
      const q = h.values.map((d, i) => {
        const angle = tau / totalAxis * i,
              r = d.value / maxValue * radius;
        return {
          x: r * Math.cos(angle),
          y: r * Math.sin(angle)
        };
      });

      const d = `M ${q[0].x} ${q[0].y} ${q
        .map(l => `L ${l.x} ${l.y}`)
        .join(" ")}`;

      return {id: x, d};
    });

    this._shapes.push(
      new Path()
        .data(groupPath)
        .d(d => d.d)
        .select(
          elem("g.d3plus-Radar-item", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .render()
    );

    return this;
  }

  hover(_) {
    this._hover = _;
    this._shapes.forEach(s => s.hover(_));
    if (this._legend) this._legendClass.hover(_);

    return this;
  }

  /**
      @memberof Radar
      @desc If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.
      @param {Function|String} *value*
      @example
function value(d) {
  return d.value;
}
  */
  value(_) {
    return arguments.length
      ? (this._value = typeof _ === "function" ? _ : accessor(_), this)
      : this._value;
  }
}
