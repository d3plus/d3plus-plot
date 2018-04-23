# Secondary Axis Only

This example demonstrates creating a Plot that has a secondary x-axis, but does not have a primary x-axis. This is achieved by supplying a [`.x2`](https://d3plus.org/docs/#Plot.x2) accessor and setting options in the [`.xConfig`](https://d3plus.org/docs/#Plot.xConfig) to hide the primary x-axis.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];

new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .xConfig({
    barConfig:  {"stroke-width": 0},
    gridConfig:  {"stroke-width": 0},
    ticks: [],
    title: false
  })
  .x2Config({
    title: "X Axis"
  })
  .x2("x")
  .render();
```
