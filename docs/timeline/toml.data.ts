import fs from "fs-extra";
import * as toml from "@std/toml";
import { defineLoader } from "vitepress";
import path from "path";

type t = "v_l" | "v_c" | "s_l" | "s_c" | "s_e" | "a_l";

interface ep {
  type: t; //删减类型
  ss: string; //开始时刻
  t?: string; //持续时间
  tips?: string; //提示
  source?: string; //删减来源
  clip?: string; //删减片段视频链接
}

interface ss {
  title?: string;
  tips?: string;
  cover?: string;
  [key: string]: ep | string | undefined;
}

export interface Data {
  title?: string;
  tips?: string;
  cover?: string;
  list: { [key: string]: ep | string | undefined };
}

declare const data: Data;
export { data };

export default defineLoader({
  watch: ["../../src/timeline/*.toml"],
  load(watchedFiles) {
    // watchFiles 是一个所匹配文件的绝对路径的数组。
    // 生成一个博客文章元数据数组
    // 可用于在主题布局中呈现列表。
    const list: { [key: string]: Data[] } = {};
    watchedFiles.reverse().forEach((file) => {
      const [time, title] = path.basename(file, ".toml").split("|");
      const toml_raw = toml.parse(
        fs.readFileSync(file, "utf-8")
      ) as unknown as ss;
      !list[time] ? (list[time] = []) : "";
      let tmp: { [key: string]: ep | string | undefined } = {};
      for (const [k, v] of Object.entries(toml_raw)) {
        if (k !== "title" && k !== "tips" && k !== "cover") tmp[k] = v;
      }
      list[time].push({
        title: toml_raw.title || title,
        tips: toml_raw.tips,
        cover: toml_raw.cover,
        list: tmp,
      });
    });
    return list;
  },
});
