import {default as ordinalBuffer} from "./ordinalBuffer";

export default function({data, x, y, y2, config}) {
  const yKey = y2 ? "y2" : "y";

  let xD = x.domain().slice(),
      yD = y.domain().slice();

  const xR = x.range(),
        yR = y.range();

  if (!x.invert) xD = ordinalBuffer(xD);
  if (!y.invert) yD = ordinalBuffer(yD);

  data.forEach(d => {

    const h = config.height(d.data, d.i),
          w = config.width(d.data, d.i);

    if (x.invert && x(d.x) - xR[0] < w) {
      const v = x.invert(x(d.x) - w);
      if (v < xD[0]) xD[0] = v;
    }
    if (x.invert && xR[1] - x(d.x) < w) {
      const v = x.invert(x(d.x) + w);
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

  x.domain(xD);
  y.domain(yD);

  return [x, y];

}
