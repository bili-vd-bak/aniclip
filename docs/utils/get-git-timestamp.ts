import { spawn } from "cross-spawn";
import fs from "fs-extra";
import { basename, dirname } from "path";

const cache = new Map<string, [number, number]>();

/** 获取文件提交时间
 * @returns {[number, number]|Promise<[number,number]>} 返回`[发布时间，最近更新时间]`
 */
export function getGitTimestamp(
  file: string
): [number, number] | Promise<[number, number]> {
  const cached = cache.get(file);
  if (cached) return cached;

  if (!fs.existsSync(file)) return [0, 0] as [number, number];

  return new Promise<[number, number]>((resolve) => {
    let output: number[] = [];

    // 开启子进程执行git log命令
    // const child = spawn("git", ["--no-pager", "log", '--pretty="%ci"', file]);
    // const child = spawn(
    //   "git",
    //   ["log", "-1", '--pretty="%ai"', basename(file)],
    //   { cwd: dirname(file) }
    // );
    const child = spawn(
      "git",
      ["--no-pager", "log", '--pretty="%ai"', basename(file)],
      { cwd: dirname(file) }
    );

    // 监听输出流
    child.stdout.on("data", (d) => {
      const data = String(d)
        .split("\n")
        .map((item) => +new Date(item))
        .filter((item) => item);
      output.push(...data);
    });

    // 输出接受后返回
    child.on("close", () => {
      if (output.length) {
        // 返回[发布时间，最近更新时间]
        cache.set(file, [
          +new Date(output[output.length - 1]),
          +new Date(output[0]),
        ]);
        resolve([+new Date(output[output.length - 1]), +new Date(output[0])]);
      } else {
        // 没有提交记录时获取文件时间
        const { birthtimeMs, mtimeMs } = fs.statSync(file);
        cache.set(file, [birthtimeMs, mtimeMs]);
        resolve([birthtimeMs, mtimeMs]);
      }
    });

    child.on("error", () => {
      // 获取失败时使用文件时间
      const { birthtimeMs, mtimeMs } = fs.statSync(file);
      cache.set(file, [birthtimeMs, mtimeMs]);
      resolve([birthtimeMs, mtimeMs]);
    });
  });
}
