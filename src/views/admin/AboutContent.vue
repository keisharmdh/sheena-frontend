<template>
  <div class="page-content">
    <header class="content-header">
      <div class="title-area">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit-data"><span class="edit-icon">✎</span> Edit Data</button>
    </header>

    <div class="manage-stack">
      <section class="admin-card">
        <h2 class="serif-card-title">About Header</h2>
        <div class="form-row">
          <div class="form-group">
            <label>Title</label>
            <input type="text" class="admin-input" placeholder="Enter about title" />
          </div>
          <div class="form-group">
            <label>Subtitle</label>
            <input type="text" class="admin-input" placeholder="Enter about subtitle" />
          </div>
        </div>
      </section>

      <section class="admin-card">
        <h2 class="serif-card-title">About Us Content</h2>
        <div class="form-group">
          <label>Brand Story Content</label>
          <textarea
            v-model="brandStory"
            class="admin-textarea brand-story-area"
            placeholder="Write your brand story here..."
          ></textarea>
          <p class="char-count">{{ brandStory.length }} characters</p>
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
</template>

<script setup>
import { ref } from "vue";

// Menginisialisasi dengan jumlah karakter contoh sesuai gambar
const brandStory = ref("Brand story content example text...");
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
</style>
