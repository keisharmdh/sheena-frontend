<template>
  <div class="manage-content-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="font-serif">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="edit-data-btn">
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
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Edit Data
      </button>
    </header>

    <div class="content-grid">
      <div class="grid-column">
        <section class="card">
          <h2 class="section-title">Hero Section</h2>
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
            <textarea rows="3" placeholder="Enter button description/text"></textarea>
          </div>
          <div class="upload-group">
            <label>Hero Banner Image</label>
            <div class="upload-placeholder">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8c6a43"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Upload New Banner</span>
            </div>
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">Section 2</h2>
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

          <label class="label-heading">Hero Banner Image</label>
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
              <p class="banner-label">Featured Banner 1</p>
              <div class="mini-upload">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#aaa"
                  stroke-width="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload Image
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">Promotional Banner</h2>
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
          <div class="upload-group">
            <label>Hero Banner Image</label>
            <div class="upload-placeholder">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8c6a43"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Upload New Banner</span>
            </div>
          </div>
        </section>
      </div>

      <div class="grid-column">
        <section class="card">
          <h2 class="section-title">Section 3</h2>
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

        <section class="card">
          <h2 class="section-title">Editor Picks</h2>
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

    <footer class="info-note">
      <strong>Note:</strong> Product information cannot be edited here as it is automatically synced
      from Shopee marketplace. Only website content and contact information can be updated.
    </footer>
  </div>
</template>

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
.input-group label,
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

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
