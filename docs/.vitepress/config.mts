import { defineConfig } from "vitepress";
import sidebar from "./sidebar.mts";
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
    // search: {
    //   provider: "local",
    //   options: {
    //     miniSearch: {
    //       options: {
    //         processTerm: (term) => {
    //           const segmenter =
    //             Intl.Segmenter &&
    //             new Intl.Segmenter("zh", { granularity: "word" });
    //           if (!segmenter) return term;
    //           const tokens = [];
    //           for (const seg of segmenter.segment(term)) {
    //             tokens.push(seg.segment);
    //           }
    //           return tokens;
    //         },
    //       },
    //     },
    //   },
    // },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present bili-vd-bak",
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
  },
  vite: {
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
    ],
  },
});
