# Radar Chart Custom Labels

The configuration of the spokes of a [Radar](http://d3plus.org/docs/#Radar) chart can be modified using the [axisConfig](http://d3plus.org/docs/#Radar.axisConfig) method.

```js
var myData = [
  {Geography: "Midwest Region",   sport: "Soccer",   total: 20},
  {Geography: "West Region",      sport: "Soccer",   total: 10},
  {Geography: "Southwest Region", sport: "Soccer",   total: 20},
  {Geography: "Southeast Region", sport: "Soccer",   total: 20},
  {Geography: "Northeast Region", sport: "Soccer",   total: 20},
  {Geography: "Midwest Region",   sport: "Baseball", total: 15},
  {Geography: "West Region",      sport: "Baseball", total: 21},
  {Geography: "Southwest Region", sport: "Baseball", total: 10},
  {Geography: "Southeast Region", sport: "Baseball", total: 15},
  {Geography: "Northeast Region", sport: "Baseball", total: 12}
];

new d3plus.Radar()
  .config({
    data: myData,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    axisConfig: {
      shapeConfig: {
        labelConfig: {
          fontColor: "green"
        },
        label: function(d) {
          return d.Geography.replace("Region", "").trim();
        }
      }
    }
  })
  .render();
```
