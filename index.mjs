import fetch from "node-fetch";
// import http = require("http");
// import https = require("https");

// "use strict";

let debug = false;

function queryObject(object, keys, current, next) {
  if (typeof object[keys[current]] === "object") {
    return queryObject(object[keys[current]], keys, next, next + 1);
  }
  return object[keys[current]];
}

function MaybeJsonType(o){
  if (typeof o === "object"){
    return JSON.stringify(o)
  }
  return o
}

function queryObject2(object, keys, current) {
  if (current < (keys.length - 1)) {
    return queryObject2(object[keys[current]], keys, current + 1);
  }
  return MaybeJsonType(object[keys[current]]);
}

export async function getOrigin(origin, mode, options, debug) {
  const uri = new URL(origin);
  const response = await fetch(uri);

  if (mode === "json") {
    const resObj = await response.json();
    if (debug === true) console.log("![response]: \n", resObj);
    const result = queryObject2(resObj, options, 0);
    if (debug === true) console.log("![result]: \n", result);
    return result;
  } else if (mode === "regexp") {
    const resText = await response.text();
    if (debug === true) console.log("![response]: \n", resText);
    const result = resText.match(options);
    if (debug === true) console.log("![result]: \n", result);
    return result;
  }
  console.error("![error]: mode not defined");
  return undefined;
}

export async function getTarget(targetBase, version, debug) {
  const uri = new URL(targetBase + version);
  if (debug === true) console.log("![uri]: \n", uri);
  const response = await fetch(uri);
  const resText = await response.text();
  if (debug === true) console.log("![response]: \n", resText);
  const status = response.status;
  if (debug === true) console.log("![status]: \n", status);
  if (status === 200) {
    return true;
  } else if (status === 404) {
    return false;
  }
  return undefined;
}

function getOrigin_1(origin, mode, options, debug) {
  const uri = new URL(origin)
  if (uri.protocol === "http") {
    http.get(uri)
  } else if (uri.protocol === "https") {
    https.get(uri)
  }
}
