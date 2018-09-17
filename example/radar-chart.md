# Radar Chart

[Radar](http://d3plus.org/docs/#Radar) charts are a way of comparing multiple quantitative variables. This makes them useful for seeing which variables have similar values or if there are any outliers amongst each variable. 

When constructing data to be used with a Radar chart, you define the metrics used as the y-axis, and the unique shape identifier in the x-axis. Every shape must have the same metrics to compare in the y-axis.



```js
var data = [
  { id: "alpha", metric: "Central", value: 170.992 },
  { id: "alpha", metric: "Kirkdale", value: 40 },
  { id: "alpha", metric: "Kensington", value: 240 },
  { id: "alpha", metric: "Everton", value: 90 },
  { id: "alpha", metric: "Picton", value: 160 },
  { id: "alpha", metric: "Riverside", value: 30 },
  { id: "beta", metric: "Central", value: 320 },
  { id: "beta", metric: "Kirkdale", value: 97.5 },
  { id: "beta", metric: "Kensington", value: 40 },
  { id: "beta", metric: "Everton", value: 110 },
  { id: "beta", metric: "Picton", value: 40 },
  { id: "beta", metric: "Riverside", value: 110 }
];

new d3plus.Radar()
  .data(data)
  .y("metric")
  .x("id")
  .render();
```
