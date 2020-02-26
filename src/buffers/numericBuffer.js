import {scaleLog} from "d3-scale";

/** */
export default function(axis, scale, value, size, range, domain, index, invert) {
  // console.log("\n");
  // console.log(invert ? "Y Axis" : "X Axis");
  // console.log("Index:", index);
  // console.log("Range", range);
  if (invert) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

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
        const percentScale = scaleLog().domain([1, Math.abs(d[index])]).range([0, 1]);
        const leftPercentage = percentScale(Math.abs(d[index ? 0 : 1]));
        const zero = leftPercentage / (leftPercentage + 1) * (r[1] - r[0]);
        d = (index === 0 ? [d[0], 1] : [1, d[1]]).map(Math.abs);
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
      pixelValue = !diverging || value < 0 && !index || value > 0 && index ? tempAxis(Math.abs(value)) : tempRange[value < 0 ? 0 : 1];
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
    // console.log("temp", pixelValue, size, tempAxis.domain(), tempRange);
    return outside;

  };

  if (axis.invert && needsBuffer()) {
    if (scale === "log") {
      let decrease = index === 0 && domain[0] > 0 || index === 1 && domain[1] < 0;
      let log = Math[decrease ? "ceil" : "floor"](Math.log10(Math.abs(domain[index])));
      // console.log("Log start:", log, decrease);
      while (needsBuffer() && log < 20) {
        log = decrease ? log - 1 : log + 1;
        let mod = domain[index] < 0 ? -1 : 1;
        if (log < 0) {
          log = 1;
          decrease = !decrease;
          mod = !mod;
        }
        domain[index] = Math.pow(10, log) * mod;
        axis.domain(invert ? domain.slice().reverse() : domain);
        // console.log("change!", domain);
      }
    }
    else if (index === 0) {
      const v = axis.invert(axis(value) + size * (invert ? 1 : -1));
      // console.log("value", v, domain);
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
