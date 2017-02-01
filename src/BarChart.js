import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class BarChart
    @extends Plot
    @desc Creates a line plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
*/
export default class BarChart extends Plot {

  /**
      @memberof BarChart
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._barPadding = 20;
    this._baseline = 0;
    this._discrete = "x";
    this._shape = constant("Bar");
    this.x("x");

  }

  /**
      @memberof BarChart
      @desc Sets the pixel space between groups of bars.
      @param {Number} [*value* = 20]
  */
  barPadding(_) {
    return arguments.length ? (this._barPadding = _, this) : this._barPadding;
  }

}
