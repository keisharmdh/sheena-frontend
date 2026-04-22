<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <h1 class="brand-logo">Sheena</h1>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li class="nav-item active">
          <router-link to="/admin/dashboard">
            <span class="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            Dashboard
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/admin/products">
            <span class="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </span>
            Product Overview
          </router-link>
        </li>

        <li class="nav-item has-dropdown">
          <a href="#" @click.prevent="isContentOpen = !isContentOpen">
            <div class="link-content">
              <span class="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </span>
              Manage Content
            </div>
            <span class="arrow-icon" :class="{ open: isContentOpen }">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </a>
          <ul v-if="isContentOpen" class="dropdown-menu">
            <li><router-link to="/admin/content/home">Home Page</router-link></li>
            <li><router-link to="/admin/content/blog">Blog</router-link></li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link to="/admin/reports">
            <span class="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </span>
            Sales Report
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button class="btn-logout" @click="handleLogout">
        <span class="icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </span>
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isContentOpen = ref(false); // State untuk dropdown
const router = useRouter();

const handleLogout = () => {
  if (confirm("Are you sure you want to logout?")) {
    // Logika hapus token disini
    router.push("/admin/login");
  }
};
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background-color: white;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-header {
  margin-bottom: 50px;
  text-align: left;
  padding-left: 10px;
}
.brand-logo {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 26px;
  font-weight: 400;
  color: #8c6a43; /* Warna khas SHEENA */
  letter-spacing: 1px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 5px;
}
.nav-item a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 15px;
  text-decoration: none;
  color: #666; /* Warna text menu default */
  font-size: 14px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-item .link-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Styling untuk menu ACTIVE sesuai gambar (putih bersih, shadow halus) */
.nav-item.active a {
  background-color: white;
  color: #8c6a43; /* Text cokelat saat aktif */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* Shadow halus */
  font-weight: 500;
}
.nav-item.active .icon svg {
  stroke: #8c6a43;
} /* Ikon ikut cokelat */

/* Hover state untuk menu non-aktif */
.nav-item:not(.active) a:hover {
  background-color: #fdfaf7;
  color: #1a1a1a;
}

/* Dropdown styling */
.has-dropdown .arrow-icon {
  transition: transform 0.3s;
  color: #ccc;
}
.has-dropdown .arrow-icon.open {
  transform: rotate(180deg);
  color: #8c6a43;
}
.dropdown-menu {
  padding-left: 35px !important;
  margin-top: 5px !important;
}
.dropdown-menu a {
  padding: 10px !important;
  font-size: 13px;
  color: #888;
}

/* Bagian Footer Sidebar (Logout) */
.sidebar-footer {
  margin-top: auto;
  padding-top: 30px;
  border-top: 1px solid #f0f0f0;
}
.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 15px;
  background: none;
  border: none;
  color: #d93025; /* Warna MERAH sesuai gambar */
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s;
}
.btn-logout:hover {
  background-color: #fff1f0;
}
</style>
