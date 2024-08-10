<template>
  {{ ssGen_dts(ss, t, time, title, ep, type, source, dts, derr) }}
</template>

<script setup>
import ssGen_dts from "./ss-real-gen";

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
</script>

<style></style>
