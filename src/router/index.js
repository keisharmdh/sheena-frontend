import { createRouter, createWebHistory } from "vue-router";

//public
import Home from "../views/public/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
