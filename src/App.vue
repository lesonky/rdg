<template>
  <Main />
</template>

<script setup lang="ts">
import Main from './views/Main/index.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
/* set boxsizing default border-box as default */
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
</style>
