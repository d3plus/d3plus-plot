# Radar Chart

[Radar](http://d3plus.org/docs/#Radar) charts are a way of comparing multiple quantitative variables. This makes them useful for seeing which variables have similar values or if there are any outliers amongst each variable.

When constructing data to be used with a Radar chart, you define the metrics used as the y-axis, and the unique shape identifier in the x-axis. Every shape must have the same metrics to compare in the y-axis.

```js
var myData = [
  {id: "alpha", axis: "Central",    number: 170.992},
  {id: "alpha", axis: "Kirkdale",   number: 40},
  {id: "alpha", axis: "Kensington", number: 240},
  {id: "alpha", axis: "Everton",    number: 90},
  {id: "alpha", axis: "Picton",     number: 160},
  {id: "alpha", axis: "Riverside",  number: 30},
  {id: "beta",  axis: "Central",    number: 320},
  {id: "beta",  axis: "Kirkdale",   number: 97.5},
  {id: "beta",  axis: "Kensington", number: 40},
  {id: "beta",  axis: "Everton",    number: 110},
  {id: "beta",  axis: "Picton",     number: 40},
  {id: "beta",  axis: "Riverside",  number: 110}
];

new d3plus.Radar()
  .config({
    data: myData,
    groupBy: "id",
    metric: "axis",
    value: "number"
  })
  .render();
```
