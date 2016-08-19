# Getting Started

d3plus-plot combines the abstract Viz class found in [d3plus-viz](https://github.com/d3plus/d3plus-viz) with the axes in [d3plus-axis](https://github.com/d3plus/d3plus-axis) to create a standard x/y plot. In addition to a lot of automatic formatting and positioning, the Viz class also provides mouse events and tooltips.

```js
var data = [
  {id: "alpha", x: 4, y: 7},
  {id: "beta", x: 5, y: 2},
  {id: "gamma", x: 6, y: 13}
];
```

Given some data points, we can create a scatter plot very easily:

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .render();
```
