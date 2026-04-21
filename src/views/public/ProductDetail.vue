<template>
  <div class="product-detail-page" v-if="product">
    <nav class="detail-nav">
      <button @click="$router.back()" class="back-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Collection
      </button>
    </nav>

    <div class="main-content">
      <div class="gallery-section">
        <div class="main-image-wrapper">
          <img :src="activeImage || product.images[0]" alt="Main Product" />
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(img, idx) in product.images"
            :key="idx"
            class="thumb-item"
            :class="{ active: activeImage === img }"
            @click="activeImage = img"
          >
            <img :src="img" alt="Thumbnail" />
          </div>
        </div>
      </div>

      <div class="info-section">
        <span class="label-new">{{ product.collection }}</span>
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">Rp {{ product.price.toLocaleString("id-ID") }}</p>

        <p class="description">{{ product.desc }}</p>

        <div class="selector-group">
          <p class="group-label">SELECT SIZE</p>
          <div class="size-options">
            <button
              v-for="size in sizes"
              :key="size"
              class="size-btn"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-bag" @click="addToBag">+ Add to Bag</button>
          <a href="#" class="btn-shopee">Checkout on Shopee</a>
        </div>

        <div class="specs-container">
          <div class="spec-block">
            <p class="spec-title">MATERIAL</p>
            <p class="spec-text">{{ product.material }}</p>
          </div>

          <div class="spec-block">
            <p class="spec-title">DETAILS</p>
            <ul class="spec-list">
              <li v-for="detail in product.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>

          <div class="spec-block">
            <p class="spec-title">CARE INSTRUCTIONS</p>
            <ul class="spec-list care">
              <li v-for="care in product.careInstructions" :key="care">{{ care }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <section class="related-products">
      <h2 class="section-title">You May Also Like</h2>
      <div class="related-grid">
        <div
          v-for="item in relatedProducts"
          :key="item.id"
          class="related-card"
          @click="goToProduct(item.id)"
        >
          <div class="rel-img">
            <img :src="item.image" :alt="item.name" />
          </div>
          <h3>{{ item.name }}</h3>
          <p>Rp {{ item.price.toLocaleString("id-ID") }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const activeImage = ref(null);
const selectedSize = ref(null);
const sizes = ["XS", "S", "M", "L"];

onMounted(() => {
  const productId = route.params.id;
  fetchProductById(productId);
});

// Mock Data (Sama dengan yang ada di Shop/QuickView)
const fetchProductData = (id) => {
  // Simulasi fetch data berdasarkan ID
  product.value = {
    id: id,
    name: "Miyari Silk Blouse",
    collection: "NEW COLLECTION",
    price: 1190000,
    desc: "A timeless silk blouse featuring a fluid drape and elegant finish. Made from pure mulberry silk, this piece offers luxurious comfort and sophistication. Perfect for layering or wearing on its own.",
    images: ["/img/miyari-1.jpg", "/img/miyari-2.jpg", "/img/miyari-3.jpg"],
    material: "100% Mulberry Silk",
    details: [
      "Classic collar",
      "Long sleeves with button cuffs",
      "Mother of pearl buttons",
      "Made in France",
    ],
    careInstructions: ["Hand wash cold", "Do not wring", "Lay flat to dry", "Steam iron if needed"],
  };
  activeImage.value = product.value.images[0];
};

const relatedProducts = ref([
  { id: 101, name: "Diana Cashmere Dress", price: 2890000, image: "/img/diana-dress.jpg" },
  { id: 102, name: "Diana Cashmere Cardigan", price: 2490000, image: "/img/diana-cardigan.jpg" },
  { id: 103, name: "Valerie Wool Coat", price: 3390000, image: "/img/valerie-coat.jpg" },
]);

const goToProduct = (id) => {
  router.push(`/product/${id}`);
  window.scrollTo(0, 0);
};

onMounted(() => fetchProductData(route.params.id));
watch(
  () => route.params.id,
  (newId) => fetchProductData(newId),
);
</script>

<style scoped>
.product-detail-page {
  padding: 120px 8% 80px;
  max-width: 1600px;
  margin: 0 auto;
}

.detail-nav {
  margin-bottom: 40px;
}
.back-link {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #888;
  transition: 0.3s;
}
.back-link:hover {
  color: #1a1a1a;
}

.main-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: flex-start;
}

/* Gallery Style */
.gallery-section {
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.main-image-wrapper {
  background: #f9f9f9;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
}
.main-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
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
  opacity: 0.7;
}
.thumb-item.active img {
  opacity: 1;
}

/* Info Style */
.label-new {
  font-size: 11px;
  letter-spacing: 2px;
  color: #8c6a43;
}
.product-title {
  font-family: "Playfair Display", serif;
  font-size: 42px;
  margin: 15px 0;
  font-weight: 400;
}
.product-price {
  font-size: 22px;
  margin-bottom: 30px;
  color: #1a1a1a;
}
.description {
  color: #666;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 40px;
}

/* Selectors & Buttons */
.group-label {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 15px;
}
.size-options {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}
.size-btn {
  padding: 12px 25px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  transition: 0.3s;
  font-size: 13px;
}
.size-btn.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 60px;
}
.btn-bag {
  background: #8c6a43;
  color: white;
  border: none;
  padding: 18px;
  cursor: pointer;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.btn-shopee {
  text-align: center;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  padding: 18px;
  text-decoration: none;
  font-size: 13px;
}

/* Specs Style (Dashed Borders) */
.specs-container {
  border-top: 1px solid #eee;
  padding-top: 40px;
}
.spec-block {
  margin-bottom: 35px;
}
.spec-title {
  font-size: 11px;
  font-weight: bold;
  color: #999;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.spec-list {
  list-style: none;
  padding: 0;
}
.spec-list li {
  position: relative;
  padding-left: 20px;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}
.spec-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #8c6a43;
}

/* Related Products Section */
.related-products {
  margin-top: 120px;
  border-top: 1px solid #eee;
  padding-top: 80px;
  text-align: center;
}
.section-title {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  margin-bottom: 60px;
  font-weight: 400;
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
.related-card {
  cursor: pointer;
  text-align: left;
}
.rel-img {
  background: #f7f7f7;
  aspect-ratio: 3/4;
  margin-bottom: 15px;
  overflow: hidden;
}
.rel-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
}
.related-card:hover .rel-img img {
  transform: scale(1.05);
}
.related-card h3 {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
}
.related-card p {
  font-size: 13px;
  color: #888;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .gallery-section {
    position: relative;
    top: 0;
  }
}
</style>
