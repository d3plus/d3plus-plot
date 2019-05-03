# Stacked Area Chart 100% Share

[StackedArea](http://d3plus.org/docs/#StackedArea) can be set to 100% share chart by setting [stackOffset](http://d3plus.org/docs/#Plot.stackOffset) property to "expand".

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13},
  {id: "gamma",  x: 4, y: 10},
  {id: "gamma",  x: 5, y:  18},
  {id: "gamma",  x: 6, y: 5}
];

new d3plus.StackedArea()
  .config({
    data,
    groupBy: "id",
    stackOffset: "expand"
  })
  .render();
```
