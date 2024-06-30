<template>
  {{ ssGen_dts(ss, t, time, title, ep, type, source, dts, derr) }}
</template>

<script setup>
import TimeFormat from "hh-mm-ss";

defineProps([
  "ss",
  "t",
  "time",
  "title",
  "ep",
  "type",
  "source",
  "dts",
  "derr",
]);

function ssGen_dts(ss, t, time, title, ep, type, source, dts, derr) {
  const id = `${time}|${title}|${ep}|${source}`;
  try {
    if (!t) t = 0;
    else if (!Number(t)) t = TimeFormat.toS(t);
    if (!dts[id]) dts[id] = 0;
    if (!derr[id]) derr[id] = false;
    const t_ret = TimeFormat.fromS(TimeFormat.toS(ss) + dts[id]);
    if (type.match("_l") || type.match("丢失")) dts[id] += Number(t);
    return t_ret + (derr[id] ? "(可能有误)" : "");
  } catch (error) {
    derr[id] = true;
    console.error(error);
  }
  return "非法格式，此行数据可能有误";
}
</script>

<style></style>
