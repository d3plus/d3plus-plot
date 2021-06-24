import {assign, constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class Pyramid
    @extends Plot
    @desc Creates a population pyramid based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("y")
  .shape("Bar")
  .stacked(true)
  .xConfig({tickFormat: d => Math.abs(d)})
*/
export default class Pyramid extends Plot {

  /**
      @memberof Pyramid
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {
    super();

    this._discrete = "y";
    this._shape = constant("Bar");
    this._stacked = true;
    this.x("x");
    this._xConfig = {
      tickFormat: d => Math.abs(d)
    };

  }

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {
    this._filteredData.map((d, i) => ({
      __d3plus__: true,
      data: assign(d, {
        x: this._filteredData.indexOf(this._filteredData.find((h, x) => this._groupBy[0](h, x) === this._groupBy[0](d, i))) ? -this._x(d, i) : this._x(d, i)
      }),
      i,
      hci: this._confidence && this._confidence[1] && this._confidence[1](d, i),
      id: this._ids(d, i)
        .slice(0, this._drawDepth + 1)
        .join("_"),
      lci: this._confidence && this._confidence[0] && this._confidence[0](d, i),
      shape: this._shape(d, i),
      y: this._y(d, i)
    }));

    super._draw(callback);

    return this;
  }
}
