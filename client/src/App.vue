<template>
  <header class="p-3 bg-primary w-full">
    <div class="w-full px-4">
      <h1 class="text-white">Property Agent Management</h1>
    </div>
  </header>

  <main class="w-full px-4 my-4">
    <RouterView />
  </main>

  <footer class="p-3 text-center bg-light w-full">
    <p class="m-0"> Adulfo Emmanuel Respecia - Rent Pure Test</p>
  </footer>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style>
/* Global styles to ensure full width */
html, body, #app {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
