import fs from "fs-extra";
import path from "path";

const tls: string[] = [];
fs.readdirSync("src/timeline").forEach((fn) => {
  fn = path.basename(fn, ".toml").split("|")[0];
  tls.includes(fn) ? "" : tls.push(fn);
});
const timeline = tls
  .map((tl) => {
    return {
      text: tl,
      link: "/timeline/" + tl,
    };
  })
  .reverse();
// console.log(timeline);

export default [
  {
    text: "主页",
    link: "/",
  },
  {
    text: "时间线",
    items: [{ text: "合集", link: "/timeline" }, ...timeline],
  },
];
