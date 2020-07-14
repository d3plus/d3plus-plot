import {scaleLog} from "d3-scale";

/** */
export default function(axis, scale, value, size, range, domain, index, invert) {

  if (invert) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  const logMod = Math.abs(Math.log(domain[1] - domain[0]) / 10);

  const needsBuffer = () => {
    let tempAxis = axis.copy();
    let diverging = false;
    if (scale === "log") {
      let d = axis.domain().slice(),
          r = axis.range().slice();
      if (invert) {
        d = d.reverse();
        r = r.reverse();
      }
      diverging = d[0] * d[1] < 0;
      if (diverging) {
        const percentScale = scaleLog().domain([1e-6, Math.abs(d[index])]).range([0, 1]);
        const leftPercentage = percentScale(Math.abs(d[index ? 0 : 1]));
        const zero = leftPercentage / (leftPercentage + 1) * (r[1] - r[0]);
        d = (index === 0 ? [d[0], 1e-6] : [1e-6, d[1]]).map(Math.abs);
        r = index === 0 ? [r[0], r[0] + zero] : [r[0] + zero, r[1]];
      }
      tempAxis = scaleLog()
        .domain(d)
        .range(r);
    }

    let outside = false;
    const tempRange = tempAxis.range();
    let pixelValue;
    if (scale === "log") {
      pixelValue = diverging ? tempAxis(Math.abs(value)) : tempAxis(value);
    }
    else pixelValue = tempAxis(value);

    if (invert) {
      if (index === 0) outside = pixelValue + size > tempRange[index];
      else if (index === 1) outside = pixelValue - size < tempRange[index];
    }
    else {
      if (index === 0) outside = pixelValue - size < tempRange[index];
      else if (index === 1) outside = pixelValue + size > tempRange[index];
    }
    return outside;

  };

  if (axis.invert && needsBuffer()) {
    if (scale === "log") {
      let i = 0;
      while (i < 10 && needsBuffer()) {
        const mod = (index === 0 ? -1 : 1) * (domain[index] < 0 ? -1 : 1);
        domain[index] += domain[index] * logMod * mod;
        axis.domain(invert ? domain.slice().reverse() : domain);
        i++;
      }
    }
    else if (index === 0) {
      const v = axis.invert(axis(value) + size * (invert ? 1 : -1));
      if (v < domain[index]) {
        domain[index] = v;
        axis.domain(invert ? domain.slice().reverse() : domain);
      }
    }
    else if (index === 1) {
      const v = axis.invert(axis(value) + size * (invert ? -1 : 1));
      if (v > domain[index]) {
        domain[index] = v;
        axis.domain(invert ? domain.slice().reverse() : domain);
      }
    }
  }

  return invert ? domain.reverse() : domain;
}
