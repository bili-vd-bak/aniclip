import { defineConfig } from "vitepress";
import sidebar from "./sidebar.mts";
import {
  chineseSearchOptimize,
  pagefindPlugin,
} from "vitepress-plugin-pagefind";
// import { RSSOptions, RssPlugin } from "vitepress-plugin-rss";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";
import { transformHeadMeta } from "@nolebase/vitepress-plugin-meta";
import { InlineLinkPreviewElementTransform } from "@nolebase/vitepress-plugin-inline-link-preview/markdown-it";

export const title = "AniClip 番剧删减汇总",
  description =
    "一个番剧删减汇总平台：鉴于大多数流媒体平台(bilibili等)均对番剧有过度删减的现象，悲痛万分，建此平台，帮助各位正版受害者快捷观看到番剧的缺失/修改部分。无论是画面和谐、片段消失术，还是字幕翻译中体现的语言艺术，我们都会纠正回来，还一个正常的追番体验(个鬼)。" +
    "2024年7月新番火热收录中：亚托莉(atri)、不时用俄语小声说真心话的邻桌艾莉同学、疑似后宫......",
  copyright = "Copyright © 2024-present bili-vd-bak",
  baseUrl = "https://aniclip.xrzyun.eu.org";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title,
  description,
  lang: "zh-CN",
  head: [
    [
      "meta",
      { name: "msvalidate.01", content: "06754DA6F5D83AD9FBC3E4F04B15FAE7" }, //add bing vaild
    ],
  ],
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  sitemap: {
    hostname: baseUrl,
  },
  themeConfig: {
    logo: "/logo.png",
    sidebar,
    outline: {
      label: "页面大纲",
      level: "deep",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/bili-vd-bak/aniclip",
        ariaLabel: "程序仓库",
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rss-fill" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
        },
        link: "/feed.xml",
        ariaLabel: "RSS",
      },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright,
    },
    lastUpdated: {
      text: "上次更新本页日期",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "夜间模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    externalLinkIcon: true,
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(BiDirectionalLinks({ dir: "docs" }));
      md.use(InlineLinkPreviewElementTransform);
    },
  },
  async transformHead(context) {
    let head = [...context.head];
    const returnedHead = await transformHeadMeta()(head, context);
    if (typeof returnedHead !== "undefined") head = returnedHead;
    return head;
  },
  vite: {
    optimizeDeps: {
      exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
    },
    ssr: {
      noExternal: ["@nolebase/*"],
    },
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        excludeSelector: ["img", "a.header-anchor"],
        locales: {
          root: {
            btnPlaceholder: "搜索",
            placeholder: "搜索文档",
            emptyText: "空空如也",
            heading: "共: {{searchResult}} 条结果",
            // 搜索结果不展示最后修改日期日期
            showDate: false,
          },
        },
      }),
      // RssPlugin({
      //   title,
      //   baseUrl,
      //   copyright,
      //   description,
      // } as RSSOptions),
    ],
  },
});
