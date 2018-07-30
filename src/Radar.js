/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
import {nest} from "d3-collection";
import * as d3 from "d3-selection";
import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import {Circle, Path} from "d3plus-shape";
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
    this._levels = 6;

    this._on.mouseenter = () => {};
    this._on["mouseleave.shape"] = () => {
      this.hover(false);
    };
    const defaultMouseMove = this._on["mousemove.shape"];
    this._on["mousemove.shape"] = (d, i) => {
      defaultMouseMove(d, i);
      const id = this._id(d, i);

      this.hover((h, x) => this._x(h, x) === id);
    };

    this._radarPadding = 100;

    this._shape = constant("Path");
    this._shapeConfig = assign(this._shapeConfig, {
      Circle: {
        r: accessor("r", 0),
        fill: constant("none"),
        stroke: constant("#CCC"),
        strokeWidth: constant(1)
      },
      Path: {
        fillOpacity: 0.7
      }
    });
    this._xConfig = {
      height: 0
    };
    this._value = accessor("value");

    this._y1 = false;
  }

  /**
      Extends the draw behavior of the abstract Plot class.
      @private
  */
  _draw(callback) {
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

    const circularAxis = Array.from(Array(this._levels).keys()).map(d => ({
      id: d,
      r: radius * ((d + 1) / this._levels)
    }));

    this._shapes.push(
      new Circle()
        .data(circularAxis)
        .select(
          elem("g.d3plus-Radar-radial-circles", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
        .render()
    );

    const totalAxis = nestedAxisData.length;
    const polarAxis = nestedAxisData
      .map((d, i) => {
        const angle = tau / totalAxis * i;
        return {
          id: d.key,
          angle: 360 - 360 / totalAxis * i,
          quadrant: parseInt(360 - 360 / totalAxis * i / 90, 10) % 4 + 1,
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
        };
      })
      .sort((a, b) => a.key - b.key);

    this._shapes.push(
      new TextBox()
        .data(polarAxis)
        .rotate(
          d => d.angle < 90 || d.angle > 270 ? -d.angle : -d.angle + 180
        )
        .rotateAnchor([0, 0])
        .textAnchor(d => [1, 4].includes(d.quadrant) ? "start" : "end")
        .height(14)
        .text(d => d.id)
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

    d3.selectAll("g.d3plus-Radar-text text")
      .data(polarAxis)
      .attr("x", d => d.x < 0 ? -10 : 10)
      .attr("y", 5);

    this._shapes.push(
      new Path()
        .data(polarAxis)
        .d(d => `M${0},${0} ${-d.x},${-d.y}`)
        .select(
          elem("g.d3plus-Radar-axis", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(this._shapeConfig.Circle)
        .render()
    );

    const groupData = nestedGroupData.map(h => {
      const q = h.values.map((d, i) => {
        const angle = tau / totalAxis * i,
              r = this._value(d, i) / maxValue * radius;
        return {
          x: r * Math.cos(angle),
          y: r * Math.sin(angle)
        };
      });

      const d = `M ${q[0].x} ${q[0].y} ${q
        .map(l => `L ${l.x} ${l.y}`)
        .join(" ")}`;

      return {id: h.key, d};
    });

    this._shapes.push(
      new Path()
        .data(groupData)
        .d(d => d.d)
        .select(
          elem("g.d3plus-Radar-items", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .render()
    );

    super._draw(callback);

    return this;
  }

  /**
      @memberof Radar
      @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
      @param {Function} [*value*]
      @chainable
   */
  hover(_) {
    this._hover = _;
    this._shapes.forEach(s => s.hover(_));
    if (this._legend) this._legendClass.hover(_);

    return this;
  }

  /**
      @memberof Radar
      @desc If *value* is specified, sets the padding of the chart and returns the current class instance. If *value* is not specified, returns the current radarPadding. By default, the radarPadding is 100.
      @param {Number} [*value* = 100]
      @chainable
  */
  radarPadding(_) {
    return arguments.length
      ? (this._radarPadding = _, this)
      : this._radarPadding;
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
