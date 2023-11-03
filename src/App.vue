<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.container {
  margin: 0 auto;
  max-width: 1100px;
} 
</style>
