import TimeFormat from "hh-mm-ss";
import validName from "./get-valid-name.ts";

/**
 * ffmpeg命令生成
 * @param {string} ss 开始时刻
 * @param {string} t 时长
 * @param {string} time 番剧时间(季度)
 * @param {string} title 番剧标题
 * @param {string} ep 集数
 * @param {string} type 删减类型
 * @param {string} source 来源
 */
export default function cGen(
  ss: string,
  t: string | number,
  time: string,
  title: string,
  ep: string,
  type: string,
  source: string,
  dts: { [x: string]: number },
  derr: { [x: string]: boolean }
) {
  // console.log(typeof ss, ss);
  // console.log(TimeFormat.toS(ss));
  // console.log(typeof t, t, !t, !Number(t));
  // console.log(ss, t, time, title, ep);
  try {
    if (!t) t = 0;
    else if (!Number(t) && Number(t) !== 0) t = TimeFormat.toS(t as string);
    // console.log(typeof t, t);
    // console.log(TimeFormat.toS(t));
    const offset = type.includes("nr") ? 12 : 7;
    const id = `${time}|${title}|${ep}|${source}`;
    if (!dts[id]) dts[id] = 0;
    if (!derr[id]) derr[id] = false;
    const c = `ffmpeg -ss ${TimeFormat.fromS(
      TimeFormat.toS(ss) + dts[id] - offset
    )} -i ${"$"}{视频路径或链接} -t ${TimeFormat.fromS(
      Number(t) + offset * 2
    )} -c copy "./${validName(`${ep}-${ss}`)}.mp4"`;
    if (type.match("_l") || type.match("丢失")) dts[id] += Number(t);
    return c;
  } catch (error) {
    console.error(error);
  }
  return "解析失败";
}
