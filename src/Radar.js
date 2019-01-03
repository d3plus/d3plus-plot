/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
import {nest} from "d3-collection";
import {accessor, assign, configPrep, constant, elem} from "d3plus-common";
import {Circle, Path, Rect} from "d3plus-shape";
import {Viz} from "d3plus-viz";

const tau = Math.PI * 2;

/**
    @class Radar
    @extends Plot
    @desc Creates a radar visualization based on an array of data.
*/
export default class Radar extends Viz {

  /**
      @memberof Radar
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
      @private
  */
  constructor() {
    super();

    this._axisConfig = {
      fill: constant("none"),
      stroke: constant("#CCC"),
      strokeWidth: constant(1)
    };
    this._hover = true;
    this._levels = 6;
    this._radarPadding = 100;
    this._shape = constant("Path");
    this._shapeConfig = assign(this._shapeConfig, {
      Circle: {
        r: accessor("r", 0)
      },
      Path: {}
    });
    this._value = accessor("value");
    this._x = accessor("x");
    this._y = accessor("y");
  }

  /**
      Extends the draw behavior of the abstract Plot class.
      @private
  */
  _draw(callback) {
    super._draw(callback);
    const height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    const radius = (Math.min(height, width) - this._radarPadding) / 2,
          transform = `translate(${width / 2}, ${height / 2})`;

    const maxValue = Math.max(...this._filteredData.map((d, i) => this._value(d, i))),
          nestedAxisData = nest()
        .key(this._y)
        .entries(this._filteredData),
          nestedGroupData = nest()
        .key(this._x)
        .entries(this._filteredData);

    const circularAxis = Array.from(Array(this._levels).keys()).map(d => ({
      id: d,
      r: radius * ((d + 1) / this._levels)
    }));

    new Circle()
      .data(circularAxis)
      .select(
        elem("g.d3plus-Radar-radial-circles", {
          parent: this._select,
          enter: {transform},
          update: {transform}
        }).node()
      )
      .config(this._axisConfig)
      .render();

    const totalAxis = nestedAxisData.length;
    const polarAxis = nestedAxisData
      .map((d, i) => {
        const width = 100;
        const fontSize =
          this._shapeConfig.labelConfig.fontSize &&
            this._shapeConfig.labelConfig.fontSize(d, i) ||
          11;

        const lineHeight = fontSize * 1.4;
        const height = lineHeight * 2;
        const padding = 10,
              quadrant = parseInt(360 - 360 / totalAxis * i / 90, 10) % 4 + 1,
              radians = tau / totalAxis * i;

        let angle = 360 / totalAxis * i;

        let textAnchor = "start";
        let x = padding;

        if (quadrant === 2 || quadrant === 3) {
          x = -width - padding;
          textAnchor = "end";
          angle += 180;
        }

        const labelBounds = {
          x,
          y: -height / 2,
          width,
          height
        };

        return {
          id: d.key,
          angle,
          textAnchor,
          labelBounds,
          rotateAnchor: [-x, height / 2],
          x: radius * Math.cos(radians),
          y: radius * Math.sin(radians)
        };
      })
      .sort((a, b) => a.key - b.key);

    new Rect()
      .data(polarAxis)
      .rotate(d => d.angle)
      .width(0)
      .height(0)
      .x(d => d.x)
      .y(d => d.y)
      .label(d => d.id)
      .labelBounds(d => d.labelBounds)
      .labelConfig({
        padding: 0,
        textAnchor: d => d.data.textAnchor,
        rotateAnchor: d => d.data.data.rotateAnchor,
        fontColor: "black",
        verticalAlign: "middle"
      })
      .select(
        elem("g.d3plus-Radar-text", {
          parent: this._select,
          enter: {transform},
          update: {transform}
        }).node()
      )
      .render();

    new Path()
      .data(polarAxis)
      .d(d => `M${0},${0} ${-d.x},${-d.y}`)
      .select(
        elem("g.d3plus-Radar-axis", {
          parent: this._select,
          enter: {transform},
          update: {transform}
        }).node()
      )
      .config(this._axisConfig)
      .render();

    const groupData = nestedGroupData.map(h => {
      const q = h.values.map((d, i) => {
        const r = this._value(d, i) / maxValue * radius,
              radians = tau / totalAxis * i;
        return {
          x: r * Math.cos(radians),
          y: r * Math.sin(radians)
        };
      });

      const d = `M ${q[0].x} ${q[0].y} ${q
        .map(l => `L ${l.x} ${l.y}`)
        .join(" ")} L ${q[0].x} ${q[0].y}`;

      return {id: h.key, d};
    });

    this._shapes.push(
      new Path()
        .data(groupData)
        .d(d => d.d)
        .select(
          elem("g.d3plus-Radar-items", {
            parent: this._select,
            enter: {transform},
            update: {transform}
          }).node()
        )
        .config(configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .render()
    );

    return this;
  }

  /**
      @memberof Radar
      @desc If *value* is specified, sets the padding of the chart and returns the current class instance. If *value* is not specified, returns the current radarPadding. By default, the radarPadding is 100.
      @param {Number} [*value* = 100]
      @chainable
  */
  radarPadding(_) {
    return arguments.length
      ? (this._radarPadding = _, this)
      : this._radarPadding;
  }

  /**
      @memberof Radar
      @desc If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.
      @param {Function|String} *value*
      @example
function value(d) {
  return d.value;
}
  */
  value(_) {
    return arguments.length
      ? (this._value = typeof _ === "function" ? _ : accessor(_), this)
      : this._value;
  }

  /**
      @memberof Plot
      @desc Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} *value*
      @chainable
  */
  x(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._x = _;
      else {
        this._x = accessor(_);
        if (!this._aggs[_] && this._discrete === "x") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._x;
  }

  /**
      @memberof Plot
      @desc Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} *value*
      @chainable
  */
  y(_) {
    if (arguments.length) {
      if (typeof _ === "function") this._y = _;
      else {
        this._y = accessor(_);
        if (!this._aggs[_] && this._discrete === "y") {
          this._aggs[_] = a => {
            const v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else return this._y;
  }
}
