# Horizontal Stacked Area Chart

Sometimes the need arises to flip the x/y axes on a chart. Based on the [Simple Stacked Area Chart Example](https://d3plus.org/examples/d3plus-plot/stacked-area/), swapping the x/y keys in the data array:

```js
var data = [
  {id: "alpha", x:  7, y: 4},
  {id: "alpha", x: 25, y: 5},
  {id: "alpha", x: 13, y: 6},
  {id: "beta",  x: 17, y: 4},
  {id: "beta",  x:  8, y: 5},
  {id: "beta",  x: 13, y: 6}
];
```

We can flip the axes be overriding the [.discrete( )](https://github.com/d3plus/d3plus-viz#Viz.discrete) method, which defaults to "x":

```js
new d3plus.StackedArea()
  .data(data)
  .groupBy("id")
  .discrete("y")
  .render();
```
