# Box and Whisker Chart with Outliers

If a data value is very far away from the quartiles (either much less than Q1 or much greater than Q3), it is sometimes designated an outlier. Instead of being shown using the whiskers of the [BoxWhisker](http://d3plus.org/docs/#BoxWhisker), outliers are shown as separately plotted points.

```js
var data = [
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
  {id: "beta", value: 980},
  {id: "beta", value: 300},
  {id: "beta", value: 120},
  {id: "beta", value: 500},
  {id: "beta", value: 140},
  {id: "beta", value: 115},
  {id: "beta", value: 14},
  {id: "beta", value: -30},
  {id: "beta", value: -1050},
  {id: "beta", value: -100},
  {id: "beta", value: -800},
  {id: "beta", value: -1100},
];
```

We can create a simple Box and Whisker Chart and see the outliers, if any, for the given data:

```js
new d3plus.BoxWhisker()
  .config({
    data,
    groupBy: ["id", "value"],
    x: "id",
    y: "value",
    legend: false
  })
  .render();
```