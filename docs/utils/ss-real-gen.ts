import TimeFormat from "hh-mm-ss";

export default function ssGen_dts(
  ss: string,
  t: string | number,
  time: any,
  title: any,
  ep: any,
  type: string,
  source: any,
  dts: { [x: string]: number },
  derr: { [x: string]: boolean }
) {
  const id = `${time}|${title}|${ep}|${source}`;
  try {
    if (!t) t = 0;
    else if (!Number(t) && Number(t) !== 0) t = TimeFormat.toS(t as string);
    if (!dts[id]) dts[id] = 0;
    if (!derr[id]) derr[id] = false;
    const t_ret = TimeFormat.fromS(TimeFormat.toS(ss) + dts[id]);
    if (type.match("_l") || type.match("丢失")) dts[id] += Number(t);
    return t_ret + (derr[id] ? "(可能有误)" : "");
  } catch (error) {
    derr[id] = true;
    console.error(error);
  }
  return "非法格式，此行数据可能有误";
}
