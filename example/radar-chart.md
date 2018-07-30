# Radar Chart

[Radar](http://d3plus.org/docs/#Radar) chart are a way of comparing multiple quantitative variables. This makes them useful for seeing which variables have similar values or if there are any outliers amongst each variable. 

When constructing data to be used with a Radar, it's necessary to have a N-variables in Y axis for N shapes defined in X axis. Every shape must have the same measures to compare in Y axis.



```js
var data = [
  { id: "b", metric: "Central ", value: 170.992 },
  { id: "b", metric: "Kirkdale", value: 40 },
  { id: "b", metric: "Kensington ", value: 240 },
  { id: "b", metric: "Everton ", value: 90 },
  { id: "b", metric: "Picton ", value: 160 },
  { id: "b", metric: "Riverside ", value: 30 },
  { id: "c", metric: "Central ", value: 320 },
  { id: "c", metric: "Kirkdale", value: 97.5 },
  { id: "c", metric: "Kensington ", value: 40 },
  { id: "c", metric: "Everton ", value: 110 },
  { id: "c", metric: "Picton ", value: 40 },
  { id: "c", metric: "Riverside ", value: 110 }
];
```

We can create a simple Radar chart:

```js
new d3plus.Radar()
  .data(data)
  .y("metric")
  .x("id")
  .render();
```
