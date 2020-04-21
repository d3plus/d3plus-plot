# Adding Vertex Markers to Line Plots

It is often helpful to draw small circles on each vertex of the Lines in an x/y plot. To enable this feature, simply pass `true` to the [lineMarkers](http://d3plus.org/docs/#Plot.lineMarkers) method. Additionally, custom [Shape configuration options](http://d3plus.org/docs/#Circle) for the Circles can be provided to the [lineMarkerConfig](http://d3plus.org/docs/#Plot.lineMarkerConfig) method. In this example, we are increasing the default Circle radius to `6` pixels.

```js
new d3plus.LinePlot()
  .config({
    data: [
      {id: "alpha", x: 4, y:  9},
      {id: "alpha", x: 5, y: 17},
      {id: "alpha", x: 6, y: 13},
      {id: "beta",  x: 4, y: 17},
      {id: "beta",  x: 5, y:  8},
      {id: "beta",  x: 6, y: 16},
      {id: "gamma",  x: 4, y: 14},
      {id: "gamma",  x: 5, y:  9},
      {id: "gamma",  x: 6, y: 11}
    ],
    groupBy: "id",
    lineMarkers: true,
    lineMarkerConfig: {
      r: 6
    },
    x: "x",
    y: "y"
  })
  .render();
```
