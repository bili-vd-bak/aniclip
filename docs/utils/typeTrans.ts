export default function typeTrans(type: t) {
  return type
    .trim()
    .replaceAll("v_", "画面")
    .replaceAll("s_", "字幕")
    .replaceAll("a_", "音频")
    .replaceAll("l", "丢失")
    .replaceAll("c", "和谐")
    .replaceAll("e", "(翻译)错误");
}

type t = "v_l" | "v_c" | "s_l" | "s_c" | "s_e" | "a_l";
