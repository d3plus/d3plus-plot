# Changing Line Plot Splining

To plot smooth curves in a [LinePlot](http://d3plus.org/docs/#LinePlot), set the `curve` property of the nested shape config for the Line to `catmullRom` as shown below. Any available [d3-shape curve](https://github.com/d3/d3-shape#curves) is accepted.

```js
var myData = [
  {fruit: "apple",  price: 5,  year: 2014},
  {fruit: "banana", price: 4,  year: 2014},
  {fruit: "apple",  price: 7,  year: 2015},
  {fruit: "banana", price: 6,  year: 2015},
  {fruit: "apple",  price: 10, year: 2016},
  {fruit: "banana", price: 8,  year: 2016},
  {fruit: "apple",  price: 6,  year: 2017},
  {fruit: "banana", price: 10, year: 2017},
  {fruit: "apple",  price: 8,  year: 2018},
  {fruit: "banana", price: 15, year: 2018}
];

new d3plus.LinePlot()
  .config({
    data: myData,
    groupBy: "fruit",
    x: "year",
    y: "price",
    shapeConfig: {
      Line: {
        curve: "catmullRom"
      }
    }
  })
  .render();
```
