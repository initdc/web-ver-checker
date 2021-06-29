#!/usr/bin/env -S deno run --allow-net

import {
  blue,
  green,
  red,
  yellow,
} from "https://deno.land/std@0.99.0/fmt/colors.ts";

// async function get_origin() {
const res = await fetch("https://api.kodcloud.com/?app%2Fversion");

if (res.ok) {
  const resObj = await res.json();
  console.log(green("Success"));
  console.log(resObj.data.server.version);
} else {
  const err = await res.text();
  console.error("Failure to GET", err);
}
// }

// get_origin
