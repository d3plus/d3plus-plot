export default function(data, x, y, config) {

  const xD = x.domain().slice(),
        xR = x.range(),
        yD = y.domain().slice(),
        yR = y.range();

  data.forEach(d => {
    const h = config.height(d.data, d.i),
          w = config.width(d.data, d.i);
    if (x(d.x) - xR[0] < w) {
      const v = x.invert(x(d.x) - w);
      if (v < xD[0]) xD[0] = v;
    }
    if (xR[1] - x(d.x) < w) {
      const v = x.invert(x(d.x) + w);
      if (v > xD[1]) xD[1] = v;
    }
    if (y(d.y) - yR[0] < h) {
      const v = y.invert(y(d.y) - h);
      if (v > yD[0]) yD[0] = v;
    }
    if (yR[1] - y(d.y) < h) {
      const v = y.invert(y(d.y) + h);
      if (v < yD[1]) yD[1] = v;
    }
  });

  x.domain(xD);
  y.domain(yD);

  return [x, y];

}
