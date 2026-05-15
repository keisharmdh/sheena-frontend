<template>
  <div class="manage-home-container">
    <header class="page-header">
      <div class="header-info">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit" @click="saveContent">
         <Save class="save-icon" />
  Save Data
</button>
    </header>

    <div class="content-grid">
      <div class="column">
  <section class="content-card">
    <h2 class="card-title">Shop Header</h2>

    <div class="input-row">
      <div class="input-group">
        <label>Label</label>
        <input
          type="text"
          v-model="form.shop_label"
          placeholder="EXPLORE"
        />
      </div>

      <div class="input-group">
        <label>Title</label>
        <input
          type="text"
          v-model="form.shop_title"
          placeholder="Shop Collection"
        />
      </div>
    </div>
  </section>
</div>
    </div>

    <footer class="sync-note">
      <p>
        <strong>Note:</strong> Product information cannot be edited here as it is automatically
        synced from Shopee marketplace. Only website content and contact information can be updated.
      </p>
    </footer>
  </div>

  <transition name="toast">
  <div v-if="showToast" class="custom-toast">
    <span class="toast-icon">✓</span>

    <span>{{ toastMessage }}</span>

    <button @click="showToast = false">×</button>
  </div>
</transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Save } from "lucide-vue-next";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const form = ref({
  shop_label: "EXPLORE",
  shop_title: "Shop Collection",
});

const fetchContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`);
  const result = await response.json();

  form.value = {
    ...form.value,
    ...(result.data || {}),
  };
};

const toastMessage = ref("");
const showToast = ref(false);

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const saveContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
    body: JSON.stringify(form.value),
  });

  const result = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESULT:", result);
  console.log("FORM:", form.value);

  triggerToast(result.message || "Content saved");

  await fetchContent();
};

onMounted(fetchContent);
</script>

<style scoped>
/* Container & Layout */

* {
  box-sizing: border-box;
}

.manage-home-container {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;
}

.serif-title {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  margin: 0;
  color: #1a1a1a;
}

.subtitle {
  color: #999;
  font-size: 14px;
  margin-top: 4px;
}

.save-icon {
  width: 18px;
  height: 18px;
}

.btn-edit {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e5d5c5;
  border-radius: 8px;
  color: #8c6a43;
  font-weight: 600;
  cursor: pointer;
}

/* Grid System */
.content-grid {
  display: grid;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card Style */
.content-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.card-title {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  margin-bottom: 24px;
  color: #1a1a1a;
}

/* Form Elements */
.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.input-group label,
.full-width-label {
  font-size: 13px;
  font-weight: 700;
  color: #333;
}

input,
textarea {
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  width: 100%;
  max-width: 100%;
}

input:focus,
textarea:focus {
  border-color: #d1c4b5;
  background: #fff;
}

/* Upload Styles */
.upload-box {
  border: 1px solid #f0f0f0;
  background: #fdfdfd;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #aaa;
  font-size: 13px;
}

.upload-icon {
  color: #8c6a43;
  font-size: 16px;
}

/* Featured Banners Grid (Section 2) */
.featured-banners-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 20px;
}

.full-width-label {
  grid-column: span 2;
  margin-bottom: 10px;
}

.banner-item {
  border: 1px solid #f8f8f8;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
}

.image-placeholder {
  background: #f9f9f9;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.img-icon {
  font-size: 32px;
  opacity: 0.2;
}

.banner-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.mini-upload {
  border: 1px solid #eee;
  padding: 6px;
  border-radius: 6px;
  font-size: 11px;
  color: #aaa;
  cursor: pointer;
}

/* Note Section */
.sync-note {
  margin-top: 40px;
  background: #ebf0f7;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 12px;
  color: #7a8ba3;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.custom-toast {
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 9999;

  min-width: 380px;

  background: white;
  border: 1px solid #eee;

  padding: 18px 22px;

  display: flex;
  align-items: center;
  gap: 14px;

  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 16px;
  color: #1a1a1a;
}

.toast-icon {
  width: 24px;
  height: 24px;

  border-radius: 50%;
  border: 1px solid #8c6a43;

  color: #8c6a43;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
}

.custom-toast button {
  margin-left: auto;

  background: transparent;
  border: none;

  color: #bbb;

  font-size: 22px;
  cursor: pointer;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
