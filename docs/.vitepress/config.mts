import { defineConfig } from "vitepress";
import sidebar from "./sidebar.mts";
import {
  chineseSearchOptimize,
  pagefindPlugin,
} from "vitepress-plugin-pagefind";
import { BiDirectionalLinks } from "@nolebase/markdown-it-bi-directional-links";
import { transformHeadMeta } from "@nolebase/vitepress-plugin-meta";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "AniClip 番剧删减汇总",
  description: "一个番剧删减汇总平台。",
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
    hostname: "https://aniclip.xrzyun.eu.org",
  },
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
      md.use(
        BiDirectionalLinks({
          dir: "docs",
        })
      );
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
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-highlight-targeted-heading",
      ],
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
    ],
  },
});
