<script setup lang="ts">
import { data as ani } from "./toml.data.ts";
import { isASL, epGen, DlLink } from "../utils/common.ts";
import validName from "../utils/get-valid-name.ts";
import typeCodeGen from "../utils/type-code-gen.vue";
// @ts-ignore
import Link from "vitepress/dist/client/theme-default/components/VPLink.vue";
import HA from "../utils/head-anchor.vue";
import { ref } from "vue";
import { VPBadge, VPButton } from "vitepress/theme";
import Html2Pic from "../utils/html2pic.ts";
import { useGlobalConfigStore, useLocalConfigStore } from "../stores/config";

defineProps<{ set_time?: string; min?: "on" | string }>();

const config = { global: useGlobalConfigStore(), local: useLocalConfigStore() };

const tmp_show_capture = ref(false),
  tmp_to_share_data = ref<{
    AT: string;
    ep: string | number;
    GG: string;
    scale?: number;
    rcScale?: number;
    img?: {
      url: string;
      height?: string;
      width?: string;
      type?: "webp" | "png";
    };
  }>({
    AT: "",
    ep: 0,
    GG: "",
    scale: 2,
    rcScale: 0,
    img: { url: "", height: "", width: "", type: "png" },
  });
tmp_to_share_data.value.rcScale = 1 / tmp_to_share_data.value.scale;

// const ShowToggle = (on: boolean) => (on ? "warning" : "info"),
//   ShowText = (on: boolean) => (on ? "开" : "关");

const isEmptyTips = (clips: { 提示?: string }[]) =>
  !clips.find((clip) => clip.提示);

const colspanCal = (isEmptyTips?: boolean) => {
  let c = 0;
  if (config.local.source) c++;
  if (config.local.cut1) c++;
  if (config.local.cut2) c++;
  if (config.local.type) c++;
  if (config.local.len) c++;
  if (config.local.watch) c++;
  if (config.local.contribute) c++;
  if (config.local.tips && !isEmptyTips) c++;
  return c;
};

async function HtmlDlPic(
  AniTitle: string,
  ep: string | number,
  GendEp?: string,
  type: "webp" | "png" = tmp_to_share_data.value.img.type,
  img = tmp_to_share_data.value.img
) {
  if (!img.url || !GendEp)
    img = await Html2Pic(
      AniTitle + ep,
      tmp_to_share_data.value.scale,
      ("image/" + type) as "image/webp" | "image/png"
    );
  // console.log(img.url, `AniClip-${AniTitle}-${GendEp}.${type}`);
  if (GendEp) DlLink(img.url, `AniClip-${AniTitle}-${GendEp}.${type}`);
  else tmp_to_share_data.value.img = { ...tmp_to_share_data.value.img, ...img };
}
</script>

<template>
  <div v-show="tmp_show_capture" class="modal-mask">
    <div class="modal-container">
      <div class="modal-main">
        <h5>格式</h5>
        <div class="button-group">
          <VPButton
            text="WEBP(高效)"
            @click="
              tmp_to_share_data.img.type = 'webp';
              HtmlDlPic(tmp_to_share_data.AT, tmp_to_share_data.ep);
            "
          />
          <VPButton
            text="PNG(兼容)"
            theme="alt"
            @click="
              tmp_to_share_data.img.type = 'png';
              HtmlDlPic(tmp_to_share_data.AT, tmp_to_share_data.ep);
            "
          />
        </div>
        <div v-show="tmp_to_share_data.img.url">
          <details class="details custom-block">
            <summary>预览({{ tmp_to_share_data.img.type }})</summary>
            <img :src="tmp_to_share_data.img.url" />
          </details>
          <VPButton
            text="保存"
            @click="
              HtmlDlPic(
                tmp_to_share_data.AT,
                tmp_to_share_data.ep,
                tmp_to_share_data.GG
              )
            "
          />
        </div>
      </div>
      <div class="model-footer">
        <button
          class="modal-button"
          @click="
            tmp_show_capture = false;
            tmp_to_share_data.img.url = '';
          "
        >
          关闭
        </button>
      </div>
    </div>
  </div>
  <div v-if="min !== 'on'">
    <details class="details custom-block">
      <summary><b>设置(点击展开)</b></summary>
      <table>
        <caption>
          <b>全局</b>
          显示
        </caption>
        <thead>
          <tr>
            <th>季度图片</th>
            <th>季度提示</th>
            <th>保存为图片按钮</th>
            <th>预设(适用于分享)</th>
            <th>重置全部设置</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <VPBadge
                @click="config.global.toggle('pic')"
                :type="config.global.getBadgeType('pic')"
                :text="config.global.getBadgeText('pic')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.global.toggle('tips')"
                :type="config.global.getBadgeType('tips')"
                :text="config.global.getBadgeText('tips')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.global.toggle('share_pic')"
                :type="config.global.getBadgeType('share_pic')"
                :text="config.global.getBadgeText('share_pic')"
              />
            </td>
            <td>
              <VPBadge
                @click="
                  config.local.toggle('source');
                  config.local.toggle('watch');
                "
                type="danger"
                text="切换"
              />
            </td>
            <td>
              <VPBadge
                @click="
                  config.global.$reset();
                  config.local.$reset();
                "
                type="danger"
                text="重置"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>
          <b>表格/文字</b>
          显示
        </caption>
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
                @click="config.local.toggle('source')"
                :type="config.local.getBadgeType('source')"
                :text="config.local.getBadgeText('source')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('cut1')"
                :type="config.local.getBadgeType('cut1')"
                :text="config.local.getBadgeText('cut1')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('cut2')"
                :type="config.local.getBadgeType('cut2')"
                :text="config.local.getBadgeText('cut2')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('type')"
                :type="config.local.getBadgeType('type')"
                :text="config.local.getBadgeText('type')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('len')"
                :type="config.local.getBadgeType('len')"
                :text="config.local.getBadgeText('len')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('watch')"
                :type="config.local.getBadgeType('watch')"
                :text="config.local.getBadgeText('watch')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('contribute')"
                :type="config.local.getBadgeType('contribute')"
                :text="config.local.getBadgeText('contribute')"
              />
            </td>
            <td>
              <VPBadge
                @click="config.local.toggle('tips')"
                :type="config.local.getBadgeType('tips')"
                :text="config.local.getBadgeText('tips')"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
  <div v-for="(ss, time) in ani.data" :key="time">
    <div v-if="!set_time || time === set_time">
      <HA :name="time + ''" :id="time + ''" lv="1">{{ time }}</HA>
      <Link
        v-if="!isASL(time)"
        href="https://github.com/bili-vd-bak/aniclip-src/new/master"
        >向本季度({{ time }})贡献数据 -> github.com</Link
      >
      <div v-for="ani2 in ss" :key="ani2.title">
        <div v-if="min === 'on'">
          跳转至<Link
            :href="
              (isASL(time) ? 'ASL' : 'timeline/' + time) +
              '#' +
              validName(ani2.title).replaceAll(' ', '-')
            "
            >{{ ani2.title }}</Link
          >
        </div>
        <div v-else>
          <HA :name="ani2.title" :id="ani2.title" lv="2">{{ ani2.title }}</HA>
          <p>
            最近更新时间：<code>{{
              new Date(ani2.mtime).toLocaleString("zh-Hans-CN")
            }}</code
            >[<code>{{ new Date(ani2.mtime) }}</code
            >]
          </p>
          <img
            width="160"
            :src="ani2.cover"
            v-if="config.global.pic && ani2.cover"
          />
          <p v-if="config.global.tips && ani2.tips">
            <b>提示</b>：{{ ani2.tips }}
          </p>
          <details class="details custom-block">
            <summary>
              <b>点击展开表格</b>(含 片段观看、FFMpeg命令生成、详情等)
            </summary>
            <div v-for="(clips, ep) in ani2.list_gen" :key="ep">
              <h5>{{ epGen(clips?.[0].集数 || ep) }}</h5>
              <VPButton
                text="保存为图片"
                v-if="config.global.share_pic && !tmp_show_capture"
                @click="
                  () => {
                    tmp_to_share_data = {
                      ...tmp_to_share_data,
                      AT: ani2.title,
                      ep,
                      GG: epGen(clips?.[0].集数 || ep),
                    };
                    tmp_show_capture = true;
                  }
                "
              />
              <VPButton
                v-if="config.global.share_pic"
                @click="
                  config.local.toggle('source');
                  config.local.toggle('watch');
                "
                theme="alt"
                text="切换显示预设(分享模式)"
              />
              <table
                :id="ani2.title + ep"
                :class="tmp_show_capture ? 'tmp_capture' : ''"
              >
                <thead>
                  <tr>
                    <th
                      v-show="tmp_show_capture"
                      :colspan="colspanCal(!!isEmptyTips(clips))"
                    >
                      <p style="float: left">
                        {{ epGen(clips?.[0].集数 || ep) }}
                      </p>
                      <p style="float: right">
                        {{ new Date(ani2.mtime).toLocaleString("zh-Hans-CN") }}
                      </p>
                    </th>
                  </tr>
                  <tr>
                    <!-- <th>集数</th> -->
                    <th v-if="config.local.source">来源</th>
                    <th v-if="config.local.cut1">删减位置(删减视频)</th>
                    <th v-if="config.local.cut2">删减位置(完整视频)</th>
                    <th v-if="config.local.type">删减类型</th>
                    <th v-if="config.local.len">删减长度(秒)</th>
                    <th v-if="config.local.watch">观看删减片段</th>
                    <th v-if="config.local.contribute">贡献片段截取(FFMpeg)</th>
                    <th v-if="config.local.tips && !isEmptyTips(clips)">
                      提示
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="clip in clips" :key="clip['删减位置(删减视频)']">
                    <!-- <td>{{ clip.集数 }}</td> -->
                    <td v-if="config.local.source">
                      <Link v-if="clip.source" :href="clip.source">{{
                        clip.来源
                      }}</Link>
                      <p v-else>{{ clip.来源 }}</p>
                    </td>
                    <td v-if="config.local.cut1">
                      {{ clip["删减位置(删减视频)"] }}
                    </td>
                    <td v-if="config.local.cut2">
                      {{ clip["删减位置(完整视频)"] }}
                    </td>
                    <td v-if="config.local.type">
                      <typeCodeGen :types="clip.删减类型" />
                    </td>
                    <td v-if="config.local.len">
                      {{ clip["删减长度(秒)"] }}
                    </td>
                    <td v-if="config.local.watch">
                      <Link :href="clip.观看删减片段" v-if="clip.观看删减片段">
                        跳转
                      </Link>
                      <p v-else>-</p>
                    </td>
                    <td v-if="config.local.contribute">
                      <code>{{ clip["贡献片段截取(FFMpeg)"] }}</code>
                    </td>
                    <td v-if="config.local.tips && !isEmptyTips(clips)">
                      {{ clip.提示 }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td :colspan="colspanCal(!!isEmptyTips(clips))">
                      {{ `共计${clips.length}处删减/修改` }}
                    </td>
                  </tr>
                  <tr v-show="tmp_show_capture">
                    <td :colspan="colspanCal(!!isEmptyTips(clips))">
                      <p style="float: left">遵循 CC BY-NC-SA 4.0 协议共享</p>
                      <p style="float: right">由 aniclip.xrzyun.eu.org 生成</p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </details>
          <details class="details custom-block">
            <summary><b>点击展开文字版</b></summary>
            <VPBadge
              @click="
                config.local.toggle('source');
                config.local.toggle('watch');
              "
              type="danger"
              text="切换显示预设(分享模式)"
            /><br />
            <Link href="https://text2image.fun/"
              >复制后可至此处转为图片分享</Link
            >
            <div v-for="(clips, ep) in ani2.list_gen" :key="ep">
              <h5>{{ epGen(clips?.[0].集数 || ep) }}</h5>
              <div class="language-text vp-adaptive-theme">
                <button title="Copy Code" class="copy"></button
                ><span class="lang">{{ epGen(clips?.[0].集数 || ep) }}</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code"
                  tabindex="0"
                ><code><span class="line"><span v-if="config.local.source">来源</span><span v-if="config.local.cut1"> 删减位置(删减视频)</span><span v-if="config.local.cut2"> 删减位置(完整视频)</span><span v-if="config.local.type"> 删减类型</span><span v-if="config.local.len"> 删减长度(秒)</span><span v-if="config.local.watch"> AniClip片段截取</span></span>
<span class="line" v-for="clip in clips" :key="clip['删减位置(删减视频)']"><span v-if="config.local.source">{{ clip.来源 }}</span><span v-if="config.local.cut1">  {{ clip["删减位置(删减视频)"] }}</span><span v-if="config.local.cut2">            {{ clip["删减位置(完整视频)"] }}</span><span v-if="config.local.type">          {{ clip.删减类型 }}</span><span v-if="config.local.len">   {{ clip["删减长度(秒)"]?clip["删减长度(秒)"]+"s":"--" }}</span><span v-if="config.local.watch">             {{ clip.观看删减片段?"有":"无" }}</span>
</span><span class="line"><span>共计{{ clips.length }}处删减/修改;由 aniclip.xrzyun.eu.org 生成;遵循 CC BY-NC-SA 4.0 协议共享</span></span></code></pre>
              </div>
            </div>
          </details>
          <details class="details custom-block">
            <summary><b>点击展开快速贡献</b>(命令生成)</summary>
            <div v-for="(clips, ep) in ani2.list_gen" :key="ep">
              <h5>{{ epGen(clips?.[0].集数 || ep) }}</h5>
              <div class="language-zsh vp-adaptive-theme">
                <button title="Copy Code" class="copy"></button
                ><span class="lang">zsh</span>
                <pre
                  class="shiki shiki-themes github-light github-dark vp-code"
                  tabindex="0"
                ><code><span class="line" v-for="clip in clips" :key="clip['删减位置(删减视频)']"><span>{{ clip["贡献片段截取(FFMpeg)"] }}</span>
</span></code></pre>
              </div>
            </div>
          </details>
          <div class="button-group">
            <Link
              :href="'/timeline/' + time + '/' + validName(ani2.title) + '.xml'"
              >订阅RSS</Link
            >
            <Link
              v-if="!isASL(time)"
              :href="
                'https://github.com/bili-vd-bak/aniclip-src/edit/master/' +
                time +
                '|' +
                ani2.title +
                '.toml'
              "
              >向该番剧({{ ani2.title }})贡献数据 -> github.com</Link
            >
          </div>
          <!-- <pre><code>{{ ani.list }}</code></pre> -->
        </div>
      </div>
      <!-- <pre><code>{{ ss }}</code></pre> -->
    </div>
  </div>
  <!-- <pre><code>{{ ani }}</code></pre> -->
</template>

<style scoped>
.tmp_capture {
  transform: scale(v-bind("tmp_to_share_data.rcScale"));
  display: inline-table;
  img {
    display: initial;
  }
}
.button-group > :not(:last-child) {
  margin-right: 10px;
}
.modal-main {
  details {
    overflow-y: auto;
    max-height: 20em;
  }
  img {
    height: v-bind("tmp_to_share_data.img.height");
    width: v-bind("tmp_to_share_data.img.width");
  }
}
</style>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 70%;
  max-height: 80%;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
