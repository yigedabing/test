<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="router-view">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.router-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
