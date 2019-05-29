# Box and Whisker Changing Endpoints Shape

In a [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class, endpoint shape is set to `"Rect"` by default. You can change them to `Circle` by passing [`Whisker`](http://d3plus.org/docs/#Whisker) class's [`endpoint`](http://d3plus.org/docs/#Whisker.endpoint) property to `"Circle"` inside `whiskerConfig`(http://d3plus.org/docs/#Box.whiskerConfig). Accepted values are `"Rect"` and  `"Circle"`.

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
  {id: "beta",  value: 180},
  {id: "beta",  value: 30},
  {id: "beta",  value: 120},
  {id: "beta",  value: 50},
  {id: "beta",  value: 140},
  {id: "beta",  value: 115},
  {id: "beta",  value: 14},
  {id: "beta",  value: 30},
];

 new d3plus.BoxWhisker()
  .config({
    data: myData,
    groupBy: ["id", "value"],
    shapeConfig: {
      whiskerConfig: {
        endpoint: function(d) {
          return d.id === "alpha" ? "Rect" : "Circle"
        }
      }
    },
    x: "id",
    y: "value"
  })
  .render();
```