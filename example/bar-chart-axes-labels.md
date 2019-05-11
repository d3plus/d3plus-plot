# Bar Chart Axes Labels

To add labels to the axes of a [BarChart](http://d3plus.org/docs/#BarChart), simply set the title property of [xConfig](http://d3plus.org/docs/#Plot.xConfig) and [yConfig](http://d3plus.org/docs/#Plot.yConfig).

```js
var myData = [
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8}
];
```
Following example sets label for x and y axes:

```js
new d3plus.BarChart()
  .config({
    data: myData,
    discrete: "y",
    groupBy: "id",
    x: "y",
    y: "x",
    xConfig: {
      title: "X - Axis",
      titleConfig: {
        fontColor: "green"  
      },
    },
    yConfig: {
      title: "Y - Axis",
      titleConfig: {
        fontColor: "green"
      }
    }
  })
  .render();
```
