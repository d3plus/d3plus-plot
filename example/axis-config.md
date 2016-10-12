# Getting Started

The style and configuration of each axis created by d3plus-plot can be overridden using the [.xConfig( )](https://github.com/d3plus/d3plus-plot#Plot.xConfig) and [.yConfig( )](https://github.com/d3plus/d3plus-plot#Plot.yConfig) methods, which act as a pass-through to each axis' [.config( )](https://github.com/d3plus/d3plus-axis#Axis.config) method. Using the same data as in the [getting started](https://d3plus.org/examples/d3plus-plot/getting-started/) example:

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "beta",  x: 5, y:  2},
  {id: "gamma", x: 6, y: 13}
];
```

We can completely remove the y-axis and modify the x-axis like so:

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .yConfig({
    barConfig: {"stroke-width": 0},
    title: false,
    ticks: []
  })
  .xConfig({
    labels: [4, 5, 6],
    ticks: [4, 4.5, 5, 5.5, 6],
    title: "Interval"
  })
  .render();
```
