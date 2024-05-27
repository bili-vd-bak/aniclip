import { defineLoader } from "vitepress";

export interface Data {
  build: Date;
  src_update: Date;
}

declare const data: Data;
export { data };

export default defineLoader({
  async load() {
    return {
      build: new Date(),
      src_update: await fetch(
        "https://api.github.com/repos/bili-vd-bak/aniclip-src"
      )
        .then((res) => res.json())
        .then((res) => res.updated_at),
    };
  },
});
