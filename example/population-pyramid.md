# Pyramid Chart

Population Pyramids are ideal for detecting changes or differences in population patterns. 

When constructing data to be used with the [Pyramid](http://d3plus.org/docs/#Pyramid) class, the data provided for the `groupBy` must be an pair-to-paif of both sexes, `x-Axis` the values and `y-Axis` the age ranges. 

```js
var data = [
  { y: "0 - 18", x: 18, sex: "male" },
  { y: "0 - 18", x: 19, sex: "female" },
  { y: "19 - 40", x: 15, sex: "male" },
  { y: "19 - 40", x: 17, sex: "female" },
  { y: "41 - 60", x: 10, sex: "male" },
  { y: "41 - 60", x: 12, sex: "female" }
];

new d3plus.Pyramid()
  .data(data)
  .groupBy("sex")
  .render();
```
