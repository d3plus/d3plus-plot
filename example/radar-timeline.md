# Radar Timeline

In a [Radar](http://d3plus.org/docs/#Radar) chart, to show timeline, set the `time` property.

```js
var myData = [
  {Geography: "Midwest", sport: "Soccer", total: 20, year: 2017},
  {Geography: "West", sport: "Soccer", total: 10, year: 2017},
  {Geography: "Southwest", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Southeast", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Northeast", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Midwest", sport: "Baseball", total: 15, year: 2017},
  {Geography: "West", sport: "Baseball", total: 21, year: 2017},
  {Geography: "Southwest", sport: "Baseball", total: 10, year: 2017},
  {Geography: "Southeast", sport: "Baseball", total: 15, year: 2017},
  {Geography: "Northeast", sport: "Baseball", total: 12, year: 2017},
  {Geography: "Midwest", sport: "Soccer", total: 10, year: 2016},
  {Geography: "West", sport: "Soccer", total: 18, year: 2016},
  {Geography: "Southwest", sport: "Soccer", total: 6, year: 2016},
  {Geography: "Southeast", sport: "Soccer", total: 2, year: 2016},
  {Geography: "Northeast", sport: "Soccer", total: 17, year: 2016},
  {Geography: "Midwest", sport: "Baseball", total: 12, year: 2016},
  {Geography: "West", sport: "Baseball", total: 10, year: 2016},
  {Geography: "Southwest", sport: "Baseball", total: 12, year: 2016},
  {Geography: "Southeast", sport: "Baseball", total: 7, year: 2016},
  {Geography: "Northeast", sport: "Baseball", total: 11, year: 2016}
];

new d3plus.Radar()
  .config({
    data: myData,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    time: "year"
  })
  .render();
```