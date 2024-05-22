<template>
  <code v-if="show" @click="show = !show">{{
    cGen(ss, t, time, title, ep)
  }}</code>
  <code v-else @click="show = !show">显示</code>
</template>

<script setup>
import TimeFormat from "hh-mm-ss";
import { ref } from "vue";

const show = ref(false);

defineProps(["ss", "t", "time", "title", "ep"]);

let dts = {};

/**
 * ffmpeg命令生成
 * @param {string} ss 开始时刻
 * @param {string} t 时长
 * @param {string} time 番剧时间(季度)
 * @param {string} title 番剧标题
 * @param {string} ep 集数
 */
function cGen(ss, t, time, title, ep) {
  // console.log(typeof ss, ss);
  // console.log(TimeFormat.toS(ss));
  // console.log(typeof t, t, !t, !Number(t));
  // console.log(ss, t, time, title, ep);
  try {
    if (!t) t = 0;
    else if (!Number(t)) t = TimeFormat.toS(t);
    // console.log(typeof t, t);
    // console.log(TimeFormat.toS(t));
    const id = `${time}|${title}`;
    if (!dts[id]) dts[id] = 0;
    const c = `ffmpeg -ss ${TimeFormat.fromS(
      TimeFormat.toS(ss) + dts[id] - 5
    )} -i "{视频(path/url)}" -t ${TimeFormat.fromS(
      Number(t) + 10
    )} -c copy "./${id}/${ep}-${ss}.mp4"`;
    dts[id] += Number(t);
    return c;
  } catch (error) {
    console.error(error);
  }
  return "解析失败";
}

/**
 * 去除文件名中的非法字符
 * @param {string} input 原文件名
 * @param [re="_"] 替换值
 * @param [filterSlash=false] 是否替换斜杠
 */
function getValidFileName(input, re = "_", filterSlash = false) {
  let title = input;
  const InvalidChars = [
    34, 60, 62, 124, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 58, 42, 63, 92,
    47,
  ].map((charCode) => String.fromCharCode(charCode));
  for (const invalidChar of InvalidChars) {
    title = title.replaceAll(invalidChar, re);
  }
  if (filterSlash) {
    title = title.replaceAll("/", re);
    title = title.replaceAll("\\", re);
  }
  return title;
}
</script>

<style></style>
