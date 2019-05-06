# Bar Chart Axis and Grid Configuration

You can change the color, width etc. of [BarChart](http://d3plus.org/docs/#BarChart) axes and grids by specifying `stroke`, `stroke-width` attributes inside `barConfig` and `gridConfig`.

```js
var data = [
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
];

new d3plus.BarChart()
  .config({
    data,
    discrete: "y",
    groupBy: "id",
    x: "y",
    y: "x",
    xConfig: {
      // main x-axis bar line
      barConfig: {
        "stroke": "blue",
        "stroke-width": 2
      },
      // secondary grid lines
      gridConfig: {
        "stroke": "orange",
        "stroke-width": 1,
        "opacity": 0.5
      },
      // value labels
      shapeConfig: {
        labelConfig: {
          fontMin: 12,
          fontMax: 14
        }
      },
      // hide ticks
      tickSize: 0
    },
    yConfig: {
      // main y-axis bar line
      barConfig: {
        "stroke": "green",
        "stroke-width": 2
      },
      // hide secondary y-axis grid lines
      gridConfig: {
        opacity: 0
      },
    }
  })
  .render();
```
