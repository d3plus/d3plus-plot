import assert from "assert";
import {default as Viz} from "../src/Plot.js";
import it from "./jsdom.js";

it("Viz", function *() {

  yield cb => {

    new Viz().render(cb);

  };

  assert.strictEqual(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
  assert.strictEqual(document.getElementsByClassName("d3plus-Viz").length, 1, "created <g> container element");

});