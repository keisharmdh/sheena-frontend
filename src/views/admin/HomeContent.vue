<template>
  <div class="manage-content-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="font-serif">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="edit-data-btn" @click="saveContent">
        <Save class="save-icon" />
        Save Data
      </button>
    </header>

    <div class="content-grid">
      <div class="grid-column">
        <section class="card">
          <h2 class="section-title">Hero Section</h2>
          <div class="input-row">
            <div class="input-group">
              <div class="input-group">
                <label>Title</label>
                <input type="text" v-model="form.hero_title" placeholder="Enter title" />
              </div>
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" v-model="form.hero_label" placeholder="Enter subtitle" />
            </div>
          </div>
          <div class="input-group">
            <label>Button Text</label>
            <textarea rows="3" v-model="form.hero_button"></textarea>
          </div>
          <div class="input-group">
  <label>Hero Banner Image</label>
  <label class="upload-placeholder">
    <input
      type="file"
      accept="image/*"
      hidden
      @change="handleImageChange($event, 'hero_image')"
    />
    <span>Upload New Banner</span>
  </label>
</div>
        </section>

        <section class="card">
          <h2 class="section-title">Section 2</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" v-model="form.section2_title" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" v-model="form.section2_label" />
            </div>
          </div>
          <div class="input-group">
            <label>Description</label>
            <textarea rows="3" v-model="form.section2_description"></textarea>
          </div>
          <div class="banner-grid">
            <div v-for="i in 4" :key="i" class="banner-card">
              <div class="image-box">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d1c4b5"
                  stroke-width="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <p class="banner-label">Featured Banner </p>
              <label class="mini-upload">
  <input
    type="file"
    accept="image/*"
    hidden
    @change="handleImageChange($event, `section2_image_${i}`)"
  />
  Upload Image
</label>
            </div>
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">Promotional Banner</h2>
          <div class="input-row">
  <div class="input-group">
    <label>Title</label>
    <input type="text" v-model="form.promo_title" />
  </div>

  <div class="input-group">
    <label>Subtitle</label>
    <input type="text" v-model="form.promo_label" />
  </div>
</div>
          <div class="input-group">
  <label>Promotional Banner Image</label>
  <label class="upload-placeholder">
    <input
      type="file"
      accept="image/*"
      hidden
      @change="handleImageChange($event, 'promo_image')"
    />
    <span>Upload New Banner</span>
  </label>
</div>
        </section>
      </div>

      <div class="grid-column">
        <section class="card">
          <h2 class="section-title">Section 3</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" v-model="form.section3_title" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" v-model="form.section3_label" />
            </div>
          </div>
          <div class="input-group">
            <label>Button Text</label>
            <textarea rows="3" v-model="form.section3_button"></textarea>
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">Editor Picks</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" v-model="form.editors_title" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" v-model="form.editors_label" />
            </div>
          </div>
         
        </section>
      </div>
    </div>

    <footer class="info-note">
      <strong>Note:</strong> Product information cannot be edited here as it is automatically synced
      from Shopee marketplace. Only website content and contact information can be updated.
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
  hero_label: "SPRING / SUMMER 2026",
  hero_title: "Timeless Elegance",
  hero_button: "Discover Collection",
  hero_image: "",

  section2_label: "COLLECTION",
  section2_title: "Quiet Luxury",
  section2_description: "Timeless elegance meets contemporary sophistication",

  section3_label: "DISCOVER",
  section3_title: "New Collection",
  section3_button: "View All Products",

  promo_label: "FEATURED",
  promo_title: "The Essence of Elegance",
  promo_description:
    "Curated pieces that embody timeless sophistication. Each garment is thoughtfully designed to elevate your wardrobe with understated luxury and enduring style.",

  editors_label: "CURATED SELECTION",
  editors_title: "Editors Picks",
});

const imageFiles = ref({
  hero_image: null,
  section2_image_1: null,
  section2_image_2: null,
  section2_image_3: null,
  section2_image_4: null,
  promo_image: null,
});

const toastMessage = ref("");
const showToast = ref(false);

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const handleImageChange = (event, field) => {
  imageFiles.value[field] = event.target.files[0];
};

const fetchContent = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/home-content`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil content");
    }

    form.value = {
      ...form.value,
      ...(result.data || {}),
    };
  } catch (error) {
    console.error("Fetch content error:", error);
  }
};

const saveContent = async () => {
  const formData = new FormData();

  Object.entries(form.value).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });

  Object.entries(imageFiles.value).forEach(([key, file]) => {
    if (file) {
      formData.append(key, file);
    }
  });

  const response = await fetch(`${API_BASE}/admin/home-content`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
    body: formData,
  });

  const result = await response.json();
  triggerToast(result.message || "Content saved");

  await fetchContent();
};

onMounted(fetchContent);
</script>

<style scoped>
.manage-content-page {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}
.font-serif {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  margin: 0;
  color: #1a1a1a;
}
.subtitle {
  color: #888;
  font-size: 14px;
  margin-top: 4px;
}
.edit-data-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 1px solid #e5d5c5;
  border-radius: 8px;
  color: #8c6a43;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

/* Grid System */
.content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
}
.grid-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card Style */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.section-title {
  font-family: "Playfair Display", serif;
  font-size: 22px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

/* Inputs */
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

.upload-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.input-group label,
.upload-group label,
.label-heading {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}
input,
textarea {
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition: 0.2s;
}
input:focus,
textarea:focus {
  border-color: #d1c4b5;
  background: #fff;
}

/* Upload Style */
.upload-placeholder {
  border: 1px solid #eee;
  background: #fcfcfc;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 13px;
  color: #aaa;
}

/* Section 2 Banner Grid */
.banner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 15px;
}
.banner-card {
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}
.image-box {
  background: #fcfcfc;
  border-radius: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.banner-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}
.mini-upload {
  border: 1px solid #f0f0f0;
  padding: 6px;
  border-radius: 6px;
  font-size: 11px;
  color: #bbb;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}

/* Footer Note */
.info-note {
  margin-top: 40px;
  background: #ebf0f7;
  padding: 15px 24px;
  border-radius: 10px;
  font-size: 12px;
  color: #7a8ba3;
  line-height: 1.5;
}

.save-icon {
  width: 18px;
  height: 18px;
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
