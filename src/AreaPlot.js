import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class AreaPlot
    @extends Plot
    @desc Creates an area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Area")
*/
export default class AreaPlot extends Plot {

  /**
      @memberof AreaPlot
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._baseline = 0;
    this._discrete = "x";
    this._shape = constant("Area");

  }

}
