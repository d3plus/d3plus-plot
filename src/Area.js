import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class Area
    @extends Plot
    @desc Creates an area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Area")
  .xDomain([0, undefined])
*/
export default class Area extends Plot {

  /**
      @memberof Area
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this.discrete("x");
    this._shape = constant("Area");

  }

  /**
      @memberof Area
      @desc If *value* is specified, sets the discrete axis to the specified method name and returns the current class instance. If *value* is not specified, returns the current discrete axis.
      @param {String} [*value*]
  */
  discrete(_) {
    if (arguments.length) {
      this._discrete = _;
      this[`${_ === "x" ? "y" : "x"}Domain`]([0, void 0]);
      this[`${_}Domain`](void 0);
      return this;
    }
    return this._discrete;
  }

}
