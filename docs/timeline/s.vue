<script setup>
// import { ref } from "vue";
import { data as ani } from "./toml.data.ts";
import typeTrans from "../utils/typeTrans.ts";
import ffmpegCommandGen from "../ffmpeg-command-gen.vue";
import Link from "vitepress/dist/client/theme-default/components/VPLink.vue";
import HA from "../utils/head-anchor.vue";
// import TimeFormat from "hh-mm-ss";

defineProps(["set_time", "min"]);

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

// const count = ref(0);
</script>

<template>
  <!-- <button @click="count++">You clicked me {{ count }} times.</button>
  st:{{ set_time }} t:{{ time }} -->
  <div v-for="(ss, time) in ani" :key="time">
    <div v-if="!set_time || time === set_time">
      <HA :name="time" :id="time" lv="2">{{ time }}</HA>
      <Link href="https://github.com/bili-vd-bak/aniclip-src/new/master"
        >向本季度({{ time }})贡献数据 -> github.com</Link
      >
      <div v-for="ani in ss" :key="ani.title">
        <div v-if="min === 'on'">
          跳转至<Link :href="'timeline/' + time + '#' + ani.title">{{
            ani.title
          }}</Link>
        </div>
        <div v-else>
          <HA :name="ani.title" :id="ani.title" lv="3">{{ ani.title }}</HA>
          <img width="180" :src="ani.cover" v-if="ani.cover" />
          <p v-if="ani.tips">提示：{{ ani.tips }}</p>
          <div v-for="(clips, ep) in ani.list" :key="ep">
            <table>
              <thead>
                <tr>
                  <th>集数</th>
                  <th>来源</th>
                  <th>删减位置</th>
                  <th>删减类型</th>
                  <th>删减长度(秒)</th>
                  <th>观看删减片段</th>
                  <th>贡献片段截取(FFMpeg)</th>
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
                  <td>{{ typeTrans(clip.type) }}</td>
                  <td>{{ clip.t }}</td>
                  <td>
                    <Link :href="clip.clip" v-if="clip.clip">跳转</Link>
                    <p v-else>-</p>
                  </td>
                  <td>
                    <ffmpegCommandGen
                      :ss="clip.ss"
                      :t="clip.t"
                      :time="time"
                      :title="ani.title"
                      :ep="ep"
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
          <Link
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
