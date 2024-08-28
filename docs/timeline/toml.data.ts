import fs from "fs-extra";
import * as toml from "@std/toml";
import { defineLoader } from "vitepress";
import path from "path";

import typeTrans from "../utils/typeTrans";
import validName from "../utils/get-valid-name";
import ssRealGen from "../utils/ss-real-gen";
import ffmpegCommandGen from "../utils/ffmpeg-command-gen";
import rootDir from "app-root-path";
import { timeGetter, type Data as Time } from "../time.data";

import { Feed } from "feed";
import {
  title,
  description,
  copyright,
  baseUrl,
} from "../.vitepress/config.mjs";
import { getGitTimestamp } from "../utils/get-git-timestamp";

import { isASL, epGen, genSource, genClip } from "../utils/common";
import { timeline } from "../.vitepress/sidebar.mts";

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

interface Data {
  title?: string;
  tips?: string;
  cover?: string;
  list: { [key: string]: Ep[] | string | undefined };
  list_gen?: { [key: string]: List_gen[] };
  list_gen_text?: { [key: string]: string };
  mtime: Date | number;
  btime: Date | number;
  feed?: Feed;
}

interface NewData {
  times: Time;
  data: {
    [key: string]: Data[];
  };
  feed: Feed;
}

declare const data: NewData;
export { data, isASL, type Data, type NewData };

export default defineLoader({
  watch: ["../../src/timeline/*.toml", "../../src/AutoSyncLatest/*.toml"],
  async load(watchedFiles) {
    // watchFiles 是一个所匹配文件的绝对路径的数组。
    // 生成一个博客文章元数据数组
    // 可用于在主题布局中呈现列表。
    const list: { [key: string]: Data[] } = {};
    for (const file of watchedFiles.reverse()) {
      const gt = await getGitTimestamp(file);
      const mtime = new Date(gt[1]),
        btime = new Date(gt[0]);
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
        mtime,
        btime,
      });
    }
    const gened_data = preGen(list);
    preGen2File(gened_data);
    return gened_data;
  },
});

const feed_template = {
  title,
  description,
  id: baseUrl,
  link: baseUrl,
  language: "zh", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: `${baseUrl}/logo.png`,
  favicon: `${baseUrl}/logo.png`,
  copyright,
  updated: times.src_update, // optional, default = today
  generator: "AniClip", // optional, default = 'Feed for Node.js'
  feedLinks: {
    // json: `${baseUrl}/feed.json`,
    atom: `${baseUrl}/atom.xml`,
  },
  author: {
    name: "bili-vd-bak Team",
    email: "aniclip@xrzyun.eu.org",
    link: "https://www.xrzyun.eu.org/",
  },
};

function preGen(list: { [key: string]: Data[] }): NewData {
  const dts = {},
    derr = {},
    dts2 = {},
    derr2 = {};
  const feed = new Feed({
    ...feed_template,
    title: feed_template.title + " - 季度订阅",
  });
  feed.addCategory("anime");
  for (const [time, ss] of Object.entries(list)) {
    ss.forEach((ani, index) => {
      list[time][index].list_gen = {};
      list[time][index].list_gen_text = {};
      const link = `${baseUrl}/${
        (isASL(time) ? "ASL" : "timeline/" + time) +
        "#" +
        validName(ani.title).replaceAll(" ", "-")
      }`;
      const feed_bgm = new Feed({
        ...feed_template,
        title: feed_template.title + " - " + ani.title,
      });
      feed_bgm.addCategory("anime");
      for (const [ep, clips] of Object.entries(ani.list)) {
        (clips as Ep[]).forEach((clip) => {
          if (!list[time][index].list_gen[ep])
            list[time][index].list_gen[ep] = [];
          if (!list[time][index].list_gen_text[ep])
            list[time][index].list_gen_text[ep] = `<h5>${epGen(ep)}</h5><br/>
          来源 删减位置(删减视频) 删减位置(完整视频) 删减类型 删减长度(秒) AniClip片段截取<br>\n`;
          const to_push_data = {
            集数: ep + "",
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
          };
          list[time][index].list_gen[ep].push(to_push_data);
          list[time][index].list_gen_text[ep] +=
            to_push_data.来源 +
            "  " +
            to_push_data["删减位置(删减视频)"] +
            "            " +
            to_push_data["删减位置(完整视频)"] +
            "          " +
            to_push_data.删减类型 +
            "   " +
            (to_push_data["删减长度(秒)"]
              ? to_push_data["删减长度(秒)"] + "s"
              : "--") +
            "             " +
            (to_push_data.观看删减片段 ? "有" : "无") +
            `<br>\n`;
        });
        list[time][index].list_gen_text[ep] + `共计${clips.length}处删减/修改`;
        feed_bgm.addItem({
          title: `AniClip | ${ani.title} | ${epGen(ep)}`,
          link,
          date: new Date(ani.mtime),
          description: `共计${clips.length}处删减/修改`,
          content: list[time][index].list_gen_text[ep],
        });
      }
      if (
        new Date(ani.mtime).getTime() >=
        new Date().setMonth(new Date().getMonth() - 3)
      )
        feed.addItem({
          title: `AniClip | ${ani.title}`,
          // id: link,
          link,
          description: `发现新的删减/修改`,
          content: feed_bgm.items.map((it) => it.content).join(`<br>\n`),
          date: new Date(ani.mtime),
        });
      list[time][index].feed = { ...feed_bgm, items: feed_bgm.items.reverse() };
    });
  }
  return { times, data: list, feed };
}

function preGen2File(gened_data: NewData) {
  const gened_list = gened_data.data;
  const summary_data = {};
  timeline.forEach(({ text }) => (summary_data[text] = null));
  fs.mkdirpSync(path.resolve(rootDir.path, "docs/public"));
  fs.writeJsonSync(path.resolve(rootDir.path, "docs/public/data.json"), {
    times: gened_data.times,
    data: summary_data,
  });
  fs.removeSync(path.resolve(rootDir.path, "docs/public/timeline"));
  fs.mkdirpSync(path.resolve(rootDir.path, "docs/public/timeline"));
  for (const [time, ss] of Object.entries(gened_list)) {
    fs.mkdirpSync(path.resolve(rootDir.path, "docs/public/timeline", time));
    fs.writeJsonSync(
      path.resolve(rootDir.path, `docs/public/timeline/${time}.json`),
      { times, data: { [time]: { ...ss, feed: undefined } } }
    );
    ss.forEach((ani) => {
      fs.writeFileSync(
        path.resolve(
          rootDir.path,
          `docs/public/timeline/${time}/${validName(ani.title)}.xml`
        ),
        ani.feed.atom1()
      );
    });
  }
  if (
    fs.existsSync(
      path.resolve(rootDir.path, "docs/public/timeline/AutoSyncLatest.json")
    )
  )
    fs.copyFileSync(
      path.resolve(rootDir.path, "docs/public/timeline/AutoSyncLatest.json"),
      path.resolve(rootDir.path, "docs/public/timeline/ASL.json")
    );
  fs.writeFileSync(
    path.resolve(rootDir.path, "docs/public/atom.xml"),
    gened_data.feed.atom1()
  );
}
