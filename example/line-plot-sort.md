# Line Plot Sorting

Line Plots with a lot of lines can become unruly if there is a lot of overlap. In this case, it may be necessary to move certain lines to the foreground, on top of the other lines. A custom sort comparator can be passed to the `sort` property of [shapeConfig](http://d3plus.org/docs/#Shape.sort) in order to change the layering of the lines.

```js
var data = [
  {id: "alpha", x: 4, y:  9},
  {id: "alpha", x: 5, y: 17},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13},
  {id: "gamma",  x: 4, y: 14},
  {id: "gamma",  x: 5, y:  9},
  {id: "gamma",  x: 6, y: 11}
];

new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .shapeConfig({
    Line: {
      strokeLinecap: "round",
      strokeWidth: 10
    },
    sort: function(a, b) {
      if (a.id === "beta") return 1;
      else return -1;
    }
  })
  .render();
```
