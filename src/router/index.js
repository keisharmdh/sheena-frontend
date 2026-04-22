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
      // Halaman admin lainnya di sini...
    ],
  },
  // Group Halaman Admin (POLOS / Tanpa Header & Footer Toko)
  // {
  //   path: "/admin",
  //   component: () => import("../layouts/AdminLayout.vue"),
  //   children: [
  //     {
  //       path: "login",
  //       name: "Login",
  //       component: () => import("../views/admin/login.vue"),
  //     },
  //   ],
  // },
];

// const routes = [
//   {
//     path: "/",
//     component: Home,
//   },

//   {
//     path: "/shop",
//     component: Shop,
//   },

//   {
//     path: "/product-detail",
//     component: ProductDetail,
//   },

//   {
//     path: "/about",
//     component: About,
//   },

//   {
//     path: "/contact-us",
//     component: ContactUs,
//   },

//   {
//     path: "/size-guide",
//     component: SizeGuide,
//   },

//   {
//     path: "/faq",
//     component: FAQ,
//   },

//   {
//     path: "/shopping-bag",
//     component: ShoppingBag,
//   },

//   //admin
//   {
//     path: "/login",
//     component: Login,
//   },
// ];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
