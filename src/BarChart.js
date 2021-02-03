import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class BarChart
    @extends Plot
    @desc Creates a bar chart based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Bar")
*/
export default class BarChart extends Plot {

  /**
      @memberof BarChart
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._baseline = 0;
    this._discrete = "x";
    const defaultLegend = this._legend;
    this._legend = (config, arr) => {
      if (arr.length === this._filteredData.length) return false;
      return defaultLegend.bind(this)(config, arr);
    };
    this._shape = constant("Bar");
    this.x("x");

  }

}
