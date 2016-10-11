# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot)
[![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, `npm install d3plus-plot`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-plot.v0.3.full.min.js"></script>
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

 * [Flipping a Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area-flip/)
 * [Stacked Area Chart](http://d3plus.org/examples/d3plus-plot/stacked-area/)
 * [Area Chart](http://d3plus.org/examples/d3plus-plot/area/)<sup> ***New***</sup>
 * [Line Plot](http://d3plus.org/examples/d3plus-plot/line-plot/)

## API Reference
### Classes

<dl>
<dt><a href="#AreaPlot">AreaPlot</a> ⇐ <code><a href="#Plot">Plot</a></code></dt>
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
**Extends:** <code>[Plot](#Plot)</code>  
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
<a name="LinePlot"></a>

### LinePlot ⇐ <code>[Plot](#Plot)</code>
**Kind**: global class  
**Extends:** <code>[Plot](#Plot)</code>  
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
**Extends:** <code>Viz</code>  

* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.baseline([*value*])](#Plot.baseline)
    * [.stacked([*value*])](#Plot.stacked)
    * [.x([*value*])](#Plot.x)
    * [.xDomain([*value*])](#Plot.xDomain)
    * [.y([*value*])](#Plot.y)
    * [.yDomain([*value*])](#Plot.yDomain)

<a name="new_Plot_new"></a>

#### new Plot()
Creates an x/y plot based on an array of data.

<a name="Plot.baseline"></a>

#### Plot.baseline([*value*])
If *value* is specified, sets the baseline for the x/y plot and returns the current class instance. If *value* is not specified, returns the current baseline.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Number</code> | 

<a name="Plot.stacked"></a>

#### Plot.stacked([*value*])
If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Boolean</code> | <code>false</code> | 

<a name="Plot.x"></a>

#### Plot.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Plot.xDomain"></a>

#### Plot.xDomain([*value*])
If *value* is specified, sets the x domain to the specified array and returns the current class instance. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="Plot.y"></a>

#### Plot.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Plot.yDomain"></a>

#### Plot.yDomain([*value*])
If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Array</code> | 

<a name="StackedArea"></a>

### StackedArea ⇐ <code>Area</code>
**Kind**: global class  
**Extends:** <code>Area</code>  
<a name="new_StackedArea_new"></a>

#### new StackedArea()
Creates a stacked area plot based on an array of data.

**Example** *(the equivalent of calling:)*  
```js
new d3plus.Area()
  .stacked(true)
```


###### <sub>Documentation generated on Tue, 11 Oct 2016 20:46:21 GMT</sub>
