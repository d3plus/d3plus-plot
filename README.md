# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot)
[![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, `npm install d3plus-plot`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-plot.v0.5.full.min.js"></script>
```


## Getting Started

d3plus-plot combines the abstract Viz class found in [d3plus-viz](https://github.com/d3plus/d3plus-viz) with the axes in [d3plus-axis](https://github.com/d3plus/d3plus-axis) to create a standard x/y plot. In addition to a lot of automatic formatting and positioning, the Viz class also provides mouse events and tooltips.

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

This creates an x/y plot using the default shape ([Circle](https://github.com/d3plus/d3plus-shape#Circle)). The default shape can be overridden using the [.shape( )](https://github.com/d3plus/d3plus-viz#Viz.shape) accessor method, as well as using the many shorthand Classes for specific types of charts (see examples below).


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-plot/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-plot/getting-started/) to view this example live on the web.


### More Examples

 * [Area Chart](http://d3plus.org/examples/d3plus-plot/area/)
 * [Advanced Axis Configuration](http://d3plus.org/examples/d3plus-plot/axis-config/)
 * [Horizontal Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-horizontal/)
 * [Stacked Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart-stacked/)
 * [Bar Chart](http://d3plus.org/examples/d3plus-plot/bar-chart/)
 * [Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot/)
 * [Flipping a Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area-flip/)
 * [Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area/)

## API Reference
### Classes

<dl>
<dt><a href="#AreaPlot">AreaPlot</a> ⇐ <code><a href="#Plot">Plot</a></code></dt>
<dd></dd>
<dt><a href="#BarChart">BarChart</a> ⇐ <code><a href="#Plot">Plot</a></code></dt>
<dd></dd>
<dt><a href="#LinePlot">LinePlot</a> ⇐ <code><a href="#Plot">Plot</a></code></dt>
<dd></dd>
<dt><a href="#Plot">Plot</a> ⇐ <code>Viz</code></dt>
<dd></dd>
<dt><a href="#StackedArea">StackedArea</a> ⇐ <code>Area</code></dt>
<dd></dd>
</dl>

<a name="AreaPlot"></a>

### AreaPlot ⇐ <code>[Plot](#Plot)</code>
**Kind**: global class  
**Extends**: <code>[Plot](#Plot)</code>  
<a name="new_AreaPlot_new"></a>

#### new AreaPlot()
Creates an area plot based on an array of data.

**Example** *(the equivalent of calling:)*  
```js
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Area")
```
<a name="BarChart"></a>

### BarChart ⇐ <code>[Plot](#Plot)</code>
**Kind**: global class  
**Extends**: <code>[Plot](#Plot)</code>  
<a name="new_BarChart_new"></a>

#### new BarChart()
Creates a line plot based on an array of data.

**Example** *(the equivalent of calling:)*  
```js
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
```
<a name="LinePlot"></a>

### LinePlot ⇐ <code>[Plot](#Plot)</code>
**Kind**: global class  
**Extends**: <code>[Plot](#Plot)</code>  
<a name="new_LinePlot_new"></a>

#### new LinePlot()
Creates a line plot based on an array of data.

**Example** *(the equivalent of calling:)*  
```js
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
```
<a name="Plot"></a>

### Plot ⇐ <code>Viz</code>
**Kind**: global class  
**Extends**: <code>Viz</code>  

* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.barPadding([*value*])](#Plot.barPadding)
    * [.baseline([*value*])](#Plot.baseline)
    * [.discrete([*value*])](#Plot.discrete)
    * [.groupPadding([*value*])](#Plot.groupPadding)
    * [.stacked([*value*])](#Plot.stacked)
    * [.stackOffset([*value*])](#Plot.stackOffset)
    * [.stackOrder([*value*])](#Plot.stackOrder)
    * [.x([*value*])](#Plot.x)
    * [.xConfig([*value*])](#Plot.xConfig)
    * [.x2Config([*value*])](#Plot.x2Config)
    * [.xDomain([*value*])](#Plot.xDomain)
    * [.xSort([*value*])](#Plot.xSort)
    * [.y([*value*])](#Plot.y)
    * [.yConfig([*value*])](#Plot.yConfig)
    * [.y2Config([*value*])](#Plot.y2Config)
    * [.yDomain([*value*])](#Plot.yDomain)
    * [.ySort([*value*])](#Plot.ySort)

<a name="new_Plot_new"></a>

#### new Plot()
Creates an x/y plot based on an array of data.

<a name="Plot.barPadding"></a>

#### Plot.barPadding([*value*])
Sets the pixel space between each bar in a group of bars.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>5</code> | 

<a name="Plot.baseline"></a>

#### Plot.baseline([*value*])
If *value* is specified, sets the baseline for the x/y plot and returns the current class instance. If *value* is not specified, returns the current baseline.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> | 

<a name="Plot.discrete"></a>

#### Plot.discrete([*value*])
If *value* is specified, sets the discrete axis to the specified string and returns the current class instance. If *value* is not specified, returns the current discrete axis.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>String</code> | 

<a name="Plot.groupPadding"></a>

#### Plot.groupPadding([*value*])
Sets the pixel space between groups of bars.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>20</code> | 

<a name="Plot.stacked"></a>

#### Plot.stacked([*value*])
If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>false</code> | 

<a name="Plot.stackOffset"></a>

#### Plot.stackOffset([*value*])
If *value* is specified, sets the stack offset and returns the current class instance. If *value* is not specified, returns the current stack offset function.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> \| <code>String</code> | <code>&quot;descending&quot;</code> | 

<a name="Plot.stackOrder"></a>

#### Plot.stackOrder([*value*])
If *value* is specified, sets the stack order and returns the current class instance. If *value* is not specified, returns the current stack order function.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> \| <code>String</code> | <code>&quot;none&quot;</code> | 

<a name="Plot.x"></a>

#### Plot.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>Number</code> | 

<a name="Plot.xConfig"></a>

#### Plot.xConfig([*value*])
If *value* is specified, sets the config method for the x-axis and returns the current class instance. If *value* is not specified, returns the current x-axis configuration.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Plot.x2Config"></a>

#### Plot.x2Config([*value*])
If *value* is specified, sets the config method for the secondary x-axis and returns the current class instance. If *value* is not specified, returns the current secondary x-axis configuration.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Plot.xDomain"></a>

#### Plot.xDomain([*value*])
If *value* is specified, sets the x domain to the specified array and returns the current class instance. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Plot.xSort"></a>

#### Plot.xSort([*value*])
Defines a custom sorting comparitor function to be used for discrete x axes.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Plot.y"></a>

#### Plot.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> \| <code>Number</code> | 

<a name="Plot.yConfig"></a>

#### Plot.yConfig([*value*])
If *value* is specified, sets the config method for the y-axis and returns the current class instance. If *value* is not specified, returns the current y-axis configuration.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Plot.y2Config"></a>

#### Plot.y2Config([*value*])
If *value* is specified, sets the config method for the secondary y-axis and returns the current class instance. If *value* is not specified, returns the current secondary y-axis configuration.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Plot.yDomain"></a>

#### Plot.yDomain([*value*])
If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Plot.ySort"></a>

#### Plot.ySort([*value*])
Defines a custom sorting comparitor function to be used for discrete y axes.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="StackedArea"></a>

### StackedArea ⇐ <code>Area</code>
**Kind**: global class  
**Extends**: <code>Area</code>  
<a name="new_StackedArea_new"></a>

#### new StackedArea()
Creates a stacked area plot based on an array of data.

**Example** *(the equivalent of calling:)*  
```js
new d3plus.Area()
  .stacked(true)
```


###### <sub>Documentation generated on Tue, 28 Mar 2017 04:13:05 GMT</sub>
