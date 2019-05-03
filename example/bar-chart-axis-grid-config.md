# Bar Chart Axis and Grid Configuration

[BarChart](http://d3plus.org/docs/#BarChart) axes and grids can be set to custom color by setting the `stroke` property of `barConfig` and `gridConfig` to custom color nested inside [xConfig](http://d3plus.org/docs/#Plot.xConfig) or [yConfig](http://d3plus.org/docs/#Plot.yConfig) depending on the axis we want to change.

```js
var data = [
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
];
```

We can also change other properties of axes and grid as shown in following example:

```js
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
      }
      // hide secondary y-axis grid lines
      gridConfig: {
        opacity: 0
      },
    }
  })
  .render();
```
