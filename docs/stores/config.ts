import { defineStore } from "pinia";
// import { ref, computed } from "vue";

// type domain = "batch" | "any" | "global" | "local";
type display_global = "pic" | "tips" | "share_pic";
type display_local =
  | "source"
  | "cut1"
  | "cut2"
  | "type"
  | "len"
  | "watch"
  | "contribute"
  | "tips";
// @ts-ignore
export const useGlobalConfigStore = defineStore("conf_global", {
  // const conf = ref({
  //   global: {
  //     pic: true,
  //     tips: true,
  //     share_pic: true,
  //   },
  //   local: {
  //     source: true,
  //     cut1: true,
  //     cut2: true,
  //     type: true,
  //     len: true,
  //     watch: true,
  //     contribute: false,
  //     tips: true,
  //   },
  // });
  // const global = ref({
  //   pic: true,
  //   tips: true,
  //   share_pic: true,
  // });
  // const local = ref({
  //   source: true,
  //   cut1: true,
  //   cut2: true,
  //   type: true,
  //   len: true,
  //   watch: true,
  //   contribute: false,
  //   tips: true,
  // });
  // const ShowToggle = (on: boolean) => (on ? "warning" : "info"),
  //   ShowText = (on: boolean) => (on ? "开" : "关");
  // function getBadgeType(
  //   domain: domain,
  //   key: display_global | display_local | (display_global | display_local)[]
  // ): "warning" | "info" | ("warning" | "info")[] | [] {
  //   if (Array.isArray(key)) {
  //     return key.map(
  //       (k) =>
  //         getBadgeType(
  //           domain === "any" || domain === "batch" ? "any" : domain,
  //           k
  //         ) as "warning" | "info"
  //     );
  //   } else if (domain === "any") {
  //     const g = getBadgeType("global", key) as "warning" | "info",
  //       l = getBadgeType("local", key) as "warning" | "info";
  //     if (g) return g;
  //     else if (l) return l;
  //     else return "info";
  //   } else if (domain === "global") return ShowToggle(conf.value.global[key]);
  //   else if (domain === "local") return ShowToggle(conf.value.local[key]);
  // }
  // function getBadgeText(
  //   domain: domain,
  //   key: display_global | display_local | (display_global | display_local)[]
  // ): "开" | "关" | ("开" | "关")[] | [] {
  //   if (Array.isArray(key)) {
  //     return key.map(
  //       (k) =>
  //         getBadgeType(
  //           domain === "any" || domain === "batch" ? "any" : domain,
  //           k
  //         ) as "开" | "关"
  //     );
  //   } else if (domain === "any") {
  //     const g = getBadgeType("global", key) as "开" | "关",
  //       l = getBadgeType("local", key) as "开" | "关";
  //     if (g) return g;
  //     else if (l) return l;
  //     else return "关";
  //   } else if (domain === "global") return ShowText(conf.value.global[key]);
  //   else if (domain === "local") return ShowText(conf.value.local[key]);
  // }
  // function toggle(
  //   domain: domain,
  //   key: display_global | display_local | (display_global | display_local)[]
  // ) {
  //   if (Array.isArray(key)) {
  //     key.forEach((k) =>
  //       toggle(domain === "any" || domain === "batch" ? "any" : domain, k)
  //     );
  //   } else if (domain === "any") {
  //     toggle("global", key);
  //     toggle("local", key);
  //   } else if (domain === "global")
  //     conf.value.global[key] = !conf.value.global[key];
  //   else if (domain === "local")
  //     conf.value.local[key] = !conf.value.local[key];
  // }
  // return { conf, getBadgeType, getBadgeText, toggle };
  state: () => ({
    pic: true,
    tips: true,
    share_pic: true,
  }),
  //   query: (state) => {
  //     return (domain: domain, key: display_global | display_local) =>
  //       state[domain][key];
  //   },
  // },
  actions: {
    toggle(key: display_global | display_global[]) {
      if (Array.isArray(key)) key.forEach((k) => this.toggle(k));
      else this.$state[key] = !this.$state[key];
    },
    getBadgeType(key: display_global) {
      return this.$state[key] ? "warning" : "info";
    },
    getBadgeText(key: display_global) {
      return this.$state[key] ? "开" : "关";
    },
  },
  persist: true,
});
// @ts-ignore
export const useLocalConfigStore = defineStore("conf_local", {
  state: () => ({
    source: true,
    cut1: true,
    cut2: true,
    type: true,
    len: true,
    watch: true,
    contribute: false,
    tips: true,
  }),
  actions: {
    toggle(key: display_global | display_global[]) {
      if (Array.isArray(key)) key.forEach((k) => this.toggle(k));
      else this.$state[key] = !this.$state[key];
    },
    getBadgeType(key: display_local) {
      return this.$state[key] ? "warning" : "info";
    },
    getBadgeText(key: display_local) {
      return this.$state[key] ? "开" : "关";
    },
  },
  persist: true,
});
