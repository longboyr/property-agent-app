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
import Aura from "@primeuix/themes/aura";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);

app.mount("#app");
