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
    this._shape = constant("Circle");

    this._shapeConfig = assign(this._shapeConfig, {
      Circle: {
        opacity: d => d.__d3plusOpacity__ || 1,
        labelConfig: {
          fontResize: true
        }
      }
    });
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
    const transform = `translate(${diameter / 2}, ${diameter / 2})`;

    const maxValue = Math.max(...this._data.map(d => d.value));
    
    // TO-DO
    const allAxis = this._data.map(d => d.skill);
    const total = allAxis.length;
    const radius = this._factor * (diameter / 2);

    for (let j = 0; j < this._levels; j++) {
      const levelFactor = this._factor * radius * ((j + 1) / this._levels);
      this._shapes.push(
        new shapes.Circle()
        .r(r)
          .select(
            elem("g.d3plus-Radar", {
              parent: this._select,
              enter: {transform},
              update: {transform}
            }).node()
          )
          .config(configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
          .render()
      );
    }

    this._shapes.push(
      new shapes.Circle()
      .r(r)
        .select(
          elem("g.d3plus-Radar", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
        .render()
    );

    return this;
  }
}
