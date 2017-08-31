# Horizontal Bar Chart

The [BarChart](http://d3plus.org/docs/#BarChart) class defaults to being vertical, so there are a few methods that need to be make the bars drawn horizontal.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];
```

In addition to switching the x and y accessor to reference the opposite key in or data, we also need to define the y-axis as the [discrete](http://d3plus.org/docs/#Plot.discrete) axis, meaning that the values on that axis should never be aggregated and treated as individual buckets.

```js
new d3plus.BarChart()
  .data(data)
  .discrete("y")
  .x("y")
  .y("x")
  .render();
```
