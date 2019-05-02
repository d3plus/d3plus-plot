# Box and Whisker Horizontal Chart

The [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class defaults to being vertical, so there are a few methods that need to be make the box-whisker drawn horizontal.

```js
var data = [
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
```

In addition to switching the x and y accessor to reference the opposite key in or data, we also need to define the y-axis as the [discrete](http://d3plus.org/docs/#Plot.discrete) axis, and set the `orient` property of the `Box` nested in [.shapeConfig( )](http://d3plus.org/docs/#Plot.shapeConfig) to "horizontal":

```js
new d3plus.BoxWhisker()
  .config({
    data,
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