import {extent} from "d3-array";
import {constant, assign} from "d3plus-common";

import {default as Plot} from "./Plot";

/**
    @class BumpChart
    @extends Plot
    @desc Creates a bump chart based on an array of data.
    @example <caption>the equivalent of calling:</caption>
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
    this.ySort((a, b) => b.y - a.y);
    this.y2Sort((a, b) => b.y - a.y);

  }

  /**
   Extends the draw behavior of the abstract Plot class.
   @private
   */
  _draw(callback) {

    const chart = super._draw(callback);

    const data = chart._filteredData.map((d, i) => ({
      __d3plus__: true,
      data: d,
      i,
      id: this._ids(d, i).slice(0, this._drawDepth + 1).join("_"),
      shape: this._shape(d, i),
      x: this._x(d, i),
      x2: this._x2(d, i),
      y: this._y(d, i),
      y2: this._y2(d, i)
    }));

    const yConfig = chart._yConfig;
    const y2Config = chart._y2Config;

    const xDomain = extent(data.map(d => d.x));

    const startData = data.filter(d => d.x === xDomain[0]);
    const endData = data.filter(d => d.x === xDomain[1]);

    const getStartLabel = val => startData.find(d => d.y === val).id;
    const getEndLabel = val => endData.find(d => d.y === val).id;

    this._yConfig = assign(yConfig, {tickFormat: getStartLabel});
    this._y2Config = assign(y2Config, {tickFormat: getEndLabel});

    super._draw(callback);

  }

}
