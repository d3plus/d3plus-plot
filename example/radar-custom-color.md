# Radar Chart Custom Color

A custom color accessor function can be passed to the `fill` property of [shapeConfig](http://d3plus.org/docs/#Shape.fill) in order to set specific colors of the [Radar](http://d3plus.org/docs/#Radar). 

```js
var data = [
  {Geography: "Midwest", sport: "Soccer", total: 20, year: 2017},
  {Geography: "West", sport: "Soccer", total: 10, year: 2017},
  {Geography: "Southwest", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Southeast", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Northeast", sport: "Soccer", total: 20, year: 2017},
  {Geography: "Midwest", sport: "Baseball", total: 15, year: 2017},
  {Geography: "West", sport: "Baseball", total: 21, year: 2017},
  {Geography: "Southwest", sport: "Baseball", total: 10, year: 2017},
  {Geography: "Southeast", sport: "Baseball", total: 15, year: 2017},
  {Geography: "Northeast", sport: "Baseball", total: 12, year: 2017}
];

const COLORS_SPORTS = {
  "Soccer": "green",
  "Baseball": "orange"
}

new d3plus.Radar()
  .config({
    data,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    shapeConfig: {
      fill: d => COLORS_SPORTS[d["sport"]]
    }
  })
  .render();
```
