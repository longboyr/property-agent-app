<template>
  <div class="app-container">
    <Toast />
    <header class="header">
      <h1>Property Agent Management System</h1>
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>© 2025 Property Agent Management System</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  padding: 1rem 2rem;
  background-color: #1e88e5;
  color: white;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  padding: 1rem;
  background-color: #f5f5f5;
  text-align: center;
  border-top: 1px solid #ddd;
}
</style>