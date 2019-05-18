# Hiding Tooltip

To hide tooltip in a [D3plus](http://d3plus.org) chart, set the [tooltip](http://d3plus.org/docs/#Viz.tooltip) property to `false`:

```js
var myData = [
  {"Travel Time": "< 5 Minutes",     "Population Percentage": 2},
  {"Travel Time": "15 - 24 Minutes", "Population Percentage": 30},
  {"Travel Time": "35 - 44 Minutes", "Population Percentage": 7},
  {"Travel Time": "45 - 89 Minutes", "Population Percentage": 11},
  {"Travel Time": "5 - 14 Minutes",  "Population Percentage": 20},
  {"Travel Time": "90+ Minutes",     "Population Percentage": 5},
  {"Travel Time": "25 - 34 Minutes", "Population Percentage": 25}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "Travel Time",
    x: "Travel Time",
    y: "Population Percentage",
    tooltip: false,
    legend: false
  })
  .render();
```
