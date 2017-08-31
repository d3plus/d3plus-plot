# Simple X/Y Plot

[d3plus-plot](https://github.com/d3plus/d3plus-plot) combines the abstract [Viz](http://d3plus.org/docs/#Viz) class found in [d3plus-viz](https://github.com/d3plus/d3plus-viz) with the axes in [d3plus-axis](https://github.com/d3plus/d3plus-axis) to create a standard x/y plot. In addition to a lot of automatic formatting and positioning, the [Viz](http://d3plus.org/docs/#Viz) class also provides mouse events and tooltips.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "beta",  x: 5, y:  2},
  {id: "gamma", x: 6, y: 13}
];
```

Given some data points, we can create a plot very easily:

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .render();
```

This creates an x/y plot using the default shape ([Circle](http://d3plus.org/docs/#Circle)). The shape type can be overwritten using the [.shape( )](http://d3plus.org/docs/#Viz.shape) accessor method, as well as using the many shorthand Classes for specific types of charts, like [BarChart](http://d3plus.org/examples/d3plus-plot/bar-chart/) and [AreaPlot](http://d3plus.org/examples/d3plus-plot/area/).
