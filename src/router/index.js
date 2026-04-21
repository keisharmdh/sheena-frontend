import { createRouter, createWebHistory } from "vue-router";

//public
import Home from "../views/public/Home.vue";
import About from "../views/public/About.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
