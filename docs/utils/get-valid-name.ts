/**
 * 去除文件名中的非法字符
 * @param {string} input 原文件名
 * @param [re="_"] 替换值
 * @param [filterSlash=false] 是否替换斜杠
 */
export default function getValidFileName(
  input: string,
  re = "_",
  filterSlash = false
) {
  let title = input;
  const InvalidChars = [
    34, 60, 62, 124, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 58, 42, 63, 92,
    47,
  ].map((charCode) => String.fromCharCode(charCode));
  for (const invalidChar of InvalidChars) {
    title = title.replaceAll(invalidChar, re);
  }
  if (filterSlash) {
    title = title.replaceAll("/", re);
    title = title.replaceAll("\\", re);
  }
  return title;
}
