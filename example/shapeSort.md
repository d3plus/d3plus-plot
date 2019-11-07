# Sorting Shapes on an X/Y Plot

By using the [Plot](https://github.com/d3plus/d3plus-plot#Plot) class directly, it is possible to render different shapes on the same graph. Let's say we have the following data, where we want the "alpha" data points to be [Circles](https://github.com/d3plus/d3plus-shape#Circle) and the "delta" data points to be [Lines](https://github.com/d3plus/d3plus-shape#Line):

```js
var data = [
  {id: "alpha", time: 4, value: 240},
  {id: "alpha", time: 5, value: 120},
  {id: "alpha", time: 6, value: 180},
  {id: "delta", time: 4, value: 240},
  {id: "delta", time: 5, value: 120},
  {id: "delta", time: 6, value: 180}
];
```

First, when creating a new [Plot](https://github.com/d3plus/d3plus-plot#Plot) visualization, we need to describe how the chart should be using our data keys:

```js
var chart = new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .x("time")
  .y("value")
```

Next, we need to use the [shape](https://github.com/d3plus/d3plus-plot#Plot.shape) method to define which data points should be Lines and which should be Circles:

```js
chart
  .shape(function(d) {
    if (d.id === "delta") {
      return "Line";
    }
    else {
      return "Circle";
    }
  });
```

Finally, we can use the [shapeSort](https://github.com/d3plus/d3plus-plot#Plot.shapeSort) to modify the default ordering of the shapes. Shapes are drawn in groups, so when moving a certain shape on top of another, all shapes of that type will move together. By default, [Circles](https://github.com/d3plus/d3plus-shape#Circle) are drawn on top of [Lines](https://github.com/d3plus/d3plus-shape#Line), but in our case here, let's reverse that:

```js
var order = ["Circle", "Line"];

chart
  .shapeConfig({
    Line: {
      strokeLinecap: "round",
      strokeWidth: 5
    }
  })
  .shapeSort(function(a, b) {
    return order.indexOf(a) - order.indexOf(b);
  })
  .sizeMin(20)
  .render();
```
