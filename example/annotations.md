# Custom Chart Annotations

Outside of the data provided to the [data method](http://d3plus.org/docs/#Viz.data), it is possible to draw custom shapes on any x/y plot. The [annotations method](http://d3plus.org/docs/#Plot.annotations) allows drawing custom shapes to be used as annotations. The method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.

Given the data from our simple [Line Plot Example](http://d3plus.org/examples/d3plus-plot/line-plot/):

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];
```

We can draw a custom defined rectangle and line like so:

```js
new d3plus.LinePlot()
  .data(data)
  .groupBy("id")
  .annotations([
    {
      data: [
        {x: 5, y: 7},
        {x: 5, y: 16}
      ],
      shape: "Line",
      stroke: "#ddd",
      strokeDasharray: "10",
      strokeWidth: 2
    },
    {
      data: [
        {x: 5, y: 16, width: 200, height: 100}
      ],
      fill: "#ddd",
      label: "This is important",
      labelConfig: {
        textAnchor: "middle",
        verticalAlign: "middle"
      },
      shape: "Rect"
    }
  ])
  .render();
```
