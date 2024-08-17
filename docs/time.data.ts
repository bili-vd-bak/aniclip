import { defineLoader } from "vitepress";

export interface Data {
  build: Date;
  src_update: Date;
}

const timeGetter = async (): Promise<Data> => {
  return {
    build: new Date(),
    src_update: new Date(
      await fetch("https://api.github.com/repos/bili-vd-bak/aniclip-src")
        .then((res) => res.json())
        .then((res) => res.updated_at)
    ),
  };
};

declare const data: Data;
export { data, timeGetter };

export default defineLoader({
  async load() {
    return timeGetter();
  },
});
