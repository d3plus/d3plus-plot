# Line Plot Grouping

You can group the lines in a [LinePlot](http://d3plus.org/docs/#LinePlot) by passing the [`groupBy`](https://d3plus.org/docs/#Viz.groupBy) property a nested Array of keys instead of a single key. This enables automatic line groupings/nestings and click behavior to dive into groups. The default level shown is defined using the [`depth`](https://d3plus.org/docs/#Viz.depth) method.

 ```js
var myData = [
  {"year": 1991, "name":"alpha", "value": 15, "parent": "parent 1"},
  {"year": 1992, "name":"alpha", "value": 20, "parent": "parent 1"},
  {"year": 1993, "name":"alpha", "value": 30, "parent": "parent 1"},
  {"year": 1994, "name":"alpha", "value": 60, "parent": "parent 1"},
  {"year": 1991, "name":"beta",  "value": 10, "parent": "parent 1"},
  {"year": 1992, "name":"beta",  "value": 10, "parent": "parent 1"},
  {"year": 1993, "name":"beta",  "value": 40, "parent": "parent 1"},
  {"year": 1994, "name":"beta",  "value": 60, "parent": "parent 1"},
  {"year": 1991, "name":"gamma", "value": 5,  "parent": "parent 2"},
  {"year": 1992, "name":"gamma", "value": 10, "parent": "parent 2"},
  {"year": 1993, "name":"gamma", "value": 20, "parent": "parent 2"},
  {"year": 1994, "name":"gamma", "value": 25, "parent": "parent 2"},
  {"year": 1991, "name":"delta", "value": 50, "parent": "parent 2"},
  {"year": 1992, "name":"delta", "value": 43, "parent": "parent 2"},
  {"year": 1993, "name":"delta", "value": 17, "parent": "parent 2"},
  {"year": 1994, "name":"delta", "value": 32, "parent": "parent 2"}
]

 new d3plus.LinePlot()
  .config({
    data: myData,
    depth: 0,
    groupBy: ["parent", "name"],
    x: "year",
    y: "value"
  })
  .render();
```