import validName from "./get-valid-name";

const isASL = (set_time: string | number) =>
  set_time === "自动同步最新" ||
  set_time === "ASL" ||
  set_time === "AutoSyncLatest";

const epGen = (ep: string | number) => (Number(ep) ? `第${ep}集` : ep + "");

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

function DlLink(link: string, name?: string) {
  const a = document.createElement("a");
  a.href = link;
  a.download = name || "AniClip.png";
  a.click();
  a.remove();
}

export { isASL, epGen, genSource, genClip, DlLink };
