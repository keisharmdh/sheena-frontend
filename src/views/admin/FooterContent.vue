<template>
  <div class="manage-content-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit-data"><span class="icon">✎</span> Edit Data</button>
    </header>

    <div class="accordion-container">
      <div class="section-card" :class="{ 'is-open': activeSections.about }">
        <div class="section-header" @click="toggleSection('about')">
          <h2 class="serif-card-title">About Footer</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div class="form-group">
            <label>Footer Title</label>
            <input type="text" class="admin-input" placeholder="SHEENA" />
          </div>
          <div class="form-group">
            <label>Brand Description</label>
            <textarea class="admin-textarea" rows="4"></textarea>
          </div>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.social }">
        <div class="section-header" @click="toggleSection('social')">
          <h2 class="serif-card-title">Social Media Links</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div v-for="i in 3" :key="i" class="pill-item">
            <div class="pill-left">
              <div class="icon-circle">🔗</div>
              <span class="platform-name">Instagram</span>
              <span class="url-text">https://instagram.com/sheena</span>
            </div>
            <div class="pill-actions">
              <button class="action-btn">✎</button>
              <button class="action-btn delete">🗑</button>
            </div>
          </div>
          <button class="btn-dashed-add">+ ADD NEW SOCIAL MEDIA</button>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.contact }">
        <div class="section-header" @click="toggleSection('contact')">
          <h2 class="serif-card-title">Contact Information</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div class="form-row">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" class="admin-input" />
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" class="admin-input" />
            </div>
          </div>
          <div class="form-group mt-4">
            <label>Boutique Address</label>
            <textarea class="admin-textarea" rows="3"></textarea>
          </div>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.size }">
        <div class="section-header" @click="toggleSection('size')">
          <h2 class="serif-card-title">Size Guide</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <h4 class="sub-label">Page Header</h4>
          <div class="form-group">
            <label>Subtitle</label>
            <input type="text" class="admin-input" value="Sizing & Fit" />
          </div>
          <div class="form-group">
            <label>Main Title</label>
            <input type="text" class="admin-input" value="Find Your Perfect Fit" />
          </div>
          <div class="form-group">
            <label>Short Description</label>
            <textarea class="admin-textarea">Our garments are crafted with precision...</textarea>
          </div>

          <h4 class="sub-label mt-6">How to Measure</h4>
          <div class="measure-grid">
            <div v-for="item in ['Ruler', 'Tape', 'Frame']" :key="item" class="measure-card">
              <div class="icon-circle mb-2">📏</div>
              <label class="center">{{ item }}</label>
              <input type="text" class="admin-input center" value="Bust" />
              <textarea class="admin-textarea mt-2" placeholder="Description..."></textarea>
            </div>
          </div>

          <h4 class="sub-label mt-6">Size Table Editor</h4>
          <div class="table-container">
            <table class="size-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>TOP LENGTH (CM)</th>
                  <th>SLEEVE LENGTH (CM)</th>
                  <th>BUST (CM)</th>
                  <th class="text-gold">+ ADD COL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableData" :key="row.size">
                  <td>{{ row.size }}</td>
                  <td>{{ row.top }}</td>
                  <td>{{ row.sleeve }}</td>
                  <td>{{ row.bust }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <button class="text-gold mt-2">+ ADD ROW</button>
          </div>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.faq }">
        <div class="section-header" @click="toggleSection('faq')">
          <h2 class="serif-card-title">Faq Management</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div v-for="i in 5" :key="i" class="faq-row">
            <div class="drag-handle">⠿</div>
            <div class="faq-content">
              <p class="faq-q">How can I track my order?</p>
              <p class="faq-a">
                Once your order is dispatched, you will receive an email containing the tracking
                number...
              </p>
            </div>
            <button class="action-btn">🗑</button>
          </div>
          <button class="btn-dashed-add mt-4">+ ADD NEW FAQ</button>
        </div>
      </div>
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
import { ref, reactive } from "vue";

// State untuk mengatur accordion mana yang terbuka
const activeSections = reactive({
  about: true,
  social: false,
  contact: false,
  size: false,
  faq: false,
});

const toggleSection = (key) => {
  activeSections[key] = !activeSections[key];
};

const tableData = ref([
  { size: "S", top: 53, sleeve: 63, bust: 94 },
  { size: "M", top: 54, sleeve: 63, bust: 98 },
  { size: "L", top: 56, sleeve: 64, bust: 102 },
]);
</script>

<style scoped>
/* Base Styles */
.manage-content-page {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 32px;
  margin: 0;
}

.subtitle {
  color: #aaa;
  font-size: 14px;
}

.btn-edit-data {
  background: white;
  border: 1px solid #e5d5c5;
  color: #8c6a43;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Accordion Card */
.accordion-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.section-header {
  padding: 24px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.serif-card-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 22px;
  margin: 0;
}

.arrow-toggle {
  color: #ccc;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.is-open .arrow-toggle {
  transform: rotate(180deg);
}

.section-body {
  max-height: 0;
  overflow: hidden;
  padding: 0 30px;
  transition: all 0.3s ease;
}

.is-open .section-body {
  max-height: 2000px; /* Nilai besar agar konten bisa scroll */
  padding: 10px 30px 30px 30px;
  border-top: 1px solid #f8f9fa;
}

/* Forms */
.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: #555;
}

.admin-input,
.admin-textarea {
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}

/* Pill Items (Social Links) */
.pill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #e5d5c5;
  border-radius: 50px;
  margin-bottom: 12px;
}

.pill-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-circle {
  background: #f5f1ee;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.platform-name {
  font-weight: 700;
  font-size: 13px;
  min-width: 80px;
}
.url-text {
  color: #888;
  font-size: 13px;
}

/* Buttons & Icons */
.btn-dashed-add {
  width: 100%;
  padding: 14px;
  border: 1px dashed #8c6a43;
  background: transparent;
  color: #8c6a43;
  border-radius: 8px;
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  letter-spacing: 1px;
}

.action-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.action-btn.delete:hover {
  color: #e74c3c;
}

/* FAQ Styles */
.faq-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #fdfdfd;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
}

.drag-handle {
  color: #ddd;
  cursor: grab;
}
.faq-q {
  font-weight: 700;
  font-size: 13px;
  margin: 0;
}
.faq-a {
  font-size: 12px;
  color: #888;
  margin: 4px 0 0 0;
}

/* Table Styles */
.size-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.size-table th {
  text-align: left;
  font-size: 11px;
  color: #aaa;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.size-table td {
  padding: 15px 10px;
  font-size: 13px;
  font-weight: 600;
}

.text-gold {
  color: #8c6a43;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: none;
}

/* Helper */
.sub-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
  font-weight: 500;
}
.center {
  text-align: center;
}
.mt-4 {
  margin-top: 16px;
}
.mt-6 {
  margin-top: 24px;
}

.measure-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.measure-card {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
}

/* Footer Note */
.sync-footer {
  margin-top: 40px;
  background: #ebf0f7;
  padding: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: #7a8ba3;
  line-height: 1.6;
}
</style>
