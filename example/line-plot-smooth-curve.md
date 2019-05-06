# Line Plot Smooth Curve

To plot smooth curves in a [LinePlot](http://d3plus.org/docs/#LinePlot), set `curve` property to `catmullRom` as shown below:

```js
const data = [
  {fruit: "apple", price: 5, year: 2014},
  {fruit: "banana",  price: 4, year: 2014},
  {fruit: "apple", price: 7, year: 2015},
  {fruit: "banana",  price: 6, year: 2015},
  {fruit: "apple", price: 10, year: 2016},
  {fruit: "banana",  price: 8, year: 2016},
  {fruit: "apple", price: 6, year: 2017},
  {fruit: "banana",  price: 10, year: 2017},
  {fruit: "apple", price: 8, year: 2018},
  {fruit: "banana",  price: 15, year: 2018}
];

new d3plus.LinePlot()
  .config({
    data,
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
