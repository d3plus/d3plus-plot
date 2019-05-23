# Disabling Tooltips

To hide the default tooltips in any D3plus chart, set the [tooltip](http://d3plus.org/docs/#Viz.tooltip) property to `false`.

 ```js
var myData = [
  {id: "alpha", xAxis: 4, yAxis:  7},
  {id: "alpha", xAxis: 5, yAxis: 25},
  {id: "alpha", xAxis: 6, yAxis: 13},
  {id: "beta",  xAxis: 4, yAxis: 17},
  {id: "beta",  xAxis: 5, yAxis:  8},
  {id: "beta",  xAxis: 6, yAxis: 13}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "id",
    tooltip: false,
    x: "xAxis",
    y: "yAxis"
  })
  .render();
```