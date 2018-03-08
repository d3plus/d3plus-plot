# Bump Chart

When constructing data to be used with the [BumpChart](http://d3plus.org/docs/#BumpChart) class, the data provided for the y-axis must be an integer rank. Given this data array:

```js
var data = [
  {id: "apple", x: 1, y:  1},
  {id: "apple", x: 2, y: 2},
  {id: "apple", x: 3, y: 1},
  {id: "banana",  x: 1, y: 2},
  {id: "banana",  x: 2, y:  4},
  {id: "banana",  x: 3, y: 3},
  {id: "cherry", x: 1, y:  4},
  {id: "cherry", x: 2, y: 3},
  {id: "cherry", x: 3, y: 2},
  {id: "orange",  x: 1, y: 3},
  {id: "orange",  x: 2, y:  1},
  {id: "orange",  x: 3, y: 4}
];
```

We can create a simple Bump Chart:

```js
new d3plus.BumpChart()
  .data(data)
  .groupBy("id")
  .render();
```
