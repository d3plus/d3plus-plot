import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class BoxWhisker
    @extends Plot
    @desc Creates a simple box and whisker based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Box")
*/
export default class BoxWhisker extends Plot {

  /**
      @memberof BoxWhisker
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._discrete = "x";
    this._shape = constant("Box");
    this.x("x");

  }

}
