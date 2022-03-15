# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot) [![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, `npm install d3plus-plot`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). You can also load d3plus-plot as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-plot@1"></script>
<script>
  console.log(d3plus);
</script>
```

## API Reference

##### 
* [AreaPlot](#AreaPlot)
* [BarChart](#BarChart)
* [BoxWhisker](#BoxWhisker)
* [BumpChart](#BumpChart)
* [LinePlot](#LinePlot)
* [Plot](#Plot)
* [Radar](#Radar)
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

<a name="BoxWhisker"></a>
#### **BoxWhisker** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/BoxWhisker.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


<a name="new_BoxWhisker_new" href="#new_BoxWhisker_new">#</a> new **BoxWhisker**()

Creates a simple box and whisker based on an array of data.



the equivalent of calling:

```js
new d3plus.Plot()
  .discrete("x")
  .shape("Box")
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
#### **Plot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L106)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.annotations(*annotations*)](#Plot.annotations) ↩︎
    * [.backgroundConfig([*value*])](#Plot.backgroundConfig) ↩︎
    * [.barPadding(*value*)](#Plot.barPadding) ↩︎
    * [.baseline(*value*)](#Plot.baseline) ↩︎
    * [.confidence(*value*)](#Plot.confidence) ↩︎
    * [.confidenceConfig([*value*])](#Plot.confidenceConfig) ↩︎
    * [.discrete(*value*)](#Plot.discrete) ↩︎
    * [.discreteCutoff(*value*)](#Plot.discreteCutoff) ↩︎
    * [.groupPadding([*value*])](#Plot.groupPadding) ↩︎
    * [.lineLabels([*value*])](#Plot.lineLabels) ↩︎
    * [.lineMarkerConfig(*value*)](#Plot.lineMarkerConfig) ↩︎
    * [.lineMarkers([*value*])](#Plot.lineMarkers) ↩︎
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
    * [.xCutoff(*value*)](#Plot.xCutoff) ↩︎
    * [.x2Config(*value*)](#Plot.x2Config) ↩︎
    * [.xDomain(*value*)](#Plot.xDomain) ↩︎
    * [.x2Domain(*value*)](#Plot.x2Domain) ↩︎
    * [.xSort(*value*)](#Plot.xSort) ↩︎
    * [.x2Sort(*value*)](#Plot.x2Sort) ↩︎
    * [.y(*value*)](#Plot.y) ↩︎
    * [.y2(*value*)](#Plot.y2) ↩︎
    * [.yConfig(*value*)](#Plot.yConfig) ↩︎
    * [.yCutoff(*value*)](#Plot.yCutoff) ↩︎
    * [.y2Config(*value*)](#Plot.y2Config) ↩︎
    * [.yDomain(*value*)](#Plot.yDomain) ↩︎
    * [.y2Domain(*value*)](#Plot.y2Domain) ↩︎
    * [.ySort(*value*)](#Plot.ySort) ↩︎
    * [.y2Sort(*value*)](#Plot.y2Sort) ↩︎


<a name="new_Plot_new" href="#new_Plot_new">#</a> new **Plot**()

Creates an x/y plot based on an array of data.





<a name="Plot.annotations" href="#Plot.annotations">#</a> Plot.**annotations**(*annotations*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1266)

Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.backgroundConfig" href="#Plot.backgroundConfig">#</a> Plot.**backgroundConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1276)

A d3plus-shape configuration Object used for styling the background rectangle of the inner x/y plot (behind all of the shapes and gridlines).


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.barPadding" href="#Plot.barPadding">#</a> Plot.**barPadding**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1286)

Sets the pixel space between each bar in a group of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.baseline" href="#Plot.baseline">#</a> Plot.**baseline**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1296)

Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.confidence" href="#Plot.confidence">#</a> Plot.**confidence**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1314)

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


<a name="Plot.confidenceConfig" href="#Plot.confidenceConfig">#</a> Plot.**confidenceConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1333)

If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.discrete" href="#Plot.discrete">#</a> Plot.**discrete**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1343)

Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.discreteCutoff" href="#Plot.discreteCutoff">#</a> Plot.**discreteCutoff**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1353)

When the width or height of the chart is less than or equal to this pixel value, the discrete axis will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.groupPadding" href="#Plot.groupPadding">#</a> Plot.**groupPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1363)

Sets the pixel space between groups of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.lineLabels" href="#Plot.lineLabels">#</a> Plot.**lineLabels**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1373)

Draws labels on the right side of any Line shapes that are drawn on the plot.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.lineMarkerConfig" href="#Plot.lineMarkerConfig">#</a> Plot.**lineMarkerConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1383)

Shape config for the Circle shapes drawn by the lineMarkers method.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.lineMarkers" href="#Plot.lineMarkers">#</a> Plot.**lineMarkers**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1393)

Draws circle markers on each vertex of a Line.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.shapeSort" href="#Plot.shapeSort">#</a> Plot.**shapeSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1403)

A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.size" href="#Plot.size">#</a> Plot.**size**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1413)

Sets the size of bubbles to the given Number, data key, or function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMax" href="#Plot.sizeMax">#</a> Plot.**sizeMax**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1423)

Sets the size scale maximum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMin" href="#Plot.sizeMin">#</a> Plot.**sizeMin**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1433)

Sets the size scale minimum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeScale" href="#Plot.sizeScale">#</a> Plot.**sizeScale**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1443)

Sets the size scale to the specified string.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stacked" href="#Plot.stacked">#</a> Plot.**stacked**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1453)

If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOffset" href="#Plot.stackOffset">#</a> Plot.**stackOffset**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1463)

Sets the stack offset. If *value* is not specified, returns the current stack offset function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOrder" href="#Plot.stackOrder">#</a> Plot.**stackOrder**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1473)

Sets the stack order. If *value* is not specified, returns the current stack order function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x" href="#Plot.x">#</a> Plot.**x**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1488)

Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2" href="#Plot.x2">#</a> Plot.**x2**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1506)

Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xConfig" href="#Plot.xConfig">#</a> Plot.**xConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1524)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xCutoff" href="#Plot.xCutoff">#</a> Plot.**xCutoff**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1534)

When the width of the chart is less than or equal to this pixel value, and the x-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Config" href="#Plot.x2Config">#</a> Plot.**x2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1544)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xDomain" href="#Plot.xDomain">#</a> Plot.**xDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1554)

Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Domain" href="#Plot.x2Domain">#</a> Plot.**x2Domain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1564)

Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xSort" href="#Plot.xSort">#</a> Plot.**xSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1574)

Defines a custom sorting comparitor function to be used for discrete x axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Sort" href="#Plot.x2Sort">#</a> Plot.**x2Sort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1584)

Defines a custom sorting comparitor function to be used for discrete x2 axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y" href="#Plot.y">#</a> Plot.**y**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1594)

Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2" href="#Plot.y2">#</a> Plot.**y2**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1612)

Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yConfig" href="#Plot.yConfig">#</a> Plot.**yConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1632)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yCutoff" href="#Plot.yCutoff">#</a> Plot.**yCutoff**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1647)

When the height of the chart is less than or equal to this pixel value, and the y-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Config" href="#Plot.y2Config">#</a> Plot.**y2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1657)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yDomain" href="#Plot.yDomain">#</a> Plot.**yDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1672)

Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Domain" href="#Plot.y2Domain">#</a> Plot.**y2Domain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1682)

Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.ySort" href="#Plot.ySort">#</a> Plot.**ySort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1692)

Defines a custom sorting comparitor function to be used for discrete y axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Sort" href="#Plot.y2Sort">#</a> Plot.**y2Sort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L1702)

Defines a custom sorting comparitor function to be used for discrete y2 axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.

---

<a name="Radar"></a>
#### **Radar** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L15)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Radar](#Radar) ⇐ <code>Viz</code>
    * [new Radar()](#new_Radar_new)
    * [.axisConfig(*value*)](#Radar.axisConfig) ↩︎
    * [.metric(*value*)](#Radar.metric) ↩︎
    * [.outerPadding([*value*])](#Radar.outerPadding) ↩︎
    * [.value(*value*)](#Radar.value)


<a name="new_Radar_new" href="#new_Radar_new">#</a> new **Radar**()

Creates a radar visualization based on an array of data.





<a name="Radar.axisConfig" href="#Radar.axisConfig">#</a> Radar.**axisConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L240)

Sets the config method used for the radial spokes, circles, and labels.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.metric" href="#Radar.metric">#</a> Radar.**metric**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L250)

Defines the value used as axis. If *value* is specified, sets the accessor to the specified metric function. If *value* is not specified, returns the current metric accessor.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.outerPadding" href="#Radar.outerPadding">#</a> Radar.**outerPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L260)

Determines how much pixel spaces to give the outer labels.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.value" href="#Radar.value">#</a> Radar.**value**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L273)

If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Radar</code>](#Radar).


```js
function value(d) {
  return d.value;
}
```

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



###### <sub>Documentation generated on Tue, 15 Mar 2022 17:43:49 GMT</sub>
