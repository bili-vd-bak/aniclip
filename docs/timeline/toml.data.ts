import fs from "fs-extra";
import * as toml from "@std/toml";
import { defineLoader } from "vitepress";
import path from "path";

import typeTrans from "../utils/typeTrans";
import validName from "../utils/get-valid-name";
import ssRealGen from "../utils/ss-real-gen";
import ffmpegCommandGen from "../utils/ffmpeg-command-gen";
import rootDir from "app-root-path";
import { timeGetter, Data as Time } from "../time.data";

const times = await timeGetter();

type t = "v_l" | "v_c" | "s_l" | "s_c" | "s_e" | "a_l";

interface Ep {
  type: t; //删减类型
  ss: string; //开始时刻
  t?: string; //持续时间
  tips?: string; //提示
  source?: string; //删减来源
  clip?: string; //删减片段视频链接
}

interface List_gen {
  集数: string;
  source?: string;
  来源?: string;
  "删减位置(删减视频)": string;
  "删减位置(完整视频)": string;
  删减类型: string;
  "删减长度(秒)"?: string;
  观看删减片段?: string;
  "贡献片段截取(FFMpeg)"?: string;
  提示?: string;
}

interface Ss {
  title?: string;
  tips?: string;
  cover?: string;
  [key: string]: Ep[] | string | undefined;
}

export interface Data {
  title?: string;
  tips?: string;
  cover?: string;
  list: { [key: string]: Ep[] | string | undefined };
  list_gen?: { [key: string]: List_gen[] };
}

export interface NewData {
  time: Time;
  data: {
    [key: string]: Data[];
  };
}

declare const data: NewData;
export { data };

export default defineLoader({
  watch: ["../../src/timeline/*.toml", "../../src/AutoSyncLatest/*.toml"],
  load(watchedFiles) {
    // watchFiles 是一个所匹配文件的绝对路径的数组。
    // 生成一个博客文章元数据数组
    // 可用于在主题布局中呈现列表。
    const list: { [key: string]: Data[] } = {};
    watchedFiles.reverse().forEach((file) => {
      const [time, title] = path.basename(file, ".toml").split("|");
      const toml_raw = toml.parse(
        fs.readFileSync(file, "utf-8")
      ) as unknown as Ss;
      !list[time] ? (list[time] = []) : "";
      const tmp: { [key: string]: Ep[] | string | undefined } = {};
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
    const gened_data = preGen(list);
    preGen2File(gened_data);
    return gened_data;
  },
});

// const isASL = (set_time: string) =>
//   set_time === "自动同步最新" ||
//   set_time === "ASL" ||
//   set_time === "AutoSyncLatest";

/**
 * 获取视频源
 * @param {string} source
 */
function genSource(source: string) {
  if (!source) return "未知";
  const host = new URL(source).hostname;
  if (host.match("b23") || host.match("bili")) return "B站";
  else if (host.match("iqy")) return "爱奇艺";
  else if (host.match("qq.com")) return "腾讯";
  else return source;
}

/**
 * Clip模板
 * @param {string} clip
 * @param {string} time
 * @param {string} title
 * @param {string} ep
 * @param {string} ss
 */
function genClip(
  clip: string,
  time: string,
  title: string,
  ep: string,
  ss: string
) {
  if (!clip) return "#";
  else
    return clip.replaceAll(
      "TP-main::",
      `https://alist.xrzyun.eu.org/aniclip-upload/${time}/${title}/${ep}/${validName(
        `${ep}-${ss}`
      )}.mp4`
    );
}

export function preGen(list: { [key: string]: Data[] }) {
  let dts = {},
    derr = {},
    dts2 = {},
    derr2 = {};
  for (const [time, ss] of Object.entries(list)) {
    ss.forEach((ani, index) => {
      list[time][index].list_gen = {};
      for (const [ep, clips] of Object.entries(ani.list)) {
        (clips as Ep[]).forEach((clip) => {
          if (!list[time][index].list_gen[ep])
            list[time][index].list_gen[ep] = [];
          list[time][index].list_gen[ep].push({
            集数: ep as unknown as string,
            source: clip.source,
            来源: genSource(clip.source),
            "删减位置(删减视频)": clip.ss,
            "删减位置(完整视频)": ssRealGen(
              clip.ss,
              clip.t,
              time,
              ani.title,
              ep,
              clip.type,
              clip.source,
              dts,
              derr
            ),
            删减类型: typeTrans(clip.type),
            "删减长度(秒)": clip.t,
            观看删减片段: clip.clip
              ? genClip(
                  clip.clip,
                  time,
                  ani.title,
                  ep as unknown as string,
                  clip.ss
                )
              : "",
            "贡献片段截取(FFMpeg)": ffmpegCommandGen(
              clip.ss,
              clip.t,
              time,
              ani.title,
              ep as unknown as string,
              clip.type,
              clip.source,
              dts2,
              derr2
            ),
            提示: clip.tips,
          });
        });
      }
    });
  }
  return { times, data: list };
}

function preGen2File(gened_data: { data: { [key: string]: Data[] } }) {
  const gened_list = gened_data.data;
  // fs.writeJsonSync(path.resolve(rootDir.path, "src/data.json"), preGen(gened_list));
  fs.mkdirpSync(path.resolve(rootDir.path, "docs/public"));
  fs.writeJsonSync(
    path.resolve(rootDir.path, "docs/public/data.json"),
    gened_data
  );
  fs.removeSync(path.resolve(rootDir.path, "docs/public/timeline"));
  fs.mkdirpSync(path.resolve(rootDir.path, "docs/public/timeline"));
  for (const [time, ss] of Object.entries(gened_list)) {
    fs.writeJsonSync(
      path.resolve(rootDir.path, `docs/public/timeline/${time}.json`),
      { times, data: { [time]: ss } }
    );
  }
  fs.copySync(
    path.resolve(rootDir.path, "docs/public/timeline/AutoSyncLatest.json"),
    path.resolve(rootDir.path, "docs/public/timeline/ASL.json")
  );
}
