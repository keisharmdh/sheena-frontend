<template>
  <div class="manage-home-container">
    <header class="page-header">
      <div class="header-info">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit"><span class="icon">✎</span> Edit Data</button>
    </header>

    <div class="content-grid">
      <div class="column">
        <section class="content-card">
          <h2 class="card-title">Hero Section</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" placeholder="Enter title" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" placeholder="Enter subtitle" />
            </div>
          </div>
          <div class="input-group">
            <label>Button Text</label>
            <textarea rows="3" placeholder="Enter button text"></textarea>
          </div>
          <div class="upload-section">
            <label>Hero Banner Image</label>
            <div class="upload-box">
              <span class="upload-icon">↑</span>
              <span>Upload New Banner</span>
            </div>
          </div>
        </section>

        <section class="content-card">
          <h2 class="card-title">Section 2</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" />
            </div>
          </div>
          <div class="input-group">
            <label>Description</label>
            <textarea rows="3"></textarea>
          </div>

          <div class="featured-banners-grid">
            <label class="full-width-label">Hero Banner Image</label>
            <div v-for="i in 4" :key="i" class="banner-item">
              <div class="image-placeholder">
                <div class="img-icon">🖼</div>
              </div>
              <p class="banner-label">Featured Banner 1</p>
              <div class="mini-upload">
                <span>↑ Upload Image</span>
              </div>
            </div>
          </div>
        </section>

        <section class="content-card">
          <h2 class="card-title">Promotional Banner</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" />
            </div>
          </div>
          <div class="input-group">
            <label>Description</label>
            <textarea rows="3"></textarea>
          </div>
          <div class="upload-section">
            <label>Hero Banner Image</label>
            <div class="upload-box">
              <span class="upload-icon">↑</span>
              <span>Upload New Banner</span>
            </div>
          </div>
        </section>
      </div>

      <div class="column">
        <section class="content-card">
          <h2 class="card-title">Section 3</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" />
            </div>
          </div>
          <div class="input-group">
            <label>Button Text</label>
            <textarea rows="3"></textarea>
          </div>
        </section>

        <section class="content-card">
          <h2 class="card-title">Editor Picks</h2>
          <div class="input-row">
            <div class="input-group">
              <label>Title</label>
              <input type="text" />
            </div>
            <div class="input-group">
              <label>Subtitle</label>
              <input type="text" />
            </div>
          </div>
          <div class="input-group">
            <label>Button Text</label>
            <textarea rows="3"></textarea>
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
</template>

<style scoped>
/* Container & Layout */
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
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;
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
</style>
