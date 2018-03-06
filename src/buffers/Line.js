import {max} from "d3-array";

export default function({data, x, y, x2, y2}) {
  const xKey = x2 ? "x2" : "x";
  const yKey = y2 ? "y2" : "y";

  const s = this._discrete === "x" ? y : x;

  const d = s.domain().slice();

  if (this._discrete === "x") d.reverse();

  const vals = data.map(d => d[this._discrete === "x" ? yKey : xKey]);
  const b = s.invert(s(max(vals)) + (this._discrete === "x" ? -10 : 10));

  if (b > d[1]) d[1] = b;

  if (this._discrete === "x") d.reverse();

  s.domain(d);

  return [x, y];

}
