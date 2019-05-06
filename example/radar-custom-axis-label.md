# Radar Chart Custom Axis Label

Axis labels in [Radar](http://d3plus.org/docs/#Radar) class can be set to custom colors by setting the `fontColor` property to a color or an accessor function which returns desired color nested in `labelConfig` property of [shapeConfig](http://d3plus.org/docs/#Plot.shapeConfig) in [axisConfig](http://d3plus.org/docs/#Radar.axisConfig).

```js
var data = [
  {Geography: "Midwest Region", sport: "Soccer", total: 20, year: 2017},
  {Geography: "West Region", sport: "Soccer", total: 10, year: 2017},
  {Geography: "Southwest Region", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Southeast Region", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Northeast Region", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Midwest Region", sport: "Baseball", total: 15, year: 2017},
  {Geography: "West Region", sport: "Baseball", total: 21, year: 2017},
  {Geography: "Southwest Region", sport: "Baseball", total: 10, year: 2017},
  {Geography: "Southeast Region", sport: "Baseball", total: 15, year: 2017},
  {Geography: "Northeast Region", sport: "Baseball", total: 12, year: 2017}
];

new d3plus.Radar()
  .config({
    data,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    axisConfig: {
      shapeConfig: {
        labelConfig: {
          fontColor: "green"
        },
        label: d => d.replace("Region", "").trim()
      }
    }
  })
  .render();
```
