# Styling the Background of a Chart

The rectangular area behind an x/y plot can be styled using the [backgroundConfig](http://d3plus.org/docs/#Plot.backgroundConfig) method. Simply pass any valid ([Rect](http://d3plus.org/docs/#Rect) configuration.

```js
var myData = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];

new d3plus.LinePlot()
  .config({
    backgroundConfig: {
      fill: "#fafafa",
      stroke: "black",
      strokeWidth: 2
    },
    data: myData,
    groupBy: "id"
  })
  .render();
```
