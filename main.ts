#!/usr/bin/env -S deno run --allow-net

import {
  blue,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.99.0/fmt/colors.ts";

const kodbox_uri = "https://api.kodcloud.com/?app%2Fversion";

enum Mode {
  object,
  regexp
}

interface Options {
  object: Array<string>;
  regexp?: RegExp;
}

// , mode: Mode, options: Options
async function get_origin(uri: string, options: Options) {
  const res = await fetch(uri);

  if (res.ok) {
    const resObj = await res.json();
    console.log(green("Success"));
    console.log(resObj[options.object[0]]);
  } else {
    const err = await res.text();
    console.error(red("Failure to GET\n"), err);
  }
}

get_origin(kodbox_uri, {object: ['data', 'server', 'version']});
