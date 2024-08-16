<script setup>
// import { ref } from "vue";
import { data as ani } from "./toml.data.ts";
import validName from "../utils/get-valid-name.ts";
import typeCodeGen from "../utils/type-code-gen.vue";
import Link from "vitepress/dist/client/theme-default/components/VPLink.vue";
import HA from "../utils/head-anchor.vue";
import { ref } from "vue";
import { useData } from "vitepress";

defineProps(["set_time", "min"]);
const { isDark } = useData();

const isASL = (set_time) =>
  set_time === "自动同步最新" ||
  set_time === "ASL" ||
  set_time === "AutoSyncLatest";

const show_watch = ref(true);
const show_contribute = ref(true);
</script>

<template>
  <div class="flex flex-col" :data-theme="isDark ? 'dark' : 'light'">
  </div>
  <div v-for="(ss, time) in ani.data" :key="time">
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
            <div v-for="(clips, ep) in ani.list_gen" :key="ep">
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
                  <tr v-for="clip in clips" :key="clip['删减位置(删减视频)']">
                    <td>{{ clip.集数 }}</td>
                    <td>
                      <Link v-if="clip.source" :href="clip.source">{{
                        clip.来源
                      }}</Link>
                      <p v-else>{{ clip.来源 }}</p>
                    </td>
                    <td>{{ clip["删减位置(删减视频)"] }}</td>
                    <td>{{ clip["删减位置(完整视频)"] }}</td>
                    <td>
                      <typeCodeGen :type="clip.删减类型" />
                    </td>
                    <td>{{ clip["删减长度(秒)"] }}</td>
                    <td v-if="show_watch">
                      <Link :href="clip.观看删减片段" v-if="clip.观看删减片段"
                        >跳转</Link
                      >
                      <p v-else>-</p>
                    </td>
                    <td v-if="show_contribute">
                      <!-- <ffmpegCommandGen
                        :ss="clip.ss"
                        :t="clip.t"
                        :time="time"
                        :title="ani.title"
                        :ep="ep"
                        :type="clip.type"
                        :source="clip.source"
                        :dts="dts2"
                        :derr="derr2"
                      /> -->
                      <code>{{ clip["贡献片段截取(FFMpeg)"] }}</code>
                    </td>
                    <td>{{ clip.提示 }}</td>
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
