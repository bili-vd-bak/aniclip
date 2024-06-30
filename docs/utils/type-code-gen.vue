<template>
  <div v-for="t in type" :key="t">
    <code>{{ t }}</code>
    {{ " " }}
  </div>
</template>

<script setup>
defineProps(["type"]);
</script>

<style></style>
