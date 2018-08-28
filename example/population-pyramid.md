# Population Pyramid Chart

```js
var data = [
  { y: "0 - 18", x: 18, sex: "male" },
  { y: "0 - 18", x: 19, sex: "female" },
  { y: "19 - 40", x: 15, sex: "male" },
  { y: "19 - 40", x: 17, sex: "female" },
  { y: "41 - 60", x: 10, sex: "male" },
  { y: "41 - 60", x: 12, sex: "female" }
];

new d3plus.Pyramid()
  .data(data)
  .groupBy(["sex"])
  .render();
```
