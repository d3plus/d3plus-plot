# Using a Different Box and Whisker Mode

The "mode" of a Box and Whisker plot changes the placement of the extent of the whiskers. The [`BoxWhisker`](http://d3plus.org/docs/#BoxWhisker) class defaults to using the "[tukey](https://en.wikipedia.org/wiki/Box_plot#Variations)" method, but this can be changed by setting the `whiskerMode` property of the [`Box`](http://d3plus.org/docs/#Box) shape class using [shapeConfig](http://d3plus.org/docs/#Viz.shapeConfig). Accepted values are `"tukey"`, `"extent"`, or an Array of 2 numbers used as the bottom and top percentile.

 ```js
var myData = [
  {id: "alpha", value: 840},
  {id: "alpha", value: 940},
  {id: "alpha", value: 780},
  {id: "alpha", value: 650},
  {id: "alpha", value: 720},
  {id: "alpha", value: 430},
  {id: "alpha", value: 1850},
  {id: "alpha", value: 300},
  {id: "alpha", value: 360},
  {id: "alpha", value: 1690},
  {id: "alpha", value: 690},
  {id: "alpha", value: -950},
  {id: "alpha", value: -600},
  {id: "alpha", value: -850},
  {id: "beta",  value: 980},
  {id: "beta",  value: 300},
  {id: "beta",  value: 120},
  {id: "beta",  value: 500},
  {id: "beta",  value: 140},
  {id: "beta",  value: 115},
  {id: "beta",  value: 14},
  {id: "beta",  value: -30},
  {id: "beta",  value: -1050},
  {id: "beta",  value: -100},
  {id: "beta",  value: -800},
  {id: "beta",  value: -1100},
];

 new d3plus.BoxWhisker()
  .config({
    data: myData,
    groupBy: ["id", "value"],
    shapeConfig: {
      whiskerMode: "extent"
    },
    x: "id",
    y: "value"
  })
  .render();
```