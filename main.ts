#!/usr/bin/env -S deno run --allow-net

import { green, red, yellow } from "https://deno.land/std@0.99.0/fmt/colors.ts";

const kodbox_uri = "https://api.kodcloud.com/?app%2Fversion";

enum Mode {
  object = "object",
  regexp = "regexp",
}

interface Options {
  object: any;
  regexp?: RegExp;
}

function utils() {}

utils.depthOf = function (object: any) { 
  let level = 1;
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] == "object") {
      let depth = utils.depthOf(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }
  return level;
};

utils.queryValue = function(object: any, key: any) {
  let depth = 0;
  for (const key in object) {
    if (!object.hasOwnProperty(key)){
      return object[key];
    };

    if (typeof object[key] == "object") {
      let depth = utils.depthOf(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }
}
// , mode: Mode, options: Options
async function get_origin(uri: string, mode: string, options: Options) {
  // const result = [{ a: 'a'}];
  // console.log(typeof result[0].a)

  if (mode === Mode.object) {
    const queryDepth = options.object.length;

    const res = await fetch(uri);
    if (res.ok) {
      const resObj = await res.json();
      const resDepth = utils.depthOf(resObj);
      const key = options.object
      if (true) {
        let result = utils.queryValue(resObj,key)
        console.log(green("Result: Success"), '\n', result);
      }
    } else {
      const err = await res.text();
      console.error(red("Result: Failure"), '\n', err);
    }
  }
}

let object = ['data','server','version']
  
get_origin(kodbox_uri, "object", { object });
