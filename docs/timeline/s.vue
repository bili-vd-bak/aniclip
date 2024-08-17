<script setup>
// import { ref } from "vue";
import { data as ani } from "./toml.data.ts";
import validName from "../utils/get-valid-name.ts";
import typeCodeGen from "../utils/type-code-gen.vue";
import Link from "vitepress/dist/client/theme-default/components/VPLink.vue";
import HA from "../utils/head-anchor.vue";
import { ref } from "vue";
// import { useData } from "vitepress";
import { VPBadge } from "vitepress/theme";

defineProps(["set_time", "min"]);
// const { isDark } = useData();

const isASL = (set_time) =>
  set_time === "自动同步最新" ||
  set_time === "ASL" ||
  set_time === "AutoSyncLatest";

const show_all_pic = ref(true),
  show_all_tips = ref(true),
  show_source = ref(true),
  show_cut1 = ref(true),
  show_cut2 = ref(true),
  show_type = ref(true),
  show_len = ref(true),
  show_watch = ref(true),
  show_contribute = ref(true),
  show_tips = ref(true);

const ShowToggle = (on) => (on ? "warning" : "info"),
  ShowText = (on) => (on ? "开" : "关");
</script>

<template>
  <div v-if="min !== 'on'">
    <HA name="设置" id="settings" lv="2" />
    <details>
      <summary><b>设置(点击展开)</b></summary>
      <HA name="设置 全局 显示" id="settings-all" lv="3" />
      <table>
        <thead>
          <tr>
            <th>季度图片</th>
            <th>季度提示</th>
            <th>预设(文字版最合适)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <VPBadge
                @click="show_all_pic = !show_all_pic"
                :type="ShowToggle(show_all_pic)"
                :text="ShowText(show_all_pic)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_all_tips = !show_all_tips"
                :type="ShowToggle(show_all_tips)"
                :text="ShowText(show_all_tips)"
              />
            </td>
            <td>
              <VPBadge
                @click="
                  show_source = !show_source;
                  show_watch = !show_watch;
                "
                type="danger"
                text="切换"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <HA name="设置 表格/文字 显示" id="settings-table" lv="3" />
      <table>
        <thead>
          <tr>
            <!-- <th>集数</th> -->
            <th>来源</th>
            <th>删减位置(删减视频)</th>
            <th>删减位置(完整视频)</th>
            <th>删减类型</th>
            <th>删减长度(秒)</th>
            <th>观看删减片段</th>
            <th>贡献片段截取(FFMpeg)</th>
            <th>提示</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <VPBadge
                @click="show_source = !show_source"
                :type="ShowToggle(show_source)"
                :text="ShowText(show_source)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_cut1 = !show_cut1"
                :type="ShowToggle(show_cut1)"
                :text="ShowText(show_cut1)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_cut2 = !show_cut2"
                :type="ShowToggle(show_cut2)"
                :text="ShowText(show_cut2)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_type = !show_type"
                :type="ShowToggle(show_type)"
                :text="ShowText(show_type)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_len = !show_len"
                :type="ShowToggle(show_len)"
                :text="ShowText(show_len)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_watch = !show_watch"
                :type="ShowToggle(show_watch)"
                :text="ShowText(show_watch)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_contribute = !show_contribute"
                :type="ShowToggle(show_contribute)"
                :text="ShowText(show_contribute)"
              />
            </td>
            <td>
              <VPBadge
                @click="show_tips = !show_tips"
                :type="ShowToggle(show_tips)"
                :text="ShowText(show_tips)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
  <div v-for="(ss, time) in ani.data" :key="time">
    <div v-if="!set_time || time === set_time">
      <HA :name="time" :id="time" lv="2">{{ time }}</HA>
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
          <HA :name="ani.title" :id="ani.title" lv="3">{{ ani.title }}</HA>
          <img width="180" :src="ani.cover" v-if="show_all_pic && ani.cover" />
          <p v-if="show_all_tips && ani.tips"><b>提示</b>：{{ ani.tips }}</p>
          <details>
            <summary>
              <b>点击展开表格</b>(含 片段观看、FFMpeg命令生成、详情等)
            </summary>
            <div v-for="(clips, ep) in ani.list_gen" :key="ep">
              <table>
                <thead>
                  <tr>
                    <th>集数</th>
                    <th v-if="show_source">来源</th>
                    <th v-if="show_cut1">删减位置(删减视频)</th>
                    <th v-if="show_cut2">删减位置(完整视频)</th>
                    <th v-if="show_type">删减类型</th>
                    <th v-if="show_len">删减长度(秒)</th>
                    <th v-if="show_watch">观看删减片段</th>
                    <th v-if="show_contribute">贡献片段截取(FFMpeg)</th>
                    <th v-if="show_tips">提示</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="clip in clips" :key="clip['删减位置(删减视频)']">
                    <td>{{ clip.集数 }}</td>
                    <td v-if="show_source">
                      <Link v-if="clip.source" :href="clip.source">{{
                        clip.来源
                      }}</Link>
                      <p v-else>{{ clip.来源 }}</p>
                    </td>
                    <td v-if="show_cut1">{{ clip["删减位置(删减视频)"] }}</td>
                    <td v-if="show_cut2">{{ clip["删减位置(完整视频)"] }}</td>
                    <td v-if="show_type">
                      <typeCodeGen :type="clip.删减类型" />
                    </td>
                    <td v-if="show_len">{{ clip["删减长度(秒)"] }}</td>
                    <td v-if="show_watch">
                      <Link :href="clip.观看删减片段" v-if="clip.观看删减片段">
                        跳转
                      </Link>
                      <p v-else>-</p>
                    </td>
                    <td v-if="show_contribute">
                      <code>{{ clip["贡献片段截取(FFMpeg)"] }}</code>
                    </td>
                    <td v-if="show_tips">{{ clip.提示 }}</td>
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
          <details>
            <summary><b>点击展开文字版</b></summary>
            <VPBadge
              @click="
                show_source = !show_source;
                show_watch = !show_watch;
              "
              type="danger"
              text="切换显示设置预设(文字版模式)"
            />
            <div v-for="(clips, ep) in ani.list_gen" :key="ep">
              <h5>{{ Number(ep) ? `第${ep}集` : ep }}</h5>
              <div class="language-text vp-adaptive-theme">
                <button title="Copy Code" class="copy"></button
                ><span class="lang">{{ Number(ep) ? `第${ep}集` : ep }}</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code"
                  tabindex="0"
                ><code><span class="line"></span><span v-if="show_source">来源</span> <span v-if="show_cut1">删减位置(删减视频)</span> <span v-if="show_cut2">删减位置(完整视频)</span> <span v-if="show_type">删减类型</span> <span v-if="show_len">删减长度(秒)</span> <span v-if="show_watch">AniClip片段截取</span>
<span class="line" v-for="clip in clips" :key="clip['删减位置(删减视频)']"><span v-if="show_source">{{ clip.来源 }}</span>  <span v-if="show_cut1">{{ clip["删减位置(删减视频)"] }}</span>            <span v-if="show_cut2">{{ clip["删减位置(完整视频)"] }}</span>          <span v-if="show_type">{{ clip.删减类型 }}</span>   <span v-if="show_len">{{ clip["删减长度(秒)"]?clip["删减长度(秒)"]+"s":"--" }}</span>             <span v-if="show_watch">{{ clip.观看删减片段?"有":"无" }}</span>
</span></code></pre>
              </div>
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

<style></style>
