# Using a Different Box and Whisker Mode

The [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) mode defaults to being `tukey`. For Box and Whisker plots, this changes the extent of the whiskers. Accepted values are: "tukey", "extent" or a percentile number. 

The mode can be changed by passing `whiskerMode` property to "tukey", "extent" or a percentile number, inside Box property of [shapeConfig](http://d3plus.org/docs/#Viz.shapeConfig).

```js
var myData = [
  {id: "alpha", value: 300},
  {id: "alpha", value: 20},
  {id: "alpha", value: 180},
  {id: "alpha", value: 40},
  {id: "alpha", value: 170},
  {id: "alpha", value: 125},
  {id: "alpha", value: 74},
  {id: "alpha", value: 80},
  {id: "beta", value: 180},
  {id: "beta", value: 30},
  {id: "beta", value: 120},
  {id: "beta", value: 50},
  {id: "beta", value: 140},
  {id: "beta", value: 115},
  {id: "beta", value: 14},
  {id: "beta", value: 30},
];

new d3plus.BoxWhisker()
  .config({
    data: myData,
    groupBy: ["id", "value"],
    x: "id",
    y: "value",
    shapeConfig: {
      Box: {
        whiskerMode: "extent"
      }
    },
    legend: false
  })
  .render();
```