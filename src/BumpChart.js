import {constant} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class BumpChart
    @extends Plot
    @desc Creates a bump chart based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
  .x("x")
  .y2("y")
  .yConfig({
    tickFormat: val => {
      const data = this._filteredData;
      const xDomain = this._xDomain;
      const startData = data.filter(d => d.x === xDomain[0]);
      return startData.find(d => d.y === val).id;
     }
   })
  .y2Config({
    tickFormat: val => {
      const data = this._filteredData;
      const xDomain = this._xDomain;
      const endData = data.filter(d => d.x === xDomain[1]);
      return startData.find(d => d.y === val).id;
     }
   })
  .ySort((a, b) => b.y - a.y)
  .y2Sort((a, b) => b.y - a.y)
*/
export default class BumpChart extends Plot {

  /**
      @memberof BumpChart
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._discrete = "x";
    this._shape = constant("Line");
    this.x("x");
    this.y2("y");
    this.yConfig({
      tickFormat: val => {
        const data = this._filteredData;
        const xDomain = this._xDomain;
        const startData = data.filter(d => d.x === xDomain[0]);
        const d = startData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
      }
    });
    this.y2Config({
      tickFormat: val => {
        const data = this._filteredData;
        const xDomain = this._xDomain;
        const endData = data.filter(d => d.x === xDomain[xDomain.length - 1]);
        const d = endData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
      }
    });
    this.ySort((a, b) => b.y - a.y);
    this.y2Sort((a, b) => b.y - a.y);
  }

}
