import { defineConfig } from "vitepress";
import sidebar from "./sidebar.ts";
import {
  chineseSearchOptimize,
  pagefindPlugin,
} from "vitepress-plugin-pagefind";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "AniClip 番剧删减汇总",
  description: "一个番剧删减汇总平台。",
  lang: "zh-cn",
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
  themeConfig: {
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
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present bili-vd-bak",
    },
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
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
    ],
  },
});
