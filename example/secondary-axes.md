# Secondary Axes

The [.secondaryX( )](http://d3plus.org/docs/#Plot.secondaryX) and [.secondaryY( )](http://d3plus.org/docs/#Plot.secondaryY) methods allow you to toggle whether a secondary x-axis and secondary-y axis are rendered.

When x2 values exist in your data, they will be plotted on the secondary x-axis and when y2 values exist in your data, they will be plotted on the secondary y-axis.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x2: 28, y2: 700},
  {id: "beta",  x2: 33, y2:  850},
  {id: "beta",  x2: 56, y2: 900}
];
```

We can create a simple Line Plot with a secondary x-axis and secondary y-axis:

```js
new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .secondaryX(true)
  .secondaryY(true)
  .xConfig({
    title: "alpha"
  })
  .x2Config({
  title: "beta"
  })
  .yConfig({
  title: "alpha"
  })
  .y2Config({
  title: "beta"
  })
  .render();
```
