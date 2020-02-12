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
export default function({data, x, y, x2, y2, config}) {
  const xKey = x2 ? "x2" : "x";
  const yKey = y2 ? "y2" : "y";

  const xD = x.domain().slice(),
        yD = y.domain().slice();

  const xR = x.range(),
        yR = y.range();

  if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
  if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

  data.forEach(d => {

    const h = config.height(d.data, d.i),
          w = config.width(d.data, d.i);

    if (x.invert && x(d[xKey]) - xR[0] < w) {
      const v = x.invert(x(d[xKey]) - w);
      if (v < xD[0]) xD[0] = v;
    }
    if (x.invert && xR[1] - x(d[xKey]) < w) {
      const v = x.invert(x(d[xKey]) + w);
      if (v > xD[1]) xD[1] = v;
    }

    if (y.invert && y(d[yKey]) - yR[0] < h) {
      const v = y.invert(y(d[yKey]) - h);
      if (v > yD[0]) yD[0] = v;
    }
    if (y.invert && yR[1] - y(d[yKey]) < h) {
      const v = y.invert(y(d[yKey]) + h);
      if (v < yD[1]) yD[1] = v;
    }

  });

  x = x.copy().domain(xD);
  y = y.copy().domain(yD);

  return [x, y];

}
