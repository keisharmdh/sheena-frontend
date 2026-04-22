import { createRouter, createWebHistory } from "vue-router";

//public
import Home from "../views/public/Home.vue";
import Shop from "../views/public/Shop.vue";
import ProductDetail from "../views/public/ProductDetail.vue";
import About from "../views/public/About.vue";
import ContactUs from "../views/public/ContactUs.vue";
import SizeGuide from "../views/public/SizeGuide.vue";
import FAQ from "../views/public/FAQ.vue";
import ShoppingBag from "../views/public/ShoppingBag.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/shop",
    component: Shop,
  },

  {
    path: "/product-detail",
    component: ProductDetail,
  },

  {
    path: "/about",
    component: About,
  },

  {
    path: "/contact-us",
    component: ContactUs,
  },

  {
    path: "/size-guide",
    component: SizeGuide,
  },

  {
    path: "/faq",
    component: FAQ,
  },

  {
    path: "/shopping-bag",
    component: ShoppingBag,
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
