<template>
  <Transition name="fade">
    <div v-if="isOpen" class="qv-overlay" @click.self="$emit('close')">
      <div class="qv-modal">
        <button class="close-btn" @click="$emit('close')">&times;</button>

        <div class="qv-content" v-if="product">
          <div class="qv-gallery">
            <div class="main-image">
              <img :src="activeImage || product.images[0]" alt="main product" />
            </div>

            <div class="thumbnails-grid">
              <div
                v-for="(img, index) in product.images"
                :key="index"
                class="thumb-box"
                :class="{ active: activeImage === img }"
                @click="activeImage = img"
              >
                <img :src="img" alt="thumbnail" />
              </div>
            </div>
          </div>

          <div class="qv-details">
            <span class="collection-label">{{ product.collection }}</span>
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-price">{{ formatPrice(product.price) }}</p>

            <p class="product-desc">{{ product.desc }}</p>

            <div class="selector-section">
              <p class="section-label">SELECT SIZE</p>
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

            <div class="actions-section">
              <button class="btn-primary" @click="handleAddToBag">+ Add to Bag</button>
              <a href="https://shopee.co.id/yourshop" target="_blank" class="btn-shopee">
                Checkout on Shopee
              </a>
            </div>

            <div class="extra-info">
              <div class="info-group">
                <p class="info-title">MATERIAL</p>
                <p class="info-val">{{ product.material }}</p>
              </div>

              <div class="info-group">
                <p class="info-title">DETAILS</p>
                <ul>
                  <li v-for="detail in product.details" :key="detail">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";

// Props dari parent (ShopView)
const props = defineProps(["isOpen", "product"]);
defineEmits(["close"]);

// Local states
const activeImage = ref(null);
const selectedSize = ref(null);
const sizes = ["XS", "S", "M", "L", "XL"];

// Penting: Reset status saat ganti produk
watch(
  () => props.product,
  (newProd) => {
    if (newProd) {
      activeImage.value = newProd.images[0]; // Reset ke gambar pertama
      selectedSize.value = null; // Reset size yang dipilih
    }
  },
);

const formatPrice = (val) => `Rp ${val.toLocaleString("id-ID")}`;

const handleAddToBag = () => {
  if (!selectedSize.value) {
    alert("Please select a size first.");
    return;
  }
  // Logic tambahkan ke keranjang global bisa ditaruh di sini
  console.log("Added to bag:", props.product.name, "Size:", selectedSize.value);
};
</script>

<style scoped>
/* Overlay & Modal Setup */
.qv-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.qv-modal {
  background: white;
  width: 1100px;
  max-width: 95%;
  height: 90vh; /* Tinggi hampir penuh */
  overflow-y: auto; /* Agar bisa scroll jika konten panjang */
  position: relative;
  padding: 60px 50px;
  animation: slideUp 0.4s ease-out;
}

/* Kolom Kiri & Kanan */
.qv-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

/* Galeri Gambar */
.qv-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.main-image {
  background: #f7f7f7;
  aspect-ratio: 1; /* Persegi panjang vertikal sesuai visual */
  overflow: hidden;
}
.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.thumb-box {
  background: #f7f7f7;
  aspect-ratio: 1;
  border: 1px solid #eee;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}
.thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-box.active {
  opacity: 1;
  border-color: #8c6a43;
}

/* Tombol Close */
.close-btn {
  position: absolute;
  top: 25px;
  right: 25px;
  font-size: 28px;
  border: none;
  background: none;
  cursor: pointer;
  color: #aaa;
}

/* Info Details */
.collection-label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #8c6a43;
  text-transform: uppercase;
}
.product-title {
  font-family: "Playfair Display", serif;
  font-size: 40px;
  font-weight: 400;
  margin: 10px 0;
  color: #1a1a1a;
}
.product-price {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 25px;
  font-weight: 500;
}
.product-desc {
  color: #888;
  line-height: 1.7;
  font-size: 14px;
  margin-bottom: 40px;
}

/* Size Selector */
.selector-section {
  margin-bottom: 30px;
}
.section-label {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 12px;
  color: #333;
}
.size-options {
  display: flex;
  gap: 10px;
}
.size-btn {
  background: white;
  border: 1px solid #ddd;
  padding: 12px 20px;
  font-size: 13px;
  cursor: pointer;
  min-width: 55px;
}
.size-btn.active {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

/* Action Buttons */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 50px;
}
.btn-primary {
  background: #8c6a43; /* Warna cokelat sesuai visual */
  color: white;
  border: none;
  padding: 18px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}
.btn-shopee {
  text-align: center;
  color: #8c6a43;
  border: 1px solid #8c6a43;
  background: white;
  text-decoration: none;
  padding: 18px;
  font-size: 13px;
}
.btn-primary:hover {
  background: #755938;
}
.btn-shopee:hover {
  background: #fdfaf7;
}

/* Material & Details (Garis-garis putus putus) */
.extra-info {
  border-top: 1px solid #eee;
  padding-top: 40px;
}
.info-group {
  margin-bottom: 30px;
}
.info-title {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #999;
  margin-bottom: 10px;
}
.info-val {
  font-size: 14px;
  color: #666;
}
.extra-info ul {
  list-style-type: none;
  padding: 0;
  color: #666;
  font-size: 14px;
}
.extra-info li {
  padding-left: 20px;
  position: relative;
  margin-bottom: 8px;
}
.extra-info li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #8c6a43;
  font-size: 12px;
}

/* Animasi */
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
