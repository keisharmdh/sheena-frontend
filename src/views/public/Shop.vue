<template>
  <div class="shop-page">
    <header class="shop-header">
      <span class="label">EXPLORE</span>
      <h1 class="serif-title">Shop Collection</h1>
      <p class="product-count">{{ filteredProducts.length }} Items</p>

      <div class="category-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </header>

    <div class="shop-toolbar">
      <div class="left">
        <button class="btn-tool" @click="isFilterOpen = true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          Filter
        </button>
        <FilterPopup
          :isOpen="isFilterOpen"
          :activeCollection="activeCollection"
          @close="isFilterOpen = false"
          @update:collection="activeCollection = $event"
        />
      </div>

      <div class="right">
        <div class="view-modes">
          <button :class="{ active: gridCols === 2 }" @click="gridCols = 2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="7" height="18" />
              <rect x="14" y="3" width="7" height="18" />
            </svg>
          </button>
          <button :class="{ active: gridCols === 3 }" @click="gridCols = 3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="3" width="5" height="18" />
              <rect x="9.5" y="3" width="5" height="18" />
              <rect x="17" y="3" width="5" height="18" />
            </svg>
          </button>
          <button :class="{ active: gridCols === 1 }" @click="gridCols = 1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
        </div>

        <button class="btn-tool" @click="isSortOpen = true">
          SORT: {{ sortByLabel }}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>

    <div :class="['product-display', `grid-${gridCols}`]">
      <div
        v-for="product in sortedProducts"
        :key="product.id"
        class="product-card"
        @click="goToDetail(product.id)"
      >
        <div class="image-container">
          <img :src="product.image" :alt="product.name" />
          <button class="btn-quick-view" @click.stop="openQuickView(product)">Quick View</button>
          <span v-if="product.onSale" class="sale-tag">SALE</span>
          <button class="add-to-bag-btn">+</button>
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <div class="price-container">
            <span v-if="product.oldPrice" class="old-price">{{
              formatPrice(product.oldPrice)
            }}</span>
            <span class="current-price" :class="{ 'sale-price': product.onSale }">{{
              formatPrice(product.price)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <QuickView
      :isOpen="isQuickViewOpen"
      :product="selectedProduct"
      @close="isQuickViewOpen = false"
    />

    <FilterPopup
      :isOpen="isFilterOpen"
      :activeCollection="activeCollection"
      @close="isFilterOpen = false"
      @update:collection="activeCollection = $event"
    />

    <SortPopup
      :isOpen="isSortOpen"
      :currentSort="sortBy"
      @close="isSortOpen = false"
      @update:sort="sortBy = $event"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FilterPopup from "../../components/FilterPopup.vue";
import SortPopup from "../../components/SortPopup.vue";
import QuickView from "../../components/QuickViewPopup.vue";

// States untuk UI
const gridCols = ref(2);
const isFilterOpen = ref(false);
const isSortOpen = ref(false);
const viewMode = ref("grid");
const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const openQuickView = (product) => {
  selectedProduct.value = product;
  isQuickViewOpen.value = true;
};

const goToDetail = (productId) => {
  // Logika untuk pindah ke halaman detail produk
  console.log("Pindah ke halaman detail produk dengan ID:", productId);
};

// States untuk Data
const sortBy = ref("featured");
const activeCategory = ref("All");
const activeCollection = ref("All");

const categories = ["All", "New", "Vest", "Tops", "Jacket"];

// DATA PRODUK (Pastikan ini tidak kosong)
const products = ref([
  {
    id: 1,
    name: "Diana Cashmere Dress",
    collection: "NEW COLLECTION",
    price: 2890000,
    category: "Vest", // Atau Tops sesuai tab
    // Gambar utama & tambahan
    images: [
      "/img/product-1.jpg", // Gambar besar utama (seperti di visual)
      "/img/product-1-thumb1.jpg",
      "/img/product-1-thumb2.jpg",
      "/img/product-1-thumb3.jpg",
    ],
    onSale: false,
    // Deskripsi lengkap
    desc: "An exquisite cashmere dress that embodies understated luxury. Crafted from the finest cashmere, this piece drapes beautifully and offers unparalleled softness. The minimalist silhouette ensures versatility for both day and evening wear.",
    // Atribut tambahan
    material: "100% Premium Cashmere",
    details: ["Relaxed fit", "Midi length", "Side pockets"],
  },
  {
    id: 2,
    name: "Diana Cashmere Dress",
    collection: "NEW COLLECTION",
    price: 2890000,
    category: "Vest", // Atau Tops sesuai tab
    // Gambar utama & tambahan
    images: [
      "/img/product-1.jpg", // Gambar besar utama (seperti di visual)
      "/img/product-1-thumb1.jpg",
      "/img/product-1-thumb2.jpg",
      "/img/product-1-thumb3.jpg",
    ],
    onSale: false,
    // Deskripsi lengkap
    desc: "An exquisite cashmere dress that embodies understated luxury. Crafted from the finest cashmere, this piece drapes beautifully and offers unparalleled softness. The minimalist silhouette ensures versatility for both day and evening wear.",
    // Atribut tambahan
    material: "100% Premium Cashmere",
    details: ["Relaxed fit", "Midi length", "Side pockets"],
  },
  {
    id: 3,
    name: "Diana Cashmere Dress",
    collection: "NEW COLLECTION",
    price: 2890000,
    category: "Vest", // Atau Tops sesuai tab
    // Gambar utama & tambahan
    images: [
      "/img/product-1.jpg", // Gambar besar utama (seperti di visual)
      "/img/product-1-thumb1.jpg",
      "/img/product-1-thumb2.jpg",
      "/img/product-1-thumb3.jpg",
    ],
    onSale: false,
    // Deskripsi lengkap
    desc: "An exquisite cashmere dress that embodies understated luxury. Crafted from the finest cashmere, this piece drapes beautifully and offers unparalleled softness. The minimalist silhouette ensures versatility for both day and evening wear.",
    // Atribut tambahan
    material: "100% Premium Cashmere",
    details: ["Relaxed fit", "Midi length", "Side pockets"],
  },
  {
    id: 4,
    name: "Diana Cashmere Dress",
    collection: "NEW COLLECTION",
    price: 2890000,
    category: "Vest", // Atau Tops sesuai tab
    // Gambar utama & tambahan
    images: [
      "/img/product-1.jpg", // Gambar besar utama (seperti di visual)
      "/img/product-1-thumb1.jpg",
      "/img/product-1-thumb2.jpg",
      "/img/product-1-thumb3.jpg",
    ],
    onSale: false,
    // Deskripsi lengkap
    desc: "An exquisite cashmere dress that embodies understated luxury. Crafted from the finest cashmere, this piece drapes beautifully and offers unparalleled softness. The minimalist silhouette ensures versatility for both day and evening wear.",
    // Atribut tambahan
    material: "100% Premium Cashmere",
    details: ["Relaxed fit", "Midi length", "Side pockets"],
  },
]);

// 1. Logic Filter berdasarkan Kategori & Koleksi
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const categoryMatch = activeCategory.value === "All" || p.category === activeCategory.value;
    const collectionMatch =
      activeCollection.value === "All" || p.collection === activeCollection.value;
    return categoryMatch && collectionMatch;
  });
});

// 2. Logic Sorting (Ini yang dipanggil di v-for)
const sortedProducts = computed(() => {
  let list = [...filteredProducts.value];
  if (sortBy.value === "low-high") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "high-low") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy.value === "newest") {
    list.reverse();
  }
  return list;
});

const formatPrice = (val) => `Rp ${val.toLocaleString("id-ID")}`;
</script>

<style scoped>
/* Container Utama */
.shop-page {
  padding: 120px 40px; /* Memberi ruang lebih di atas agar tidak menempel header */
  max-width: 1440px;
  margin: 0 auto;
}

/* Header Section */
.shop-header {
  text-align: center;
  margin-bottom: 60px;
}

.label {
  display: block;
  font-size: 11px;
  letter-spacing: 3px;
  color: #8c6a43;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.serif-title {
  font-family: "Playfair Display", serif; /* Gunakan Google Fonts ini */
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.product-count {
  font-size: 13px;
  color: #999;
  margin-bottom: 35px;
}

/* Category Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 30px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 15px;
}

.category-tabs button {
  background: none;
  border: none;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding: 0 5px 10px;
  position: relative;
  transition: 0.3s;
}

.category-tabs button.active {
  color: #1a1a1a;
}

.category-tabs button.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #8c6a43;
}

/* Toolbar (Filter & Sort) */
.shop-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 40px;
  border-bottom: 1px solid #f0f0f0;
}

.btn-tool {
  background: none;
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  font-size: 12px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #333;
}

.btn-tool:hover {
  border-color: #8c6a43;
}

/* View Mode Toggles */
.view-modes {
  display: flex;
  gap: 15px;
  margin-right: 25px;
}

.view-modes button {
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc;
  padding: 0;
}

.view-modes button.active {
  color: #8c6a43;
}

.right {
  display: flex;
  align-items: center;
}

/* Product Grid System */
.product-display {
  display: grid;
  column-gap: 30px;
  row-gap: 50px;
  transition: all 0.5s ease-in-out;
}

.grid-1 {
  grid-template-columns: 1fr;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* Khusus Mode List (1 Kolom) */
.grid-1 {
  grid-template-columns: 1fr;
}

.grid-1 .product-card {
  display: flex; /* Membuat gambar dan teks sejajar horizontal */
  gap: 40px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 30px;
}

.grid-1 .image-container {
  width: 250px; /* Batasi lebar gambar di mode list */
  flex-shrink: 0;
}

.grid-1 .product-info {
  flex-grow: 1;
}

.grid-1 .product-info h3 {
  font-size: 20px; /* Judul sedikit lebih besar di mode list */
  margin-bottom: 10px;
}

/* Product Card */
.product-card {
  text-align: left;
}

.image-container {
  position: relative;
  background: #f7f7f7;
  overflow: hidden;
  /* Membuat kotak gambar persegi panjang elegan (aspect ratio 3:4) */
  aspect-ratio: 3 / 4;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
}

.sale-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #c64b4b;
  color: white;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: bold;
}

.add-to-bag-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: white;
  border: 1px solid #eee;
  width: 35px;
  height: 35px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.add-to-bag-btn:hover {
  background: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

/* Product Info */
.product-info h3 {
  font-family: serif;
  font-size: 15px;
  font-weight: 400;
  margin: 15px 0 5px;
  color: #1a1a1a;
}

.price-container {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.old-price {
  text-decoration: line-through;
  color: #bbb;
}

.current-price {
  color: #1a1a1a;
  font-weight: 500;
}

.sale-price {
  color: #c64b4b;
}

.btn-quick-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%); /* Mulai sedikit di bawah */
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 12px 24px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0; /* Sembunyi secara default */
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
}

.product-card:hover .btn-quick-view {
  opacity: 1;
  transform: translate(-50%, -50%); /* Naik ke tengah saat hover */
}

.btn-quick-view:hover {
  background: #1a1a1a;
  color: white;
}

/* Responsive (Mobile 1 Kolom) */
@media (max-width: 768px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: repeat(1, 1fr);
  }
  .shop-page {
    padding: 80px 20px;
  }
  .serif-title {
    font-size: 32px;
  }
}

@media (max-width: 600px) {
  .grid-1 .product-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .grid-1 .image-container {
    width: 100%;
  }
}
</style>
