# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot) [![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) [![1.0 progress](https://img.shields.io/badge/1.0_progress-86%25-yellowgreen.svg?style=flat)](https://github.com/d3plus/d3plus-plot/projects/1)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, run `npm install d3plus-plot --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-plot.v0.7.full.min.js"></script>
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

 * [Sorting Shapes on an X/Y Plot](http://d3plus.org/examples/d3plus-plot/shapeSort/)<sup> ***New***</sup>
 * [Line Plot Sorting](http://d3plus.org/examples/d3plus-plot/line-plot-sort/)
 * [Secondary Axis Only](http://d3plus.org/examples/d3plus-plot/secondary-axis-only/)
 * [Confidence Interval](http://d3plus.org/examples/d3plus-plot/confidence-interval/)
 * [Secondary Axes](http://d3plus.org/examples/d3plus-plot/secondary-axes/)
 * [Bump Chart](http://d3plus.org/examples/d3plus-plot/bump-chart/)
 * [Scatter Plot/Bubble Chart](http://d3plus.org/examples/d3plus-plot/bubble-plot/)
 * [Custom Chart Annotations](http://d3plus.org/examples/d3plus-plot/annotations/)
 * [Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area/)
 * [Horizontal Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area-flip/)
 * [Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot/)
 * [Changing the Stroke Width of a Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot-strokeWidth/)
 * [Changing Grid Styles](http://d3plus.org/examples/d3plus-plot/grid-config/)
 * [Stacked Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-stacked/)
 * [Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart/)
 * [Custom Bar Chart Padding](http://d3plus.org/examples/d3plus-plot/bar-chart-padding/)
 * [Horizontal Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-horizontal/)
 * [Area Chart](http://d3plus.org/examples/d3plus-plot/area/)
 * [Advanced Axis Configuration](http://d3plus.org/examples/d3plus-plot/axis-config/)

## API Reference

##### 
* [AreaPlot](#AreaPlot)
* [BarChart](#BarChart)
* [BumpChart](#BumpChart)
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

Creates a bar chart based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Bar")
```

---

<a name="BumpChart"></a>
#### **BumpChart** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/BumpChart.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


<a name="new_BumpChart_new" href="#new_BumpChart_new">#</a> new **BumpChart**()

Creates a bump chart based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
  .x("x")
  .y2(d => this._y(d))
  .yConfig({
    tickFormat: val => {
      const data = this._formattedData;
      const xDomain = this._xDomain;
      const startData = data.filter(d => d.x === xDomain[0]);
      const d = startData.find(d => d.y === val);
      return this._drawLabel(d, d.i);
     }
   })
  .y2Config({
    tickFormat: val => {
      const data = this._formattedData;
      const xDomain = this._xDomain;
      const endData = data.filter(d => d.x === xDomain[xDomain.length - 1]);
      const d = endData.find(d => d.y === val);
      return this._drawLabel(d, d.i);
     }
   })
  .ySort((a, b) => b.y - a.y)
  .y2Sort((a, b) => b.y - a.y)
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
    * [.confidence(*value*)](#Plot.confidence) ↩︎
    * [.confidenceConfig([*value*])](#Plot.confidenceConfig) ↩︎
    * [.discrete(*value*)](#Plot.discrete) ↩︎
    * [.groupPadding([*value*])](#Plot.groupPadding) ↩︎
    * [.shapeSort(*value*)](#Plot.shapeSort) ↩︎
    * [.size(*value*)](#Plot.size) ↩︎
    * [.sizeMax(*value*)](#Plot.sizeMax) ↩︎
    * [.sizeMin(*value*)](#Plot.sizeMin) ↩︎
    * [.sizeScale(*value*)](#Plot.sizeScale) ↩︎
    * [.stacked(*value*)](#Plot.stacked) ↩︎
    * [.stackOffset(*value*)](#Plot.stackOffset) ↩︎
    * [.stackOrder(*value*)](#Plot.stackOrder) ↩︎
    * [.x(*value*)](#Plot.x) ↩︎
    * [.x2(*value*)](#Plot.x2) ↩︎
    * [.xConfig(*value*)](#Plot.xConfig) ↩︎
    * [.x2Config(*value*)](#Plot.x2Config) ↩︎
    * [.xDomain(*value*)](#Plot.xDomain) ↩︎
    * [.x2Domain(*value*)](#Plot.x2Domain) ↩︎
    * [.xSort(*value*)](#Plot.xSort) ↩︎
    * [.x2Sort(*value*)](#Plot.x2Sort) ↩︎
    * [.y(*value*)](#Plot.y) ↩︎
    * [.y2(*value*)](#Plot.y2) ↩︎
    * [.yConfig(*value*)](#Plot.yConfig) ↩︎
    * [.y2Config(*value*)](#Plot.y2Config) ↩︎
    * [.yDomain(*value*)](#Plot.yDomain) ↩︎
    * [.y2Domain(*value*)](#Plot.y2Domain) ↩︎
    * [.ySort(*value*)](#Plot.ySort) ↩︎
    * [.y2Sort(*value*)](#Plot.y2Sort) ↩︎


<a name="new_Plot_new" href="#new_Plot_new">#</a> new **Plot**()

Creates an x/y plot based on an array of data.





<a name="Plot.annotations" href="#Plot.annotations">#</a> Plot.**annotations**(*annotations*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L769)

Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.barPadding" href="#Plot.barPadding">#</a> Plot.**barPadding**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L779)

Sets the pixel space between each bar in a group of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.baseline" href="#Plot.baseline">#</a> Plot.**baseline**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L789)

Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.confidence" href="#Plot.confidence">#</a> Plot.**confidence**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L807)

Sets the confidence to the specified array of lower and upper bounds.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.
Can be called with accessor functions or static keys:

```js
       var data = {id: "alpha", value: 10, lci: 9, hci: 11};
       ...
       // Accessor functions
       .confidence([function(d) { return d.lci }, function(d) { return d.hci }])

       // Or static keys
       .confidence(["lci", "hci"])
```


<a name="Plot.confidenceConfig" href="#Plot.confidenceConfig">#</a> Plot.**confidenceConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L826)

If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.discrete" href="#Plot.discrete">#</a> Plot.**discrete**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L836)

Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.groupPadding" href="#Plot.groupPadding">#</a> Plot.**groupPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L846)

Sets the pixel space between groups of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.shapeSort" href="#Plot.shapeSort">#</a> Plot.**shapeSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L856)

A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.size" href="#Plot.size">#</a> Plot.**size**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L866)

Sets the size of bubbles to the given Number, data key, or function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMax" href="#Plot.sizeMax">#</a> Plot.**sizeMax**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L876)

Sets the size scale maximum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMin" href="#Plot.sizeMin">#</a> Plot.**sizeMin**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L886)

Sets the size scale minimum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeScale" href="#Plot.sizeScale">#</a> Plot.**sizeScale**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L896)

Sets the size scale to the specified string.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stacked" href="#Plot.stacked">#</a> Plot.**stacked**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L906)

If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOffset" href="#Plot.stackOffset">#</a> Plot.**stackOffset**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L916)

Sets the stack offset. If *value* is not specified, returns the current stack offset function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOrder" href="#Plot.stackOrder">#</a> Plot.**stackOrder**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L926)

Sets the stack order. If *value* is not specified, returns the current stack order function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x" href="#Plot.x">#</a> Plot.**x**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L936)

Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2" href="#Plot.x2">#</a> Plot.**x2**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L959)

Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xConfig" href="#Plot.xConfig">#</a> Plot.**xConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L982)

Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Config" href="#Plot.x2Config">#</a> Plot.**x2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L992)

Sets the config method for the secondary x-axis. If *value* is not specified, returns the current secondary x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xDomain" href="#Plot.xDomain">#</a> Plot.**xDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1002)

Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Domain" href="#Plot.x2Domain">#</a> Plot.**x2Domain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1012)

Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xSort" href="#Plot.xSort">#</a> Plot.**xSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1022)

Defines a custom sorting comparitor function to be used for discrete x axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Sort" href="#Plot.x2Sort">#</a> Plot.**x2Sort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1032)

Defines a custom sorting comparitor function to be used for discrete x2 axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y" href="#Plot.y">#</a> Plot.**y**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1042)

Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2" href="#Plot.y2">#</a> Plot.**y2**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1065)

Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yConfig" href="#Plot.yConfig">#</a> Plot.**yConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1090)

Sets the config method for the y-axis. If *value* is not specified, returns the current y-axis configuration.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Config" href="#Plot.y2Config">#</a> Plot.**y2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1105)

Sets the config method for the secondary y-axis. If *value* is not specified, returns the current secondary y-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yDomain" href="#Plot.yDomain">#</a> Plot.**yDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1115)

Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Domain" href="#Plot.y2Domain">#</a> Plot.**y2Domain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1125)

Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.ySort" href="#Plot.ySort">#</a> Plot.**ySort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1135)

Defines a custom sorting comparitor function to be used for discrete y axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Sort" href="#Plot.y2Sort">#</a> Plot.**y2Sort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1145)

Defines a custom sorting comparitor function to be used for discrete y2 axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.

---

<a name="StackedArea"></a>
#### **StackedArea** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/StackedArea.js#L3)


This is a global class, and extends all of the methods and functionality of <code>Area</code>.


<a name="new_StackedArea_new" href="#new_StackedArea_new">#</a> new **StackedArea**()

Creates a stacked area plot based on an array of data.



the equivalent of calling:

```js
new d3plus.AreaPlot()
  .stacked(true)
```

---



###### <sub>Documentation generated on Fri, 03 Aug 2018 14:23:05 GMT</sub>
