# Grouped Line Plot

By passing the `groupBy` property an array instead of a single key, the [LinePlot](http://d3plus.org/docs/#LinePlot) class will group lines based on the keys (and order) you pass it in the array.

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
    groupBy: ["name", "parent"],
    x: "year",
    y: "value"
  })
  .render();
```
