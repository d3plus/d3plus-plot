# Adding Labels to Line Plots

Sometimes when rendering Line Plots, usually when there aren't too many lines, labels can be placed at the end of each line, to the right of the x-axis. To enable this feature, simply pass `true` to the [lineLabels](http://d3plus.org/docs/#Plot.lineLabels) method.

```js
new d3plus.LinePlot()
  .config({
    data: [
      {id: "alpha", x: 4, y:  9},
      {id: "alpha", x: 5, y: 17},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y:  8},
      {id: "beta",  x: 6, y: 16},
      {id: "gamma",  x: 4, y: 14},
      {id: "gamma",  x: 5, y:  9},
      {id: "gamma",  x: 6, y: 11}
    ],
    groupBy: "id",
    lineLabels: true,
    x: "x",
    y: "y"
  })
  .render();
```
