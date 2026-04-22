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

//admin
import Login from "../views/admin/Login.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import ProductsOverview from "../views/admin/ProductsOverview.vue";
import HomeContent from "../views/admin/HomeContent.vue";
import ShopContent from "../views/admin/ShopContent.vue";
import AboutContent from "../views/admin/AboutContent.vue";
import FooterContent from "../views/admin/FooterContent.vue";
import Report from "../views/admin/Report.vue";

const routes = [
  // Group Halaman Public (Pake Header & Footer)
  {
    path: "/",
    component: () => import("../layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/public/Home.vue"),
      },
      {
        path: "shop",
        name: "Shop",
        component: () => import("../views/public/Shop.vue"),
      },
      {
        path: "product-detail/:id",
        name: "ProductDetail",
        component: () => import("../views/public/ProductDetail.vue"),
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/public/About.vue"),
      },
      {
        path: "contact-us",
        name: "ContactUs",
        component: () => import("../views/public/ContactUs.vue"),
      },
      {
        path: "size-guide",
        name: "SizeGuide",
        component: () => import("../views/public/SizeGuide.vue"),
      },
      {
        path: "faq",
        name: "FAQ",
        component: () => import("../views/public/FAQ.vue"),
      },
      {
        path: "shopping-bag",
        name: "ShoppingBag",
        component: () => import("../views/public/ShoppingBag.vue"),
      },
    ],
  },

  {
    path: "/admin/login",
    name: "Login",
    component: () => import("../views/admin/Login.vue"),
  },

  {
    path: "/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "dashboard", // Akses: /admin/dashboard
        name: "Dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
      {
        path: "products-overview", // Akses: /admin/product-overview
        name: "ProductsOverview",
        component: () => import("../views/admin/ProductsOverview.vue"),
      },
      {
        path: "home-content", // Akses: /admin/home-content
        name: "HomeContent",
        component: () => import("../views/admin/HomeContent.vue"),
      },
      {
        path: "shop-content", // Akses: /admin/shop-content
        name: "ShopContent",
        component: () => import("../views/admin/ShopContent.vue"),
      },
      {
        path: "about-content", // Akses: /admin/about-content
        name: "AboutContent",
        component: () => import("../views/admin/AboutContent.vue"),
      },
      {
        path: "footer-content", // Akses: /admin/footer-content
        name: "FooterContent",
        component: () => import("../views/admin/FooterContent.vue"),
      },
      {
        path: "report", // Akses: /admin/report
        name: "Report",
        component: () => import("../views/admin/Report.vue"),
      },
      // Halaman admin lainnya di sini...
    ],
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
