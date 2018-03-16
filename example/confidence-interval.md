# Confidence Interval

A confidence interval is a range of values so defined that there is a specified probability that the value of a parameter lies within it.

The [.confidence( )](http://d3plus.org/docs/#Plot.confidence) method allows us to specify an array of accessors for the lower and upper bounds of a confidence interval (in the format `[lower, upper]`).

The [.confidenceConfig( )](http://d3plus.org/docs/#Plot.confidenceConfig) method works similarly to the [.shapeConfig( )](http://d3plus.org/docs/#Viz.shapeConfig) method, but the configuration is only applied to shapes rendered as part of the confidence interval.

Given this data array:

```js
var data = [
  {fruit: "apple", year: 1, amount:  50, moe: 2},
  {fruit: "apple", year: 2, amount: 56, moe: 1},
  {fruit: "apple", year: 3, amount: 58, moe: 1},
  {fruit: "banana", year: 1, amount: 88, moe: 3},
  {fruit: "banana", year: 2, amount:  90, moe: 4},
  {fruit: "banana", year: 3, amount: 76, moe: 3}
];
```

We can create a Line Plot with confidence intervals:

```js
new d3plus.LinePlot()
  .data(data)
  .groupBy("fruit")
  .x("year")
  .y("amount")
  .confidence([
    function(d) {
      return d.amount - d.moe
    },
    function(d) {
      return d.amount + d.moe
    },
  ])
  .confidenceConfig({
    fillOpacity: 0.3
  })
  .render();
```
