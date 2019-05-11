# Stacked Areas as Share Percentages

A [StackedArea](http://d3plus.org/docs/#StackedArea) chart can be changed to show the share percentage of each `groupBy` category by setting the [stackOffset](http://d3plus.org/docs/#Plot.stackOffset) property to `expand`.

```js
var myData = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13},
  {id: "gamma", x: 4, y: 10},
  {id: "gamma", x: 5, y: 18},
  {id: "gamma", x: 6, y:  5}
];

new d3plus.StackedArea()
  .config({
    data: myData,
    groupBy: "id",
    stackOffset: "expand"
  })
  .render();
```
