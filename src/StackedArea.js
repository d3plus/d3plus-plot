import {default as Area} from "./Area";

/**
    @class StackedArea
    @extends Area
    @desc Creates a stacked area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Area()
  .stacked(true)
*/
export default class StackedArea extends Area {

  /**
      @memberof StackedArea
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._stacked = true;

  }

}
