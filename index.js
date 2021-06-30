import fetch from "node-fetch";

let debug = false;

function queryObject(object, keys, current, next) {
  if (typeof object[keys[current]] === "object") {
    return queryObject(object[keys[current]], keys, next, next + 1);
  }
  return object[keys[current]];
}

export async function getOrigin(origin, mode, options, debug) {
  const uri = new URL(origin);
  const response = await fetch(uri);

  if (mode === "json") {
    const resObj = await response.json();
    if (debug === true) console.log("![response]: \n", resObj);
    const result = queryObject(resObj, options, 0, 1);
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
