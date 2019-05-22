# Scatter Plot/Bubble Plot Changing shape

`Scatter Plot` defaults to being `Circle`. To change its shape to `Rectangle`, set the `shape` property to `"Rect"`:

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
    x: "value",
    y: "weight",
    size: "value",
    shape: "Rect",
    legend: false
  })
  .render();
```
