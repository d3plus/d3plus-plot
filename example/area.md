# Area Chart

When constructing data to be used with an [AreaPlot](http://d3plus.org/docs/#AreaPlot), there must be a unique data point for each point on the [discrete](http://d3plus.org/docs/#Plot.discrete) axis (defaults to the X axis). Given this data array:

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

We can create a simple Area Plot:

```js
new d3plus.AreaPlot()
  .data(data)
  .groupBy("id")
  .render();
```
