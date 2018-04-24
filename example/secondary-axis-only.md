# Secondary Axis Only

This example demonstrates creating a Plot that has a secondary x-axis, but does not have a primary x-axis. This is achieved by passing `false` as a static value for [`.x`](https://d3plus.org/docs/#Plot.x), supplying a [`.x2`](https://d3plus.org/docs/#Plot.x2) accessor and setting options in the [`.xConfig`](https://d3plus.org/docs/#Plot.xConfig) to remove the primary x-axis title.

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
  .x(false)
  .xConfig({
    title: false
  })
  .x2("x")
  .x2Config({
    title: "X Axis"
  })
  .render();
```
