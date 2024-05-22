import fs from "fs-extra";
import path from "path";
// import { data as ani } from "./toml.data.ts";

export default {
  paths() {
    const tls: string[] = [];
    fs.readdirSync("src/timeline").forEach((fn) => {
      fn = path.basename(fn, ".toml").split("|")[0];
      tls.includes(fn) ? "" : tls.push(fn);
    });
    return tls.map((tl) => {
      return {
        params: {
          timeline: tl,
        },
      };
    });
  },
};
