import zora from "zora";
import {default as Plot} from "../src/Plot.js";

export default zora()
  .test("Plot", function *(assert) {

    yield cb => new Plot().render(cb);
    assert.ok(true, "function success");

  });
