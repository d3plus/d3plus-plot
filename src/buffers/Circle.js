import {default as ordinalBuffer} from "./ordinalBuffer";

/**
    Adds a buffer to either side of the non-discrete axis.
    @param {Array} data
    @param {D3Scale} x
    @param {D3Scale} y
    @param {Object} [config]
    @param {Number} [buffer] Defaults to the radius of the largest Circle.
    @private
*/
export default function({data, x, y, y2, config, buffer}) {
  const yKey = y2 ? "y2" : "y";

  let xD = x.domain().slice(),
      yD = y.domain().slice();

  const xR = x.range(),
        yR = y.range();

  if (!x.invert) xD = ordinalBuffer(xD);
  if (!y.invert) yD = ordinalBuffer(yD);

  data.forEach(d => {

    const s = buffer ? buffer : config.r(d.data, d.i) * 2;

    if (x.invert && x(d.x) - xR[0] < s) {
      const v = x.invert(x(d.x) - s);
      if (v < xD[0]) xD[0] = v;
    }
    if (x.invert && xR[1] - x(d.x) < s) {
      const v = x.invert(x(d.x) + s);
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

  x.domain(xD).range(xR);
  y.domain(yD).range(yR);

  return [x, y];

}
