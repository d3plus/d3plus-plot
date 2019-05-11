# Bar Chart Tick Formatting

The formatting of a [BarChart](http://d3plus.org/docs/#BarChart)'s tick labels can be changed by passing a formatting function to the `tickFormat` property of [xConfig](http://d3plus.org/docs/#Plot.xConfig) and [yConfig](http://d3plus.org/docs/#Plot.yConfig).

```js
var myData = [
  {"Travel Time": "<5 Minutes",    "Population Percentage":  2},
  {"Travel Time": "15-24 Minutes", "Population Percentage": 30},
  {"Travel Time": "35-44 Minutes", "Population Percentage":  7},
  {"Travel Time": "45-89 Minutes", "Population Percentage": 11},
  {"Travel Time": "5-14 Minutes",  "Population Percentage": 20},
  {"Travel Time": "90+ Minutes",   "Population Percentage":  5},
  {"Travel Time": "25-34 Minutes", "Population Percentage": 25}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "Travel Time",
    x: "Travel Time",
    xConfig: {
      tickFormat: function(d) {
        return d.replace("Minutes", "").trim();
      },
      title: "Commute Time in Minutes"
    },
    y: "Population Percentage",
    yConfig: {
      tickFormat: function(d) {
        return `${d}%`;
      },
      title: "Percentage of Population"
    }
    shapeConfig: {label: false},
    legend: false
  })
  .render();
```
