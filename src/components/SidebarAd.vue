<template>
  <aside class="sidebar-container" :class="{ open: isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-logo">
        <h1 class="logo-text">Sheena</h1>
        <button class="close-mobile-btn" @click="$emit('close')">&times;</button>
      </div>

      <nav class="nav-menu">
        <div class="menu-group">
          <router-link to="/admin/dashboard" class="menu-item" active-class="active">
            <div class="item-content">
              <span class="menu-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              <span class="menu-label">Dashboard</span>
            </div>
          </router-link>

          <router-link to="/admin/products-overview" class="menu-item" active-class="active">
            <div class="item-content">
              <span class="menu-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  ></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              <span class="menu-label">Product Overview</span>
            </div>
          </router-link>

          <div class="menu-item dropdown" @click="isManageContentOpen = !isManageContentOpen">
            <div class="item-content">
              <span class="menu-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </span>
              <span class="menu-label">Manage Content</span>
            </div>
            <span class="dropdown-arrow" :class="{ rotated: isManageContentOpen }">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>

          <router-link to="/admin/sales" class="menu-item">
            <div class="item-content">
              <span class="menu-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                  <path d="M17 6h6v6"></path>
                </svg>
              </span>
              <span class="menu-label">Sales Report</span>
            </div>
          </router-link>

          <button class="logout-btn" @click="handleLogout">
            <span class="logout-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </span>
            <span class="logout-label">Logout</span>
          </button>
        </div>
      </nav>
    </div>

    <div class="sidebar-bottom">
      <router-link to="/" class="back-link">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Website
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

// Definisi Props agar bisa menerima status 'isOpen' dari Layout
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Definisi Emits untuk memberitahu Layout jika sidebar ingin ditutup
defineEmits(["close"]);

const isManageContentOpen = ref(false);

const handleLogout = () => {
  // Tambahkan logika logout di sini
  console.log("Logging out...");
};
</script>

<style scoped>
.sidebar-container {
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed; /* Fixed agar tidak merusak tata letak konten utama */
  left: -280px; /* Default: Tersembunyi di kiri luar layar */
  top: 0;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Animasi halus */
}

/* Ketika class 'open' ada, geser ke posisi terlihat */
.sidebar-container.open {
  transform: translateX(280px);
}

.sidebar-top {
  padding: 40px 20px;
}

.sidebar-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 30px;
  border-bottom: 1px solid #f9f9f9;
  margin-bottom: 30px;
}

.logo-text {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 28px;
  color: #8c6a43;
  font-weight: 400;
  letter-spacing: 2px;
}

.close-mobile-btn {
  display: none; /* Sembunyikan di desktop, munculkan di mobile via media query jika perlu */
  background: none;
  border: none;
  font-size: 24px;
  color: #8c6a43;
  cursor: pointer;
}

.nav-menu {
  flex-grow: 1;
}

.menu-item,
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  margin-bottom: 10px;
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  color: #999;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: inherit;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-label,
.logout-label {
  font-size: 15px;
  font-weight: 500;
}

.menu-item.active {
  background-color: #ffffff;
  color: #8c6a43;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.dropdown-arrow {
  transition: transform 0.3s;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.logout-btn {
  color: #e53e3e;
  margin-top: 20px;
}

.sidebar-bottom {
  padding: 20px;
  border-top: 1px solid #f2f2f2;
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  color: #8c6a43;
  font-size: 14px;
  font-weight: 500;
}
</style>
