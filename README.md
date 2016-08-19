# d3plus-plot

[![NPM Release](http://img.shields.io/npm/v/d3plus-plot.svg?style=flat)](https://www.npmjs.org/package/d3plus-plot)
[![Build Status](https://travis-ci.org/d3plus/d3plus-plot.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-plot)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-plot.svg?style=flat)](https://david-dm.org/d3plus/d3plus-plot)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

A reusable javascript x/y plot built on D3.

## Installing

If you use NPM, `npm install d3plus-plot`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-plot/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-plot.v0.1.full.min.js"></script>
```


## Getting Started

d3plus-plot combines the abstract Viz class found in [d3plus-viz](https://github.com/d3plus/d3plus-viz) with the axes in [d3plus-axis](https://github.com/d3plus/d3plus-axis) to create a standard x/y plot. In addition to a lot of automatic formatting and positioning, the Viz class also provides mouse events and tooltips.

```js
var data = [
  {id: "alpha", x: 4, y: 7},
  {id: "beta", x: 5, y: 2},
  {id: "gamma", x: 6, y: 13}
];
```

Given some data points, we can create a scatter plot very easily:

```js
new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .render();
```


[Click here](https://d3plus.org/examples/d3plus-plot/getting-started/) to view this example live on the web.

[![Getting Started](/example/getting-started.png)](https://d3plus.org/examples/d3plus-plot/getting-started/)





## API Reference
<a name="Plot"></a>

### Plot ⇐ <code>Viz</code>
**Kind**: global class  
**Extends:** <code>Viz</code>  

* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.x([*value*])](#Plot.x)
    * [.y([*value*])](#Plot.y)

<a name="new_Plot_new"></a>

#### new Plot()
Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.

<a name="Plot.x"></a>

#### Plot.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Plot.y"></a>

#### Plot.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Plot](#Plot)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 



###### <sub>Documentation generated on Fri, 19 Aug 2016 02:57:36 GMT</sub>
