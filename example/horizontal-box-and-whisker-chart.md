# Horizontal Box and Whisker Chart

The [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class defaults to creating vertical boxes. To change the orientation to horizontal, declare the y-axis as the [discrete](http://d3plus.org/docs/#Plot.discrete) axis, and set the `orient` property of the `Box` nested in [.shapeConfig( )](http://d3plus.org/docs/#Plot.shapeConfig) to "horizontal".

```js
var myData = [
  {id: "alpha", value: 300},
  {id: "alpha", value:  20},
  {id: "alpha", value: 180},
  {id: "alpha", value:  40},
  {id: "alpha", value: 170},
  {id: "alpha", value: 125},
  {id: "alpha", value:  74},
  {id: "alpha", value:  80},
  {id: "beta",  value: 180},
  {id: "beta",  value:  30},
  {id: "beta",  value: 120},
  {id: "beta",  value:  50},
  {id: "beta",  value: 140},
  {id: "beta",  value: 115},
  {id: "beta",  value:  14},
  {id: "beta",  value:  30},
];

new d3plus.BoxWhisker()
  .config({
    data: myData,
    discrete: "y",
    groupBy: ["id", "value"],
    x: "value",
    y: "id",
    shapeConfig: {
      Box: {
        orient: "horizontal",
      }
    }
  })
  .render();
```