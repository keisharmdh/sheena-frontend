<template>
  <div class="admin-layout">
    <AdminSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="main-wrapper">
      <AdminHeader @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <main class="content-container">
        <router-view />
      </main>
    </div>

    <div v-if="isSidebarOpen" class="overlay" @click="isSidebarOpen = false"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminSidebar from "../components/SidebarAd.vue";
import AdminHeader from "../components/HeaderAd.vue";

const isSidebarOpen = ref(false);
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  padding: 40px;
  background-color: #f8f8f8;
  flex: 1;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 98; /* Di bawah sidebar, di atas konten */
}
</style>
