# Changing Shapes in a Scatter Plot/Bubble Plot

The [Plot](https://d3plus.org/docs/#Plot) Class defaults to showing all data as [`Circle`](https://d3plus.org/docs/#Circle) elements. To change all of the shapes to use the [`Rectangle`](https://d3plus.org/docs/#Rect) Class, set the [`shape`](http://d3plus.org/docs/#Viz.shape) property to `"Rect"`. Additionally, an accessor function can instead be provided to the [`shape`](http://d3plus.org/docs/#Viz.shape) property in order to use different shapes for different elements.

```js
var myData = [
  {"value": 100, "weight": .45,  "name": "alpha"},
  {"value": 70,  "weight": .60,  "name": "beta"},
  {"value": 40,  "weight": -.2,  "name": "gamma"},
  {"value": 15,  "weight": .1,   "name": "delta"},
  {"value": 5,   "weight": -.43, "name": "epsilon"},
  {"value": 1,   "weight": 0,    "name": "zeta"}
]

new d3plus.Plot()
  .config({
    data: myData,
    groupBy: "name",
    shape: function(d) {
      if (d.name === "alpha" || d.name === "delta" || d.name === "epsilon") return "Rect";
      return "Circle";
    },
    size: "value",
    x: "value",
    y: "weight"
  })
  .render();
```
