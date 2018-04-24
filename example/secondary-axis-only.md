# Secondary Axis Only

This example demonstrates creating a Plot that has a secondary x-axis, but does not have a primary x-axis. This is achieved by passing `false` as a static value for [`.x`](https://d3plus.org/docs/#Plot.x) and supplying a [`.x2`](https://d3plus.org/docs/#Plot.x2) accessor.

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
  .x2("x")
  .render();
```
