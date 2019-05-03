# Bar Chart Ticks

[BarChart](http://d3plus.org/docs/#BarChart) axes ticks can be changed by passing value or function to the `tickFormat` property of [xConfig](http://d3plus.org/docs/#Plot.xConfig) or [yConfig](http://d3plus.org/docs/#Plot.yConfig).


```js
var data = [
  {"Travel Time": "<5 Minutes", "Population Percentage": 2, year: 2018},
  {"Travel Time": "15-24 Minutes",  "Population Percentage": 30, year: 2018},
  {"Travel Time": "35-44 Minutes", "Population Percentage": 7, year: 2018},
  {"Travel Time": "45-89 Minutes", "Population Percentage": 11, year: 2018},
  {"Travel Time": "5-14 Minutes",  "Population Percentage": 20, year: 2018},
  {"Travel Time": "90+ Minutes", "Population Percentage": 5, year: 2018},
  {"Travel Time": "25-34 Minutes", "Population Percentage": 25, year: 2018}
];

new d3plus.BarChart()
  .config({
    data,
    groupBy: "Travel Time",
    x: "Travel Time",
    xConfig: {
      tickFormat: d => d.replace("Minutes", "").trim(),
      title: "Commute Time in Minutes"
    },
    y: "Population Percentage",
    yConfig: {
      tickFormat: d => `${d}%`,
      title: "Percentage of Population"
    },
    xSort: (a, b) => a["ID Travel Time"] - b["ID Travel Time"],
    shapeConfig: {label: false},
    legend: false
  })
  .render();
```
