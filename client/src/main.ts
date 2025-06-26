import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// PrimeVue
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Card from "primevue/card";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// Register PrimeVue components
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Toast", Toast);
app.component("Card", Card);

app.mount("#app");
