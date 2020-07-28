# Returning Config based on Loaded Data

When loading [data](http://d3plus.org/docs/#Viz.data) from a URL, it's often the case that certain config options need to set dependent on the structure of the data that is loaded. The callback function (which receives the response) has the ability to return an Object with custom [config](http://d3plus.org/docs/#BaseClass.config) parameters that can be directly impacted by the data returned from the loaded URL.

```js
var url = "https://datausa.io/api/data?measures=Total Population&drilldowns=Industry Sector&year=latest";

new d3plus.BarChart()
  .data(url, function(response) {

    var sortedData = response.data
      .sort(function(a, b) {
        return b["Total Population"] - a["Total Population"];
      });

    var largest = sortedData[0];
    var xMax = Math.max(largest["Total Population"], 50000000);

    var titleLine1 = "Largest Industry: " + largest["Industry Sector"];
    var titleLine2 = sortedData.length + " Total Industry Sectors";

    return {
      data: sortedData,
      shapeConfig: {
        fill: function(d) {
          return d["ID Industry Sector"] === largest["ID Industry Sector"] ? "#ef6145" : "#b8c0d4";
        }
      },
      title: titleLine1 + "\n" + titleLine2,
      xConfig: {
        domain: [0, xMax]
      }
    };

  })
  .config({
    discrete: "y",
    groupBy: "Industry Sector",
    legend: false,
    shapeConfig: {
      label: false
    },
    tooltipConfig: {
      tbody: [
        ["Total", function(d) { return d["Total Population"] }]
      ]
    },
    x: "Total Population",
    y: "Industry Sector",
    yConfig: {
      maxSize: 150
    },
    ySort: function(a, b) {
      return a["Total Population"] - b["Total Population"];
    }
  })
  .render();
```
