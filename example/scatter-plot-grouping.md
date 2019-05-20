# Scatter Plot Grouping

 With the help of a [Simple X/Y Plot](http://d3plus.org/docs/#Plot), you can group scatter plot by passing the `groupBy` property an array instead of a single key. Based on the keys (and order) you pass it in the array, [ X/Y Plot](http://d3plus.org/docs/#Plot) will group scattered plot.

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
    groupBy: ["group", "name"],
    x: "value",
    y: "weight",
    size: "value",
    sizeMin: 20,
    sizeMax: 100
  })
  .render();
```