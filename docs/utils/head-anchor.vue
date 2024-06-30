<template>
  <h1 v-if="lv == 1" :id="handleID(name)" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + handleID(name)"
      :aria-label="'Permalink to &quot;' + name + '&quot;'"
      >&ZeroWidthSpace;</a
    >
  </h1>
  <h2 v-else-if="lv == 2" :id="handleID(name)" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + handleID(name)"
      :aria-label="'Permalink to &quot;' + name + '&quot;'"
      >&ZeroWidthSpace;</a
    >
  </h2>
  <h3 v-else-if="lv == 3" :id="handleID(name)" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + handleID(name)"
      :aria-label="'Permalink to &quot;' + name + '&quot;'"
      >&ZeroWidthSpace;</a
    >
  </h3>
  <h4 v-else-if="lv == 4" :id="handleID(name)" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + handleID(name)"
      :aria-label="'Permalink to &quot;' + name + '&quot;'"
      >&ZeroWidthSpace;</a
    >
  </h4>
  <h5 v-else-if="lv == 5" :id="handleID(name)" tabindex="-1">
    {{ name }}
    <a
      class="header-anchor"
      :href="'#' + handleID(name)"
      :aria-label="'Permalink to &quot;' + name + '&quot;'"
      >&ZeroWidthSpace;</a
    >
  </h5>
</template>

<script setup lang="ts">
import validName from "./get-valid-name.ts";

defineProps<{ id?: string; name: string; lv: string | number }>();

function handleID(name: string) {
  return validName(name).replaceAll(" ", "-");
}
</script>

<style></style>
