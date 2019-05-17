# Custom Dash Line Plot

You can set custom dash size for multiple lines in a [LinePlot](http://d3plus.org/docs/#LinePlot) by setting the `Line.strokeDasharray` property inside [.shapeConfig( )](http://d3plus.org/docs/#Viz.shapeConfig) to a function which returns string of numbers:

```js
var myData = [
  {fruit: "apple",  price: 5,  year: 2014},
  {fruit: "banana", price: 4,  year: 2014},
  {fruit: "cherry", price: 7,  year: 2014},
  {fruit: "apple",  price: 7,  year: 2015},
  {fruit: "banana", price: 6,  year: 2015},
  {fruit: "cherry", price: 9,  year: 2015},
  {fruit: "apple",  price: 10, year: 2016},
  {fruit: "banana", price: 8,  year: 2016},
  {fruit: "cherry", price: 5,  year: 2016},
  {fruit: "apple",  price: 6,  year: 2017},
  {fruit: "banana", price: 10, year: 2017},
  {fruit: "cherry", price: 10, year: 2017},
  {fruit: "apple",  price: 8,  year: 2018},
  {fruit: "banana", price: 15, year: 2018},
  {fruit: "cherry", price: 12, year: 2018}
];

new d3plus.LinePlot()
  .config({
    data: myData,
    groupBy: "fruit",
    x: "year",
    y: "price",
    shapeConfig: {
      Line: {
        strokeDasharray: function(d) {
          if (d.fruit === "apple") return "10";
          if (d.fruit === "banana") return "10 7 3";
          if (d.fruit === "cherry") return "10 7 5 2";
          return "0";
        }
      }
    }
  })
  .render();
```
