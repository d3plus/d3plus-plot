# Stacked Area Chart

When constructing data to be used with an Stacked Area Chart, there must be a unique data point for each point on the discrete axis (defaults to the X axis). Given this data array:

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

We can create a simple Stacked Area Chart:

```js
new d3plus.StackedArea()
  .data(data)
  .groupBy("id")
  .render();
```
