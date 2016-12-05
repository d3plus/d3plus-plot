import {max} from "d3-array";

export default function(data, x, y) {

  const oppScale = this._discrete === "x" ? y : x;

  const oppDomain = oppScale.domain().slice();

  if (this._discrete === "x") oppDomain.reverse();

  const vals = data.map(d => d[this._discrete === "x" ? "y" : "x"]);
  const b = oppScale.invert(oppScale(max(vals)) + (this._discrete === "x" ? -10 : 10));

  if (b > oppDomain[1]) oppDomain[1] = b;

  if (this._discrete === "x") oppDomain.reverse();

  oppScale.domain(oppDomain);

  const discreteScale = this._discrete === "x" ? x : y;

  const newDomain = ["d3plus-buffer-start"];
  discreteScale.domain().forEach(b => {
    newDomain.push(b);
    newDomain.push(`d3plus-buffer-${b}`);
  });

  discreteScale.domain(newDomain);

  return [x, y];

}
