<template>
  <code>{{ cGen(ss, t, time, title, ep, type, source, dts, derr) }}</code>
  <!-- <code v-show="!show" @click="show = !show">显示</code> -->
</template>

<script setup>
import TimeFormat from "hh-mm-ss";
// import { ref } from "vue";

// const show = ref(true);

defineProps([
  "ss",
  "t",
  "time",
  "title",
  "ep",
  "type",
  "source",
  "dts",
  "derr",
]);

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
function cGen(ss, t, time, title, ep, type, source, dts, derr) {
  // console.log(typeof ss, ss);
  // console.log(TimeFormat.toS(ss));
  // console.log(typeof t, t, !t, !Number(t));
  // console.log(ss, t, time, title, ep);
  try {
    if (!t) t = 0;
    else if (!Number(t)) t = TimeFormat.toS(t);
    // console.log(typeof t, t);
    // console.log(TimeFormat.toS(t));
    const id = `${time}|${title}|${ep}|${source}`;
    if (!dts[id]) dts[id] = 0;
    if (!derr[id]) derr[id] = false;
    const c = `ffmpeg -ss ${TimeFormat.fromS(
      TimeFormat.toS(ss) + dts[id] - 5
    )} -i "{视频路径或链接}" -t ${TimeFormat.fromS(
      Number(t) + 10
    )} -c copy "./${ep}-${ss}.mp4"`;
    if (type.match("_l") || type.match("丢失")) dts[id] += Number(t);
    return c;
  } catch (error) {
    console.error(error);
  }
  return "解析失败";
}
</script>

<style></style>
