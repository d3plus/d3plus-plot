# Setting a Max Size for Axes

When creating any x/y [plot](http://d3plus.org/docs/#Plot), like the [BarChart](http://d3plus.org/docs/#BarChart) in this example, d3plus tries to allow as much space is needed for all of the x and y axis labels. When dealing with categorical data, names can sometimes be rather long. To address this, the d3plus [Axis](http://d3plus.org/docs/#Axis) class has a [maxSize](http://d3plus.org/docs/#Axis#maxSize) method that limits how much space should be allowed for the axis tick labels (width for y-axis, height for x-axis).

```js
var fruits = [
  {group: "Apples", value: 10},
  {group: "Bananas", value: 8},
  {group: "Some fruit with a really long name", value: 12},
  {group: "Oranges", value: 6}
];

new d3plus.BarChart()
  .config({
    data: fruits,
    discrete: "y",
    groupBy: "group",
    x: "value",
    y: "group",
    yConfig: {
      maxSize: 100
    }
  })
  .render();
```
