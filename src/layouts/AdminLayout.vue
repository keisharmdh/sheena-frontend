<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="main-wrapper">
      <AdminHeader />
      <main class="main-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
// Import kedua komponen yang baru dibuat
import AdminSidebar from "../components/SidebarAd.vue";
import AdminHeader from "../components/HeaderAd.vue";
</script>

<style>
/* Reset dasar untuk area admin */
body {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
  font-family: "Inter", sans-serif;
}
</style>

<style scoped>
.admin-layout {
  display: flex; /* Flexbox untuk Sidebar | Content */
  min-height: 100vh;
}

.main-wrapper {
  flex: 1; /* Mengisi sisa ruang di kanan */
  display: flex;
  flex-direction: column; /* Menumpuk Header ^ Content */
  overflow-x: hidden; /* Mencegah scroll horizontal */
}

.content-container {
  padding: 40px; /* Jarak dalam untuk konten halaman */
  flex: 1;
  background-color: #f8f8f8; /* Background abu-abu sangat muda sesuai visual login */
}
</style>
