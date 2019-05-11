# Bar Chart Axis and Grid Styling

You can change the styles of the [BarChart](http://d3plus.org/docs/#BarChart) axes and gridlines by setting specific [Axis](http://d3plus.org/docs/#Axis) properties nested within `xConfig` and `yConfig`. Here, we are changing the `barConfig` (the "zeroline" of the axis), the `gridConfig` (the background gridlines), and the `shapeConfig` (the [Shape](http://d3plus.org/docs/#Shape) configuration user to rendering the tick marks and their labels).

```js
var myData = [
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
];

new d3plus.BarChart()
  .config({
    data: myData,
    discrete: "y",
    groupBy: "id",
    x: "y",
    y: "x",
    xConfig: {
      // main x-axis bar line
      barConfig: {
        "stroke": "blue",
        "stroke-width": 2
      },
      // secondary grid lines
      gridConfig: {
        "stroke": "orange",
        "stroke-width": 1,
        "opacity": 0.5
      },
      // value labels
      shapeConfig: {
        labelConfig: {
          fontMin: 12,
          fontMax: 14
        }
      },
      // hide ticks
      tickSize: 0
    },
    yConfig: {
      // main y-axis bar line
      barConfig: {
        "stroke": "green",
        "stroke-width": 2
      },
      // hide secondary y-axis grid lines
      gridConfig: {
        opacity: 0
      },
    }
  })
  .render();
```
