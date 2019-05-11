# Bar Chart Timeline

In a [BarChart](http://d3plus.org/docs/#BarChart), to show timeline, set the `time` property.

```js
var myData = [
  {"Travel Time": "< 5 Minutes",     "Population Percentage": 5,  year: 2017},
  {"Travel Time": "15 - 24 Minutes", "Population Percentage": 25, year: 2017},
  {"Travel Time": "35 - 44 Minutes", "Population Percentage": 10, year: 2017},
  {"Travel Time": "45 - 89 Minutes", "Population Percentage": 11, year: 2017},
  {"Travel Time": "5 - 14 Minutes",  "Population Percentage": 19, year: 2017},
  {"Travel Time": "90+ Minutes",     "Population Percentage": 15, year: 2017},
  {"Travel Time": "25 - 34 Minutes", "Population Percentage": 15, year: 2017},
  {"Travel Time": "< 5 Minutes",     "Population Percentage": 2,  year: 2018},
  {"Travel Time": "15 - 24 Minutes", "Population Percentage": 30, year: 2018},
  {"Travel Time": "35 - 44 Minutes", "Population Percentage": 7,  year: 2018},
  {"Travel Time": "45 - 89 Minutes", "Population Percentage": 11, year: 2018},
  {"Travel Time": "5 - 14 Minutes",  "Population Percentage": 20, year: 2018},
  {"Travel Time": "90+ Minutes",     "Population Percentage": 5,  year: 2018},
  {"Travel Time": "25 - 34 Minutes", "Population Percentage": 25, year: 2018}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "Travel Time",
    x: "Travel Time",
    y: "Population Percentage",
    time: "year",
    legend: false
  })
  .render();
```