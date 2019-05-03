# Bar Chart Title Configuration

To add title to a [BarChart](http://d3plus.org/docs/#BarChart), you can set the value to title property of [xConfig](http://d3plus.org/docs/#Plot.xConfig) or [yConfig](http://d3plus.org/docs/#Plot.yConfig).

```js
var data = [
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8}
];
```
Following example sets title for x and y axis along and also sets title color:

```js
new d3plus.BarChart()
  .config({
    data,
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
