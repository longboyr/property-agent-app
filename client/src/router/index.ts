import { createRouter, createWebHistory } from "vue-router";
import AgentView from "../views/AgentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "agents",
      component: AgentView,
    },
    // Add other routes as needed
  ],
});

export default router;
