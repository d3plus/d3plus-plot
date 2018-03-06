# Secondary Axes

When x2 values exist in your data or a `.x2` accessor is supplied, these values will be plotted on the secondary x-axis and when y2 values exist in your data or a `.y2` accessor is supplied, these values will be plotted on the secondary y-axis.

```js
var data = [
  {id: "alpha", alphaX: 4, alphaY:  7},
  {id: "alpha", alphaX: 5, alphaY: 25},
  {id: "alpha", alphaX: 6, alphaY: 13},
  {id: "beta",  betaX: 28, betaY: 700},
  {id: "beta",  betaX: 33, betaY:  850},
  {id: "beta",  betaX: 56, betaY: 900}
];
```

We can create a simple Line Plot with a secondary x-axis and secondary y-axis:

```js
new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .x("alphaX")
  .x2("betaX")
  .y("alphaY")
  .y2("betaY")
  .render();
```
