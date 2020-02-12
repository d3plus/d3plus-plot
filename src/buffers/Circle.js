import discreteBuffer from "./discreteBuffer";

/**
    Adds a buffer to either side of the non-discrete axis.
    @param {Array} data
    @param {D3Scale} x
    @param {D3Scale} y
    @param {Object} [config]
    @param {Number} [buffer] Defaults to the radius of the largest Circle.
    @private
*/
export default function({data, x, y, x2, y2, config, buffer}) {
  const xKey = x2 ? "x2" : "x";
  const yKey = y2 ? "y2" : "y";

  const xD = x.domain().slice(),
        yD = y.domain().slice();

  const xR = x.range(),
        yR = y.range();

  if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
  if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

  data.forEach(d => {

    const s = buffer ? buffer : config.r(d.data, d.i) * 2;

    if (x.invert && x(d[xKey]) - xR[0] < s) {
      const v = x.invert(x(d[xKey]) - s);
      if (v < xD[0]) xD[0] = v;
    }
    if (x.invert && xR[1] - x(d[xKey]) < s) {
      const v = x.invert(x(d[xKey]) + s);
      if (v > xD[1]) xD[1] = v;
    }
    if (y.invert && y(d[yKey]) - yR[0] < s) {
      const v = y.invert(y(d[yKey]) - s);
      if (v > yD[0]) yD[0] = v;
    }
    if (y.invert && yR[1] - y(d[yKey]) < s) {
      const v = y.invert(y(d[yKey]) + s);
      if (v < yD[1]) yD[1] = v;
    }

  });

  x = x.copy().domain(xD).range(xR);
  y = y.copy().domain(yD).range(yR);

  return [x, y];

}
