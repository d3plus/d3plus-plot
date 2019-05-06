# Bar Chart Tooltip Configuration

To set tooltip in a [BarChart](http://d3plus.org/docs/#BarChart), set the `tbody` property of [tooltipConfig](http://d3plus.org/docs/#Viz.tooltipConfig) to an array of 2 values. First item in this array is the label and second item is the label value.

By default, [groupBy](http://d3plus.org/docs/#Viz.groupBy) value is used as tooltip title. If the Barchart [label](http://d3plus.org/docs/#Shape.label) is specified, then the label is used as the tooltip title. To explicitly set a custom tooltip title, set the `title` property in [tooltipConfig](http://d3plus.org/docs/#Viz.tooltipConfig).

```js
var data = [
  {"Travel Time": "< 5 Minutes", "ID Travel Time": "0", "Population Percentage": 2, year: 2018},
  {"Travel Time": "15 - 24 Minutes", "ID Travel Time": "2", "Population Percentage": 30, year: 2018},
  {"Travel Time": "35 - 44 Minutes", "ID Travel Time": "4", "Population Percentage": 7, year: 2018},
  {"Travel Time": "45 - 89 Minutes", "ID Travel Time": "5", "Population Percentage": 11, year: 2018},
  {"Travel Time": "5 - 14 Minutes", "ID Travel Time": "1", "Population Percentage": 20, year: 2018},
  {"Travel Time": "90+ Minutes", "ID Travel Time": "6", "Population Percentage": 5, year: 2018},
  {"Travel Time": "25 - 34 Minutes", "ID Travel Time": "3", "Population Percentage": 25, year: 2018}
];

new d3plus.BarChart()
  .config({
    data,
    groupBy: "Travel Time",
    x: "Travel Time",
    y: "Population Percentage",
    xSort: (a, b) => a["ID Travel Time"] - b["ID Travel Time"],
    tooltipConfig: {
      title: d => `Commute Time: ${d["Travel Time"]}`,
      tbody: [["Percentage", d => `${d["Population Percentage"]}%`], ["Year", d => d.year]]
    },
    legend: false
  })
  .render();
```
