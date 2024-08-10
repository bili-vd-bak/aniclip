<template>
  <code>{{ cGen(ss, t, time, title, ep, type, source, dts, derr) }}</code>
  <!-- <code v-show="!show" @click="show = !show">显示</code> -->
</template>

<script setup>
import cGen from "./ffmpeg-command-gen";

// import { ref } from "vue";

// const show = ref(true);

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
