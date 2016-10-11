export default function(data, x, y) {

  const s = this._discrete === "x" ? y : x;

  const d = s.domain().slice(),
        r = s.range().slice();

  if (this._discrete === "x") {
    d.reverse();
    r.reverse();
  }

  d[1] = s.invert(r[1] + (this._discrete === "x" ? -10 : 10));

  if (this._discrete === "x") d.reverse();

  s.domain(d);

  return [x, y];

}
