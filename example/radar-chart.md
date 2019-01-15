# Radar Chart

[Radar](http://d3plus.org/docs/#Radar) charts are a way of comparing multiple quantitative variables. This makes them useful for seeing which variables have similar values or if there are any outliers amongst each variable. 

When constructing data to be used with a Radar chart, you define the metrics used as the y-axis, and the unique shape identifier in the x-axis. Every shape must have the same metrics to compare in the y-axis.



```js
var data = [
  { id: "alpha", axis: "Central", value: 170.992 },
  { id: "alpha", axis: "Kirkdale", value: 40 },
  { id: "alpha", axis: "Kensington", value: 240 },
  { id: "alpha", axis: "Everton", value: 90 },
  { id: "alpha", axis: "Picton", value: 160 },
  { id: "alpha", axis: "Riverside", value: 30 },
  { id: "beta", axis: "Central", value: 320 },
  { id: "beta", axis: "Kirkdale", value: 97.5 },
  { id: "beta", axis: "Kensington", value: 40 },
  { id: "beta", axis: "Everton", value: 110 },
  { id: "beta", axis: "Picton", value: 40 },
  { id: "beta", axis: "Riverside", value: 110 }
];

new d3plus.Radar()
  .data(data)
  .groupBy("id")
  .metric("axis")
  .render();
```
