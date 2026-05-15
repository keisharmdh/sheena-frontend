<template>
  <header class="admin-header">
    <div class="header-left">
      <button class="icon-btn hamburger-btn" @click="$emit('toggle-sidebar')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="header-center"></div>

    <div class="header-right">
      <div class="search-box">
      </div>

      <div class="profile-dropdown">
        <div class="profile-info">
          <p class="admin-name">{{ adminName }}</p>
          <p class="admin-email">{{ adminEmail }}</p>
        </div>
          <div class="avatar-circle">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <!-- <span class="arrow-down">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["toggle-sidebar"]);

const adminUser = JSON.parse(localStorage.getItem("admin_user") || "{}");

const adminName = computed(() => adminUser.name || "Admin");
const adminEmail = computed(() => adminUser.email || "");
</script>

<style scoped>
.admin-header {
  height: 70px;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Membagi 3 area: Kiri, Tengah, Kanan */
  align-items: center;
  padding: 0 30px;
  position: sticky;
  top: 0;
  z-index: 99;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  display: flex;
  align-items: center;
}

/* Bagian Kiri (Hamburger) */
.header-left {
  display: flex;
  align-items: center;
}

/* Bagian Tengah (Search) */
.header-center {
  display: flex;
  justify-content: center;
}
.search-bar {
  width: 100%;
  max-width: 350px;
  position: relative;
  display: flex;
  align-items: center;
}
.search-bar input {
  width: 100%;
  padding: 10px 15px 10px 40px; /* Padding kiri ekstra untuk ikon */
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #fafafa;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
}
.search-bar input:focus {
  border-color: #8c6a43;
  background-color: white;
}
.search-icon {
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
}

/* Bagian Kanan (Notifikasi & Profil) */
.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.notification-wrapper {
  position: relative;
}
.notification-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: #d93025; /* Titik MERAH sesuai gambar */
  border-radius: 50%;
  border: 2px solid white; /* Supaya terlihat terpisah */
}

.profile-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: default;
}
.avatar-circle {
  width: 38px;
  height: 38px;
  background-color: #8c6a43; /* Lingkaran COKELAT signature SHEENA */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow-down {
  display: flex;
  align-items: center;
}
.profile-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  text-align: right;
}
.admin-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}
.admin-email {
  font-size: 12px;
  color: #999;
  margin: 0;
}
</style>
