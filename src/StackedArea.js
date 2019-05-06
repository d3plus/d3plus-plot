import {default as AreaPlot} from "./AreaPlot";
import { sum } from "d3-array";
import { nest } from "d3-collection";
import { constant, merge } from "d3plus-common";

/**
    @class StackedArea
    @extends Area
    @desc Creates a stacked area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.AreaPlot()
  .stacked(true)
*/
export default class StackedArea extends AreaPlot {

  /**
      @memberof StackedArea
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {

    super();
    this._stacked = true;
    this._threshold = constant(0.1);

  }

  /**
   * Applies the threshold algorithm according to the type of chart used.
   * @param {Array} data The data to process.
   */
  _thresholdFunction(data, tree) {
    const drawDepth = this._drawDepth;
    if (drawDepth > 0) {
      const aggs = this._aggs;
      const groupBy = this._groupBy;
      const threshold = this._threshold(data);
      
      const accesorDiscrete = this._discrete === "x" ? this._x : this._y;
      const accesorValue = this._discrete === "x" ? this._y : this._x;
      
      const flatData = data.slice();
      
      let m = tree.length;
      while (m--) {
        thresholdByDepth(flatData, tree[m], 0);
      }

      function thresholdByDepth(values, branch, depth) {
        const accesorLevel = groupBy[depth];
        const nextValues = values.filter(item => accesorLevel(item) === branch.key);

        if (depth === drawDepth - 1) {
          // Let M(x,t) be a matrix of values for x categories and t time point.
          // S=sum(M(x,t),t).  [this gives you the total of each category x summed over each time point t]
          // C=cumsum(S,’ascend’)/sum(S) [this gives you the normalized cumulative sume of S from the smallest to largest value]
          // Ul=find(C< 0.1) [this gives you the indexes of the values of the cumulative sum that are smaller than 10%. It is our parameter]
          // Uh=find(C>=0.1) [same, but finding the indexes of the ]
          // Mnew=M(Uh,:) [creates a matrix with all of the rows that are above the threshold]
          // Mnew(Uh+1,:) = sum(Mnew(Ul,:))  [appends a last row with the sume of all rows below the threshold]

          if (branch.values.length < 20) return;

          const branchThreshold = sum(nextValues, accesorValue) * threshold;

          // group the elements by the last depth possible in groupBy
          // entries returns the elements in a grouping by this level
          const accesorNext = groupBy[depth + 1];
          const filteredIndices = nest()
            .key(accesorNext)
            .entries(nextValues)
            .map(leaf => ({
              key: leaf.key,
              value: sum(leaf.values, accesorValue)
            }))
            .sort((a, b) => a.value - b.value)
            .filter((leaf, l, arr) => sum(arr.slice(0, l + 1), d => d.value) < branchThreshold)
            .map(leaf => leaf.key);

          if (filteredIndices.length < 2) return;

          // group the elements by the discrete axis (eg. Year)
          nest()
            .key(accesorDiscrete)
            .rollup(discreteItems => {
              const removedItems = [];

              let n = discreteItems.length;
              while (n--) {
                const item = discreteItems[n];
                if (filteredIndices.indexOf(accesorNext(item)) > -1) {
                  const index = flatData.indexOf(item);
                  flatData.splice(index, 1);
                  removedItems.push(item);
                }
              }

              const mergedItem = merge(removedItems, aggs);
              mergedItem._isAggregation = true;
              mergedItem._threshold = threshold;
              flatData.push(mergedItem);
            })
            .entries(nextValues);
        }
        else {
          const leaves = branch.values;
          let n = leaves.length;
          while (n--) {
            thresholdByDepth(nextValues, leaves[n], depth + 1);
          }
        }
      }

      return flatData;
    }

    return data;
  }

}
