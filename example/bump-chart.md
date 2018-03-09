# Bump Chart

Bump charts are used to visualize changes in rank over time. They are similar to line charts, but instead of graphing some measure on the y-axis they show rank.

When constructing data to be used with the [BumpChart](http://d3plus.org/docs/#BumpChart) class, the data provided for the y-axis must be an integer rank. Given this data array:

```js
var data = [
  {fruit: "apple", label: "Apple", year: 1, rank:  1},
  {fruit: "apple", label: "Apple", year: 2, rank: 2},
  {fruit: "apple", label: "Apple", year: 3, rank: 1},
  {fruit: "banana", label: "Banana",  year: 1, rank: 2},
  {fruit: "banana", label: "Banana",  year: 2, rank:  4},
  {fruit: "banana", label: "Banana",  year: 3, rank: 3},
  {fruit: "cherry", label: "Cherry", year: 1, rank:  4},
  {fruit: "cherry", label: "Cherry", year: 2, rank: 3},
  {fruit: "cherry", label: "Cherry", year: 3, rank: 2},
  {fruit: "orange", label: "Orange",  year: 1, rank: 3},
  {fruit: "orange", label: "Orange",  year: 2, rank:  1},
  {fruit: "orange", label: "Orange",  year: 3, rank: 4}
];
```

We can create a simple Bump Chart:

```js
new d3plus.BumpChart()
  .data(data)
  .groupBy("fruit")
  .label(d => d.label)
  .x("year")
  .y("rank")
  .render();
```
