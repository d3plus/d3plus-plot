import * as d3 from "d3";

import {
  accessor,
  assign,
  configPrep,
  constant,
  elem,
  merge
} from "d3plus-common";

import * as shapes from "d3plus-shape";
import {TextBox} from "d3plus-text";
import {default as Plot} from "./Plot";

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
    this._factor = 1; // CHECK
    this._legend = false;
    this._levels = 6; // CHECK

    this._shape = constant("Path");
    this._shapeConfig = assign(this._shapeConfig, {
      Circle: {
        opacity: d => d.__d3plusOpacity__ || 1,
        labelConfig: {
          fontResize: true
        }
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
  }
  _renderCircles(transform) {
    console.log("hellohello");
  }

  /**
      Extends the draw behavior of the abstract Plot class.
      @private
  */
  _draw(callback) {
    super._draw(callback);

    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    const diameter = Math.min(height, width);
    const transform = `translate(${(width / 2)}, ${height / 2})`;

    const maxValue = Math.max(...this._data.map(d => d.value));

    const polarAxis = Array.from(
      new Set(this._data.map((d, i) => this._y(d, i)))
    );
    const spaceAxis = Array.from(
      new Set(this._data.map((d, i) => this._x(d, i)))
    );

    const totalAxis = polarAxis.length;
    const tau = Math.PI * 2;
    const s = tau / totalAxis;

    // TO-DO
    const radius = this._factor * (diameter / 2);
    const allAxis = Array.from(Array(this._levels).keys()).map((d, i) => ({
      __d3plusRadius__: this._factor * radius * ((i + 1) / this._levels)
    }));

    this._shapes.push(
      new shapes.Circle()
        .data(allAxis)
        .r(d => d.__d3plusRadius__)
        .select(
          elem("g.d3plus-Radar-circle", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Area"))
        .render()
    );

    const polarAxisLines = polarAxis.map((d, i) => {
      const angle = tau / totalAxis * i;
      return {
        id: i,
        angle: tau / totalAxis * i,
        text: d,
        x: (radius - 10) * Math.cos(angle),
        y: (radius - 10) * Math.sin(angle)
      };
    });

    this._shapes.push(
      new TextBox()
        .data(polarAxisLines)
        .x(d => d.x)
        .y(d => d.y)
        .rotate(d => 9)
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
      new shapes.Area()
        .data(polarAxisLines)
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

    const groupPath = [];
    spaceAxis.forEach((space, i) => {
      const elm = this._data.filter((d, i) => this._x(d, i) === space);
      const q = elm.map((d, i) => {
        const angle = tau / totalAxis * i,
              r = d.value / maxValue * radius;
        return {
          angle: tau / totalAxis * i,
          x: r * Math.cos(angle),
          y: r * Math.sin(angle)
        };
      });

      const d = `M ${q[0].x} ${q[0].y} ${q
        .map(l => `L ${l.x} ${l.y}`)
        .join(" ")}`;

      groupPath.push({id: i, d});
    });

    this._shapes.push(
      new shapes.Path()
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
}
