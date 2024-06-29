<template>
  <div
    :data-theme="isDark ? 'dark' : 'light'"
    class="lg:grid lg:grid-cols-2 lg:gap-4"
  >
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">集数:</span>
      </div>
      <input
        type="text"
        v-model="ep"
        placeholder="ep"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
    <div class="ds-join ds-join-vertical">
      <select
        v-model="type"
        class="ds-select ds-select-bordered ds-join-item flex"
      >
        <option disabled value="">
          删减类型(选择)：请选择一个(多选请手动编辑)
        </option>
        <option value="v_l">画面丢失 -> v_l</option>
        <option value="v_c">画面和谐 -> v_c</option>
        <option value="s_l">字幕丢失 -> s_l</option>
        <option value="s_c">字幕和谐 -> s_c</option>
        <option value="s_e">字幕(翻译)错误 -> s_e</option>
        <option value="a_l">音频丢失 -> a_l</option>
      </select>
      <label class="ds-form-control w-full max-w-xs">
        <div class="ds-label">
          <span class="ds-label-text">删减类型(手动填写):</span>
        </div>
        <input
          type="text"
          v-model="type"
          placeholder="type 空格分割 可输中文"
          class="ds-input ds-input-bordered ds-join-item flex items-center"
        />
      </label>
    </div>
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">删减起始时刻:</span>
      </div>
      <input
        type="text"
        v-model="ss"
        placeholder="ss hh:mm:ss"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">删减持续时长:</span>
        <span class="ds-label-text-alt">
          <span class="ds-badge ds-badge-accent">可选</span></span
        >
      </div>
      <input
        type="text"
        v-model="t"
        placeholder="t hh:mm:ss 或 num(s)"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">问题视频链接:</span>
        <span class="ds-label-text-alt">
          <span class="ds-badge ds-badge-accent">可选</span></span
        >
      </div>
      <input
        type="text"
        v-model="source"
        placeholder="source (url) e.g. https://b23.tv/epxxx"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">提示:</span>
        <span class="ds-label-text-alt">
          <span class="ds-badge ds-badge-accent">可选</span></span
        >
      </div>
      <input
        type="text"
        v-model="tips"
        placeholder="tips"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
    <label class="ds-form-control w-full max-w-xs">
      <div class="ds-label">
        <span class="ds-label-text">删减片段视频链接(可观看):</span>
        <span class="ds-label-text-alt">
          <span class="ds-badge ds-badge-accent">可选</span></span
        >
      </div>
      <input
        type="text"
        v-model="clip"
        placeholder="clip (url)"
        class="ds-input ds-input-bordered w-full max-w-xs"
      />
    </label>
  </div>
  <br />
  <div class="language-toml vp-adaptive-theme line-numbers-mode">
    <button title="Copy Code" class="copy"></button
    ><span class="lang">toml</span>
    <pre
      class="shiki shiki-themes github-light github-dark vp-code"
      tabindex="0"
    ><code><span :class="ep?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">{{ Number(ep) ? ep : `"${ep}"` }}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]</span></span>
<span :class="type?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ cType(type) }}"</span></span>
<span :class="cSS(ss,true)?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ss = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ cSS(ss) }}"</span></span>
<span :class="cT(t,true)?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ cT(t) }}"</span><!--<span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 此行可不填</span>--></span>
<span :class="source.match(m_url)?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">source = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ source }}"</span></span>
<span :class="tips?'line diff add':'line'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tips = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ tips }}"</span><!--<span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 此行可不填</span>--></span> 
<span :class="clip===''?'line diff add':clip.match(m_url)?'line diff add':'line highlighted error'"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">clip = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">"{{ clip }}"</span><!---<span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 此行可不填</span>--></span></code></pre>
    <div class="line-numbers-wrapper" aria-hidden="true">
      <span class="line-number">1</span><br /><span class="line-number">2</span
      ><br /><span class="line-number">3</span><br /><span class="line-number"
        >4</span
      ><br /><span class="line-number">5</span><br /><span class="line-number"
        >6</span
      ><br /><span class="line-number">7</span><br />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeFormat from "hh-mm-ss";
import { ref } from "vue";
import { useData } from "vitepress";

const { isDark } = useData();

const ep = ref();
const type = ref("");
const ss = ref();
const t = ref();
const source = ref("");
const tips = ref();
const clip = ref("");

const m_url =
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/g;

const cType = (type: string) =>
  type
    .replaceAll("画面", "v_")
    .replaceAll("字幕", "s_")
    .replaceAll("音频", "a_")
    .replaceAll("丢失", "l") // 存在hzj.wiki错别字现象："丟失"
    .replaceAll("和谐", "c")
    .replaceAll("(翻译)错误", "e");

function cSS(ss: any, c = false) {
  if (typeof ss === "string") ss = ss.replaceAll("：", ":");
  try {
    TimeFormat.toMs(ss);
  } catch (error) {
    if (c) return false;
    return "格式错误，按照FFMpeg格式 hh:mm:ss";
  }
  return ss;
}
function cT(t: any, c = false) {
  if (!t)
    if (c) {
      return true;
    } else return "";
  if (Number(t)) return t;
  else if (typeof t === "string") t = t.replaceAll("：", ":");
  try {
    TimeFormat.toMs(t);
  } catch (error) {
    if (c) return false;
    return "格式错误，按照FFMpeg格式 hh:mm:ss 或 直接填写秒数";
  }
  return t;
}

// interface RestaurantItem {
//   value: string;
//   link: string;
// }
// const restaurants = ref<RestaurantItem[]>([]);
// const querySearch = (queryString: string, cb: any) => {
//   const results = queryString
//     ? restaurants.value.filter(createFilter(queryString))
//     : restaurants.value;
// call callback function to return suggestions
//   cb(results);
// };
// const createFilter = (queryString: string) => {
//   return (restaurant: RestaurantItem) => {
//     return (
//       restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
//     );
//   };
// };
// const loadAll = () => {
//   return [
//     { value: "v_l", link: "画面丢失" },
//     { value: "v_c", link: "画面和谐" },
//     { value: "s_l", link: "字幕丢失" },
//     { value: "s_c", link: "字幕和谐" },
//     { value: "s_e", link: "字幕(翻译)错误" },
//     { value: "a_l", link: "音频丢失" },
//   ];
// };

// const handleSelect = (item: RestaurantItem) => {
//   console.log(item);
// };
// restaurants.value = loadAll();
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
