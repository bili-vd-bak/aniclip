import fs from "fs-extra";
import path from "path";
import rootDir from "app-root-path";

const tls: string[] = [];
fs.readdirSync(path.resolve(rootDir.path, "src/timeline")).forEach((fn) => {
  fn = path.basename(fn, ".toml").split("|")[0];
  tls.includes(fn) ? "" : tls.push(fn);
});
export const timeline = tls
  .map((tl) => {
    return {
      text: tl,
      link: "/timeline/" + tl,
    };
  })
  .reverse();

export default [
  {
    text: "主页",
    link: "/",
  },
  {
    text: "贡献指南",
    link: "/contribute",
  },
  {
    text: "数据转换工具(可视化编辑器)",
    link: "/liveditor",
  },
  {
    text: "时间线",
    items: [
      {
        text: "最新(自动同步hzj.wiki)",
        link: "/ASL",
      },
      { text: "速览(全部收录番剧)", link: "/timeline" },
      ...timeline,
    ],
    collapsed: false,
  },
];
