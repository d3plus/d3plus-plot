# Line Plot

When constructing data to be used with a [LinePlot](http://d3plus.org/docs/#LinePlot), there must be a unique data point for each point on the [discrete](http://d3plus.org/docs/#Plot.discrete) axis (defaults to the X axis). Given this data array:

```js
var myData = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];
```

We can create a simple Line Plot:

```js
new d3plus.LinePlot()
  .config({
    data: myData,
    groupBy: "id"
  })
  .render();
```
