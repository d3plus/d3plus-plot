# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot) [![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat)](https://gitter.im/d3plus/)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, run `npm install d3plus-plot --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-plot.v0.5.full.min.js"></script>
```


## Simple X/Y Plot

[d3plus-plot](https://github.com/d3plus/d3plus-plot) combines the abstract [Viz](http://d3plus.org/docs/#Viz) class found in [d3plus-viz](https://github.com/d3plus/d3plus-viz) with the axes in [d3plus-axis](https://github.com/d3plus/d3plus-axis) to create a standard x/y plot. In addition to a lot of automatic formatting and positioning, the [Viz](http://d3plus.org/docs/#Viz) class also provides mouse events and tooltips.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "beta",  x: 5, y:  2},
  {id: "gamma", x: 6, y: 13}
];
```

Given some data points, we can create a plot very easily:

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .render();
```

This creates an x/y plot using the default shape ([Circle](http://d3plus.org/docs/#Circle)). The shape type can be overwritten using the [.shape( )](http://d3plus.org/docs/#Viz.shape) accessor method, as well as using the many shorthand Classes for specific types of charts, like [BarChart](http://d3plus.org/examples/d3plus-plot/bar-chart/) and [AreaPlot](http://d3plus.org/examples/d3plus-plot/area/).


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-plot/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-plot/getting-started/) to view this example live on the web.


### More Examples

 * [Scatter Plot/Bubble Chart](http://d3plus.org/examples/d3plus-plot/bubble-plot/)
 * [Custom Chart Annotations](http://d3plus.org/examples/d3plus-plot/annotations/)
 * [Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area/)
 * [Horizontal Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area-flip/)
 * [Changing the Stroke Width of a Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot-strokeWidth/)
 * [Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot/)
 * [Changing Grid Styles](http://d3plus.org/examples/d3plus-plot/grid-config/)
 * [Stacked Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-stacked/)
 * [Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart/)
 * [Horizontal Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-horizontal/)
 * [Custom Bar Chart Padding](http://d3plus.org/examples/d3plus-plot/bar-chart-padding/)
 * [Area Chart](http://d3plus.org/examples/d3plus-plot/area/)
 * [Advanced Axis Configuration](http://d3plus.org/examples/d3plus-plot/axis-config/)

## API Reference

##### 
* [AreaPlot](#AreaPlot)
* [BarChart](#BarChart)
* [LinePlot](#LinePlot)
* [Plot](#Plot)
* [StackedArea](#StackedArea)

---

<a name="AreaPlot"></a>
#### **AreaPlot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/AreaPlot.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


<a name="new_AreaPlot_new" href="#new_AreaPlot_new">#</a> new **AreaPlot**()

Creates an area plot based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Area")
```

---

<a name="BarChart"></a>
#### **BarChart** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/BarChart.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


<a name="new_BarChart_new" href="#new_BarChart_new">#</a> new **BarChart**()

Creates a line plot based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
```

---

<a name="LinePlot"></a>
#### **LinePlot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/LinePlot.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


<a name="new_LinePlot_new" href="#new_LinePlot_new">#</a> new **LinePlot**()

Creates a line plot based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
```

---

<a name="Plot"></a>
#### **Plot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L21)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.annotations(*annotations*)](#Plot.annotations) ↩︎
    * [.barPadding(*value*)](#Plot.barPadding) ↩︎
    * [.baseline(*value*)](#Plot.baseline) ↩︎
    * [.discrete(*value*)](#Plot.discrete) ↩︎
    * [.groupPadding([*value*])](#Plot.groupPadding) ↩︎
    * [.size(*value*)](#Plot.size) ↩︎
    * [.sizeMax(*value*)](#Plot.sizeMax) ↩︎
    * [.sizeMin(*value*)](#Plot.sizeMin) ↩︎
    * [.sizeScale(*value*)](#Plot.sizeScale) ↩︎
    * [.stacked(*value*)](#Plot.stacked) ↩︎
    * [.stackOffset(*value*)](#Plot.stackOffset) ↩︎
    * [.stackOrder(*value*)](#Plot.stackOrder) ↩︎
    * [.x(*value*)](#Plot.x) ↩︎
    * [.xConfig(*value*)](#Plot.xConfig) ↩︎
    * [.x2Config(*value*)](#Plot.x2Config) ↩︎
    * [.xDomain(*value*)](#Plot.xDomain) ↩︎
    * [.xSort(*value*)](#Plot.xSort) ↩︎
    * [.y(*value*)](#Plot.y) ↩︎
    * [.yConfig(*value*)](#Plot.yConfig) ↩︎
    * [.y2Config(*value*)](#Plot.y2Config) ↩︎
    * [.yDomain(*value*)](#Plot.yDomain) ↩︎
    * [.ySort(*value*)](#Plot.ySort) ↩︎


<a name="new_Plot_new" href="#new_Plot_new">#</a> new **Plot**()

Creates an x/y plot based on an array of data.





<a name="Plot.annotations" href="#Plot.annotations">#</a> Plot.**annotations**(*annotations*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L523)

Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.barPadding" href="#Plot.barPadding">#</a> Plot.**barPadding**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L533)

Sets the pixel space between each bar in a group of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.baseline" href="#Plot.baseline">#</a> Plot.**baseline**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L543)

Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.discrete" href="#Plot.discrete">#</a> Plot.**discrete**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L553)

Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.groupPadding" href="#Plot.groupPadding">#</a> Plot.**groupPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L563)

Sets the pixel space between groups of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.size" href="#Plot.size">#</a> Plot.**size**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L573)

Sets the size of bubbles to the given Number, data key, or function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMax" href="#Plot.sizeMax">#</a> Plot.**sizeMax**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L583)

Sets the size scale maximum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMin" href="#Plot.sizeMin">#</a> Plot.**sizeMin**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L593)

Sets the size scale minimum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeScale" href="#Plot.sizeScale">#</a> Plot.**sizeScale**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L603)

Sets the size scale to the specified string.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stacked" href="#Plot.stacked">#</a> Plot.**stacked**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L613)

If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOffset" href="#Plot.stackOffset">#</a> Plot.**stackOffset**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L623)

Sets the stack offset. If *value* is not specified, returns the current stack offset function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOrder" href="#Plot.stackOrder">#</a> Plot.**stackOrder**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L633)

Sets the stack order. If *value* is not specified, returns the current stack order function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x" href="#Plot.x">#</a> Plot.**x**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L643)

Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xConfig" href="#Plot.xConfig">#</a> Plot.**xConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L666)

Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Config" href="#Plot.x2Config">#</a> Plot.**x2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L676)

Sets the config method for the secondary x-axis. If *value* is not specified, returns the current secondary x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xDomain" href="#Plot.xDomain">#</a> Plot.**xDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L686)

Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xSort" href="#Plot.xSort">#</a> Plot.**xSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L696)

Defines a custom sorting comparitor function to be used for discrete x axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y" href="#Plot.y">#</a> Plot.**y**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L706)

Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yConfig" href="#Plot.yConfig">#</a> Plot.**yConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L731)

Sets the config method for the y-axis. If *value* is not specified, returns the current y-axis configuration.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Config" href="#Plot.y2Config">#</a> Plot.**y2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L746)

Sets the config method for the secondary y-axis. If *value* is not specified, returns the current secondary y-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yDomain" href="#Plot.yDomain">#</a> Plot.**yDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L756)

Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.ySort" href="#Plot.ySort">#</a> Plot.**ySort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L766)

Defines a custom sorting comparitor function to be used for discrete y axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.

---

<a name="StackedArea"></a>
#### **StackedArea** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/StackedArea.js#L3)


This is a global class, and extends all of the methods and functionality of <code>Area</code>.


<a name="new_StackedArea_new" href="#new_StackedArea_new">#</a> new **StackedArea**()

Creates a stacked area plot based on an array of data.



the equivalent of calling:

```js
new d3plus.Area()
  .stacked(true)
```

---



###### <sub>Documentation generated on Fri, 05 Jan 2018 00:07:50 GMT</sub>
