import {max, min, sum} from "d3-array";
import {nest} from "d3-collection";

import {default as ordinalBuffer} from "./ordinalBuffer";

/**
    Adds a buffer to either side of the non-discrete axis.
    @param {Array} data
    @param {D3Scale} x
    @param {D3Scale} y
    @param {Object} [config]
    @param {Number} [buffer]
*/
export default function(data, x, y, config = {}, buffer = 10) {

  const oppScale = this._discrete === "x" ? y : x;

  const oppDomain = oppScale.domain().slice();

  if (this._discrete === "x") oppDomain.reverse();

  let negVals, posVals;
  if (this._stacked) {
    const groupedData = nest()
      .key(d => d[this._discrete])
      .entries(data)
      .map(d => d.values.map(x => x[this._discrete === "x" ? "y" : "x"]));
    posVals = groupedData.map(arr => sum(arr.filter(d => d > 0)));
    negVals = groupedData.map(arr => sum(arr.filter(d => d < 0)));
  }
  else {
    posVals = data.map(d => d[this._discrete === "x" ? "y" : "x"]);
    negVals = posVals;
  }
  let bMax = oppScale(max(posVals));
  if (bMax !== oppScale(0)) bMax += this._discrete === "x" ? -buffer : buffer;
  bMax = oppScale.invert(bMax);

  let bMin = oppScale(min(negVals));
  if (bMin !== oppScale(0)) bMin += this._discrete === "x" ? buffer : -buffer;
  bMin = oppScale.invert(bMin);

  if (bMax > oppDomain[1]) oppDomain[1] = bMax;
  if (bMin < oppDomain[0]) oppDomain[0] = bMin;

  if (this._discrete === "x") oppDomain.reverse();

  oppScale.domain(oppDomain);

  const discreteScale = this._discrete === "x" ? x : y;
  discreteScale.domain(ordinalBuffer(discreteScale.domain()));

  return [x, y];

}
