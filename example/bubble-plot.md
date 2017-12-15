# Scatter/Bubble Plot

Building upon the [Simple X/Y Plot](http://d3plus.org/examples/d3plus-plot/getting-started/) example, it is very easy to size the Circles with data. Given an additional "value" parameter in the data:

```js
var data = [
  {id: "alpha", x: 4, y:  7, value: 240},
  {id: "beta",  x: 5, y:  2, value: 120},
  {id: "gamma", x: 6, y: 13, value: 180}
];
```

We provide this key to the visualization using the [size method](http://d3plus.org/docs/#Plot.size). We can also use the [sizeMin](http://d3plus.org/docs/#Plot.sizeMin) and [sizeMax](http://d3plus.org/docs/#Plot.sizeMax) methods to define the range of the internal scale.

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .size("value")
  .sizeMin(20)
  .sizeMax(100)
  .render();
```
