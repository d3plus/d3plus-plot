# Changing the Stroke Width of a Line Plot

When making a [LinePlot](http://d3plus.org/docs/#LinePlot), you can modify the stroke-width property of the lines to be drawn by passing a value to the nested [.shapeConfig( )](http://d3plus.org/docs/#Plot.shapeConfig) of "Line":

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];

new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .shapeConfig({
    Line: {
      strokeWidth: 5
    }
  })
  .render();
```
