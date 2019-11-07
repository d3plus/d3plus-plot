import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class LinePlot
    @extends Plot
    @desc Creates a line plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
*/
export default class LinePlot extends Plot {

  /**
      @memberof LinePlot
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._shape = constant("Line");

  }

}
