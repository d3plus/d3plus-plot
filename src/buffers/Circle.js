import {default as ordinalBuffer} from "./ordinalBuffer";

export default function(data, x, y, config) {

  let xD = x.domain().slice(),
      yD = y.domain().slice();

  const xR = x.range(),
        yR = y.range();

  if (!x.invert) xD = ordinalBuffer(xD);
  if (!y.invert) yD = ordinalBuffer(yD);

  data.forEach(d => {

    const s = config.r(d.data, d.i) * 2;

    if (x.invert && x(d.x) - xR[0] < s) {
      const v = x.invert(x(d.x) - s);
      if (v < xD[0]) xD[0] = v;
    }
    if (x.invert && xR[1] - x(d.x) < s) {
      const v = x.invert(x(d.x) + s);
      if (v > xD[1]) xD[1] = v;
    }

    if (y.invert && y(d.y) - yR[0] < s) {
      const v = y.invert(y(d.y) - s);
      if (v > yD[0]) yD[0] = v;
    }
    if (y.invert && yR[1] - y(d.y) < s) {
      const v = y.invert(y(d.y) + s);
      if (v < yD[1]) yD[1] = v;
    }

  });

  x.domain(xD).range(xR);
  y.domain(yD).range(yR);

  return [x, y];

}
