<template>
  <div v-for="t in types.split(' ')" :key="t">
    <VPBadge :type="t === 'nr' ? 'warning' : 'tip'" :text="t" />
  </div>
</template>

<script setup lang="ts">
import { VPBadge } from "vitepress/theme";
defineProps<{ types: string }>();
</script>

<style></style>
