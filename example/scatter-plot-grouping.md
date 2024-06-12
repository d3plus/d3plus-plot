# Scatter Plot Grouping

 You can group the bubbles in a Scatter Plot by passing the [`groupBy`](https://d3plus.org/docs/#Viz.groupBy) property a nested Array of keys instead of a single key. This enables automatic shape groupings/nestings and click behavior to dive into groups. The default level shown is defined using the [`depth`](https://d3plus.org/docs/#Viz.depth) method.

 ```js
var myData = [
  {"value": 100, "weight":  .45, "name": "alpha",   "group": "group 1"},
  {"value": 70,  "weight":  .60, "name": "beta",    "group": "group 2"},
  {"value": 40,  "weight":  -.2, "name": "gamma",   "group": "group 2"},
  {"value": 15,  "weight":   .1, "name": "delta",   "group": "group 2"},
  {"value": 5,   "weight": -.43, "name": "epsilon", "group": "group 1"},
  {"value": 1,   "weight":    0, "name": "zeta",    "group": "group 1"}
]

 new d3plus.Plot()
  .config({
    data: myData,
    depth: 0,
    groupBy: ["group", "name"],
    size: "value",
    sizeMax: 100,
    sizeMin: 20,
    x: "value",
    y: "weight"
  })
  .render();
```