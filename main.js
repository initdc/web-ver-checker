import { getOrigin, getTarget } from "./index.js";

const version = await getOrigin(
  "https://api.kodcloud.com/?app%2Fversion",
  "json",
  ["data", "server", "version"]
);

// const regexp = /(version.+)/g;
// getOrigin("https://api.kodcloud.com/?app%2Fversion", "regexp", regexp, true);

const tagExist = await getTarget(
  "https://api.github.com/repos/pliplive/kodbox/git/refs/tags/",
  version,
  true
);

if (tagExist !== undefined) {
  if (tagExist === true) {
    console.log("Kodbox alraady up to date");
  } else if (tagExist === false) {
    exec("ls -a");
  }
}
