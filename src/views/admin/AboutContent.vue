<template>
  <div class="page-content">
    <header class="content-header">
      <div class="title-area">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit-data" @click="saveContent">
        <Save class="save-icon" />
  Save Data
      </button>
    </header>

    <div class="manage-stack">
      <section class="admin-card">
        <h2 class="serif-card-title">About Header</h2>
        <div class="form-row">
          <div class="form-group">
            <label>Title</label>
            <input v-model="form.about_title" type="text" class="admin-input" placeholder="Enter about title" />
          </div>
          <div class="form-group">
            <label>Subtitle</label>
            <input v-model="form.about_subtitle" type="text" class="admin-input" placeholder="Enter about subtitle" />
          </div>
        </div>
      </section>

      <section class="admin-card">
        <h2 class="serif-card-title">About Us Content</h2>
        <div class="form-group">
          <label>Brand Story Content</label>
          <textarea
            v-model="form.about_story"
            class="admin-textarea brand-story-area"
            placeholder="Write your brand story here..."
          ></textarea>
          <p class="char-count">{{ form.about_story.length }} characters</p>
        </div>
      </section>
    </div>

    <footer class="sync-footer">
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
  about_title: "About SHEENA",
  about_subtitle: "OUR STORY",
  about_story: "Brand story content example text...",
});

const fetchContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    headers: { Accept: "application/json" },
  });

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
  triggerToast("About content updated successfully");

  await fetchContent();
};

onMounted(fetchContent);
</script>

<style scoped>
/* Base Layout */
.page-content {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
}

/* Header Styles */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;
}

.serif-title {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  margin: 0;
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

.btn-edit-data {
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

/* Card & Form Styles */
.manage-stack {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.admin-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.serif-card-title {
  font-family: "Playfair Display", serif;
  font-size: 24px;
  margin-bottom: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
  color: #333;
}

.admin-input {
  padding: 14px 16px;
  background: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s;
}

.admin-textarea {
  padding: 16px;
  background: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  resize: vertical;
  min-height: 200px;
}

.admin-input:focus,
.admin-textarea:focus {
  background: white;
  border-color: #d1c4b5;
}

.char-count {
  font-size: 11px;
  color: #aaa;
  margin-top: 8px;
}

/* Footer Note */
.sync-footer {
  margin-top: 40px;
  background: #ebf0f7;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 12px;
  color: #7a8ba3;
  line-height: 1.6;
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
