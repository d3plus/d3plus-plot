# Bar Chart Sorting

In a [BarChart](http://d3plus.org/docs/#BarChart), you can sort the bars by passing a [JavaScript sorting function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to the [xSort](http://d3plus.org/docs/#Plot.xSort) or [ySort](http://d3plus.org/docs/#Plot.ySort) method.

```js
var myData = [
  {"Travel Time": "< 5 Minutes",     "ID Travel Time": "0", "Population Percentage":  2},
  {"Travel Time": "15 - 24 Minutes", "ID Travel Time": "2", "Population Percentage": 30},
  {"Travel Time": "35 - 44 Minutes", "ID Travel Time": "4", "Population Percentage":  7},
  {"Travel Time": "45 - 89 Minutes", "ID Travel Time": "5", "Population Percentage": 11},
  {"Travel Time": "5 - 14 Minutes",  "ID Travel Time": "1", "Population Percentage": 20},
  {"Travel Time": "90+ Minutes",     "ID Travel Time": "6", "Population Percentage":  5},
  {"Travel Time": "25 - 34 Minutes", "ID Travel Time": "3", "Population Percentage": 25}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "Travel Time",
    x: "Travel Time",
    y: "Population Percentage",
    xSort: function(a, b) {
      return a["ID Travel Time"] - b["ID Travel Time"];
    },
    legend: false
  })
  .render();
```
