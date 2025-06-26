// src/main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/theme.css";
import App from "./App.vue";
import router from "./router";
import "./style.css";

// PrimeVue
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

// Import only the core styles and icons
// We'll handle themes differently
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.mount("#app");
