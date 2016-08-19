export default function(data, x, y, config) {

  const xD = x.domain().slice(),
        xR = x.range(),
        yD = y.domain().slice(),
        yR = y.range();

  data.forEach(d => {
    const r = config.r(d.data, d.i);
    if (x(d.x) - xR[0] < r * 2) {
      const v = x.invert(x(d.x) - r * 2);
      if (v < xD[0]) xD[0] = v;
    }
    if (xR[1] - x(d.x) < r * 2) {
      const v = x.invert(x(d.x) + r * 2);
      if (v > xD[1]) xD[1] = v;
    }
    if (y(d.y) - yR[0] < r * 2) {
      const v = y.invert(y(d.y) - r * 2);
      if (v > yD[0]) yD[0] = v;
    }
    if (yR[1] - y(d.y) < r * 2) {
      const v = y.invert(y(d.y) + r * 2);
      if (v < yD[1]) yD[1] = v;
    }
  });

  x.domain(xD);
  y.domain(yD);

  return [x, y];

}
