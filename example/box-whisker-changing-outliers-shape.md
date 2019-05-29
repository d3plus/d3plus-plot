# Box and Whisker Changing Outliers Shape

In a [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class, outliers shape is set to `"Circle"` by default. You can change them to `Rectangle` by passing [`Box`](http://d3plus.org/docs/#Box) class's [`outlier`](http://d3plus.org/docs/#Box.outlier) property to `"Rect"` inside `whiskerConfig`(http://d3plus.org/docs/#Box.whiskerConfig). Accepted values are `"Rect"` and  `"Circle"`.

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
      }
    },
    x: "id",
    y: "value"
  })
  .render();
```