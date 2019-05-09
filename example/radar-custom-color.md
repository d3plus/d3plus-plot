# Radar Chart Custom Color

A custom color accessor function can be passed to the `fill` property of [shapeConfig](http://d3plus.org/docs/#Shape.fill) in order to set specific colors of the [Radar](http://d3plus.org/docs/#Radar). 

```js
var myData = [
  {Geography: "Midwest", sport: "Soccer", total: 20},
  {Geography: "West", sport: "Soccer", total: 10},
  {Geography: "Southwest", sport: "Soccer", total: 20},
  {Geography: "Southeast", sport: "Soccer", total: 20},
  {Geography: "Northeast", sport: "Soccer", total: 20},
  {Geography: "Midwest", sport: "Baseball", total: 15},
  {Geography: "West", sport: "Baseball", total: 21},
  {Geography: "Southwest", sport: "Baseball", total: 10},
  {Geography: "Southeast", sport: "Baseball", total: 15},
  {Geography: "Northeast", sport: "Baseball", total: 12}
];

const COLORS_SPORTS = {
  "Soccer": "green",
  "Baseball": "orange"
}

new d3plus.Radar()
  .config({
    data: myData,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    shapeConfig: {
      fill: function(d) {
        return COLORS_SPORTS[d.sport];
      }
    }
  })
  .render();
```
