<template>
  <h1 v-if="lv == 1" :id="id" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + id"
      :aria-label="'Permalink to' + name + ' {#' + id + '}'"
      >&ZeroWidthSpace;</a
    >
  </h1>
  <h2 v-else-if="lv == 2" :id="id" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + id"
      :aria-label="'Permalink to' + name + ' {#' + id + '}'"
      >&ZeroWidthSpace;</a
    >
  </h2>
  <h3 v-else-if="lv == 3" :id="id" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + id"
      :aria-label="'Permalink to' + name + ' {#' + id + '}'"
      >&ZeroWidthSpace;</a
    >
  </h3>
  <h4 v-else-if="lv == 4" :id="id" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + id"
      :aria-label="'Permalink to' + name + ' {#' + id + '}'"
      >&ZeroWidthSpace;</a
    >
  </h4>
  <h5 v-else-if="lv == 5" :id="id" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + id"
      :aria-label="'Permalink to' + name + ' {#' + id + '}'"
      >&ZeroWidthSpace;</a
    >
  </h5>
</template>

<script setup>
defineProps(["id", "name", "lv"]);
</script>

<style></style>
