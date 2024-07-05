<script setup>
// import { ref } from "vue";
import { data as ani } from "./toml.data.ts";
import typeTrans from "../utils/typeTrans.ts";
import validName from "../utils/get-valid-name.ts";
import ssRealGen from "../utils/ss-real-gen.vue";
import typeCodeGen from "../utils/type-code-gen.vue";
import ffmpegCommandGen from "../utils/ffmpeg-command-gen.vue";
import Link from "vitepress/dist/client/theme-default/components/VPLink.vue";
import HA from "../utils/head-anchor.vue";
import { ref } from "vue";
import { useData } from "vitepress";
// import TimeFormat from "hh-mm-ss";

defineProps(["set_time", "min"]);
const { isDark } = useData();

const isASL = (set_time) =>
  set_time === "自动同步最新" ||
  set_time === "ASL" ||
  set_time === "AutoSyncLatest";

/**
 * 获取视频源
 * @param {string} source
 */
function genSource(source) {
  if (!source) return "未知";
  const host = new URL(source).hostname;
  if (host.match("b23") || host.match("bili")) return "B站";
  else if (host.match("iqy")) return "爱奇艺";
  else if (host.match("qq.com")) return "腾讯";
  else return source;
}

let dts = {};
let derr = {};
// function ssGen_dts(id, ss, t, type) {
//   try {
//     if (!t) t = 0;
//     else if (!Number(t)) t = TimeFormat.toS(t);
//     if (!dts[id]) dts[id] = 0;
//     if (!derr[id]) derr[id] = false;
//     const t_ret = TimeFormat.fromS(TimeFormat.toS(ss) + dts[id]);
//     if (type.match("_l") || type.match("丢失")) dts[id] += Number(t);
//     return t_ret + (derr[id] ? "(可能有误)" : "");
//   } catch (error) {
//     derr[id] = true;
//     console.error(error);
//   }
//   return "非法格式，此行数据可能有误";
// }

let dts2 = {};
let derr2 = {};

const show_watch = ref(true);
const show_contribute = ref(true);
// const count = ref(0);
</script>

<template>
  <div class="flex flex-col" :data-theme="isDark ? 'dark' : 'light'">
    <div class="ds-form-control">
      <label class="label cursor-pointer">
        <span class="label-text">显示<code>观看删减片段</code></span>
        <input
          type="checkbox"
          class="ds-toggle ds-toggle-accent"
          :checked="show_watch"
          :disabled="show_contribute"
          @click="show_watch = !show_watch"
        />
        <span class="label-text"><--点击此处</span>
      </label>
    </div>
    <div class="ds-form-control">
      <label class="label cursor-pointer">
        <span class="label-text">显示<code>贡献片段截取(FFMpeg)</code></span>
        <input
          type="checkbox"
          class="ds-toggle ds-toggle-accent"
          :checked="show_contribute"
          :disabled="show_contribute"
          @click="show_contribute = !show_contribute"
        />
        <span class="label-text"><--点击此处</span>
      </label>
    </div>
  </div>
  <!-- <button @click="count++">You clicked me {{ count }} times.</button>
  st:{{ set_time }} t:{{ time }} -->
  <div v-for="(ss, time) in ani" :key="time">
    <div v-if="!set_time || time === set_time">
      <HA :name="time" :id="time" lv="1">{{ time }}</HA>
      <Link
        v-if="!isASL(time)"
        href="https://github.com/bili-vd-bak/aniclip-src/new/master"
        >向本季度({{ time }})贡献数据 -> github.com</Link
      >
      <div v-for="ani in ss" :key="ani.title">
        <div v-if="min === 'on'">
          跳转至<Link
            :href="
              (isASL(time) ? 'ASL' : 'timeline/' + time) +
              '#' +
              validName(ani.title).replaceAll(' ', '-')
            "
            >{{ ani.title }}</Link
          >
        </div>
        <div v-else>
          <HA :name="ani.title" :id="ani.title" lv="2">{{ ani.title }}</HA>
          <img width="180" :src="ani.cover" v-if="ani.cover" />
          <p v-if="ani.tips"><b>提示</b>：{{ ani.tips }}</p>
          <details>
            <summary>
              <b>点击展开表格</b>(含 片段观看、FFMpeg命令生成、详情等)
            </summary>
            <div v-for="(clips, ep) in ani.list" :key="ep">
              <table>
                <thead>
                  <tr>
                    <th>集数</th>
                    <th>来源</th>
                    <th>删减位置(删减视频)</th>
                    <th>删减位置(完整视频)</th>
                    <th>删减类型</th>
                    <th>删减长度(秒)</th>
                    <th v-if="show_watch" @click="show_watch = !show_watch">
                      观看删减片段
                    </th>
                    <th
                      v-if="show_contribute"
                      @click="show_contribute = !show_contribute"
                    >
                      贡献片段截取(FFMpeg)
                    </th>
                    <th>提示</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="clip in clips" :key="clip.ss">
                    <td>{{ ep }}</td>
                    <td>
                      <Link v-if="clip.source" :href="clip.source">{{
                        genSource(clip.source)
                      }}</Link>
                      <p v-else>{{ genSource(clip.source) }}</p>
                    </td>
                    <td>{{ clip.ss }}</td>
                    <td>
                      <ssRealGen
                        :ss="clip.ss"
                        :t="clip.t"
                        :time="time"
                        :title="ani.title"
                        :ep="ep"
                        :type="clip.type"
                        :source="clip.source"
                        :dts="dts"
                        :derr="derr"
                      />
                    </td>
                    <td>
                      <typeCodeGen :type="typeTrans(clip.type).split(' ')" />
                    </td>
                    <td>{{ clip.t }}</td>
                    <td v-if="show_watch">
                      <Link :href="clip.clip" v-if="clip.clip">跳转</Link>
                      <p v-else>-</p>
                    </td>
                    <td v-if="show_contribute">
                      <ffmpegCommandGen
                        :ss="clip.ss"
                        :t="clip.t"
                        :time="time"
                        :title="ani.title"
                        :ep="ep"
                        :type="clip.type"
                        :source="clip.source"
                        :dts="dts2"
                        :derr="derr2"
                      />
                      <!-- <code>{{
                    cGen(clip.ss, clip.t, `${time}|${ani.title}|${ep}`)
                  }}</code> -->
                    </td>
                    <td>{{ clip.tips }}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <h4>第 {{ ep }} 集</h4>
        <li v-for="clip in clips" :key="clip.ss">
          {{ clip.ss }} {{ typeTrans(clip.type) }} {{ clip.t }}
        </li> -->
              <!-- <pre><code>{{ clips }}</code></pre> -->
            </div>
          </details>
          <Link
            v-if="!isASL(time)"
            :href="
              'https://github.com/bili-vd-bak/aniclip-src/edit/master/' +
              time +
              '|' +
              ani.title +
              '.toml'
            "
            >向该番剧({{ ani.title }})贡献数据 -> github.com</Link
          >
          <!-- <pre><code>{{ ani.list }}</code></pre> -->
        </div>
      </div>
      <!-- <pre><code>{{ ss }}</code></pre> -->
    </div>
  </div>
  <!-- <pre><code>{{ ani }}</code></pre> -->
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
