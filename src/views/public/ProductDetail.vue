<template>
  <div class="product-detail-container" v-if="product">
    <nav class="back-nav">
      <router-link to="/shop" class="back-btn">
        <span class="arrow">&lsaquo;</span> Back to Collection
      </router-link>
    </nav>

    <div class="main-detail-wrapper">
      <div class="gallery-section">
        <div class="main-image-display">
          <img :src="activeImage || product.images[0]" alt="Product display" />
        </div>
        <div class="thumbnail-row">
          <div
            v-for="(img, index) in product.images"
            :key="index"
            class="thumb-item"
            :class="{ active: activeImage === img }"
            @click="activeImage = img"
          >
            <img :src="img" alt="Thumbnail" />
          </div>
        </div>
      </div>

      <div class="info-section">
        <p class="collection-label">{{ product.collection }}</p>
        <h1 class="title-serif">{{ product.name }}</h1>
        <p class="price-text">Rp {{ product.price.toLocaleString("id-ID") }}</p>

        <p class="product-description">{{ product.description }}</p>

        <div class="option-group">
          <label>SELECT SIZE</label>
          <div class="size-chips">
            <button
              v-for="size in sizes"
              :key="size"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="button-group">
          <button class="btn-primary-filled">+ Add to Bag</button>
          <button class="btn-secondary-outline">Checkout on Shopee</button>
        </div>

        <div class="specs-accordion">
          <div class="spec-item">
            <label>MATERIAL</label>
            <p>{{ product.material }}</p>
          </div>

          <div class="spec-item">
            <label>DETAILS</label>
            <ul class="check-list">
              <li v-for="detail in product.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>

          <div class="spec-item">
            <label>CARE INSTRUCTIONS</label>
            <ul class="check-list">
              <li v-for="care in product.careInstructions" :key="care">{{ care }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <section class="related-section">
      <h2 class="title-serif text-center">You May Also Like</h2>
      <div class="related-grid">
        <div v-for="item in relatedProducts" :key="item.id" class="related-card">
          <div class="rel-img-box">
            <img :src="item.image" :alt="item.name" />
          </div>
          <h3>{{ item.name }}</h3>
          <p>Rp {{ item.price.toLocaleString("id-ID") }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.product-detail-container {
  padding: 120px 5% 80px;
  max-width: 1440px;
  margin: 0 auto;
}

.back-nav {
  margin-bottom: 40px;
}
.back-btn {
  text-decoration: none;
  font-size: 13px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
}

.main-detail-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: flex-start;
}

/* Gallery Styles */
.gallery-section {
  position: sticky;
  top: 120px;
}
.main-image-display {
  background: #f9f9f9;
  aspect-ratio: 3/4;
  margin-bottom: 20px;
}
.main-image-display img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-row {
  display: flex;
  gap: 15px;
}
.thumb-item {
  width: 80px;
  aspect-ratio: 1;
  cursor: pointer;
  border: 1px solid transparent;
}
.thumb-item.active {
  border-color: #1a1a1a;
}
.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}
.thumb-item.active img {
  opacity: 1;
}

/* Info Styles */
.title-serif {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 42px;
  font-weight: 400;
  margin: 15px 0;
}

.collection-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #8c6a43;
  text-transform: uppercase;
}

.price-text {
  font-size: 22px;
  margin-bottom: 30px;
}
.product-description {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 40px;
}

/* Options & Buttons */
.option-group label {
  display: block;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 15px;
}

.size-chips {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
}
.size-chips button {
  padding: 12px 24px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}
.size-chips button.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 60px;
}

.btn-primary-filled {
  background: #8c6a43; /* Signature Brown */
  color: white;
  border: none;
  padding: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

.btn-secondary-outline {
  background: white;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  padding: 18px;
  cursor: pointer;
}

/* Specs Accordion */
.specs-accordion {
  border-top: 1px solid #eee;
  padding-top: 40px;
}
.spec-item {
  margin-bottom: 35px;
}
.spec-item label {
  display: block;
  font-size: 11px;
  font-weight: bold;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.check-list {
  list-style: none;
  padding: 0;
}
.check-list li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}
.check-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #8c6a43;
}

/* Related Products */
.related-section {
  margin-top: 120px;
  padding-top: 80px;
  border-top: 1px solid #eee;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
}
.rel-img-box {
  aspect-ratio: 3/4;
  background: #f7f7f7;
  margin-bottom: 15px;
}
.rel-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.related-card h3 {
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 5px;
}
.related-card p {
  font-size: 14px;
  color: #888;
}

.text-center {
  text-align: center;
}

@media (max-width: 1024px) {
  .main-detail-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .gallery-section {
    position: relative;
    top: 0;
  }
}
</style>
