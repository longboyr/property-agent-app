<template>
  <header class="p-3 bg-primary">
    <div class="container">
      <h1 class="text-white">Property Agent Management</h1>
    </div>
  </header>

  <main class="container my-4">
    <RouterView />
  </main>

  <footer class="p-3 text-center bg-light">
    <p class="m-0">© Adulfo Emmanuel Respecia - Rent Pure Test</p>
  </footer>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
