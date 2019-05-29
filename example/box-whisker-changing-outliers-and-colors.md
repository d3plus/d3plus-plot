# Box and Whisker Changing Outliers Shape and Color

In a [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class, when you have custom outlier shape and you want to specify color for each shape, you need to set the `fill` property to the respective shape.

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
  {id: "beta",  value: -1100}
];

 new d3plus.BoxWhisker()
  .config({
    data: myData,
    groupBy: ["id", "value"],
    shapeConfig: {
      outlier: function(d) {
        return d.id === "alpha" ? "Circle" : "Rect";
      },
      outlierConfig: {
        Rect: {
          fill: "green"
        },
        Circle: {
          fill: "red"
        }
      }
    },
    x: "id",
    y: "value"
  })
  .render();
```