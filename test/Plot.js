import {test} from "tape";
import {default as Plot} from "../src/Plot.js";

test("Plot", assert => {

  new Plot()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
