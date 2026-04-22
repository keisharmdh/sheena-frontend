<template>
  <div class="dashboard-page">
    <header class="header-section">
      <h1 class="font-serif">Dashboard</h1>
      <p class="subtitle">Overview of your store performance</p>
    </header>

    <div class="stats-grid">
      <div v-for="stat in mainStats" :key="stat.label" class="stat-card">
        <div :style="{ backgroundColor: stat.bgColor }" class="icon-container">
          <component :is="stat.icon" class="icon" :style="{ color: stat.iconColor }" />
        </div>
        <h3 class="stat-value">{{ stat.value }}</h3>
        <p class="stat-label">{{ stat.label }}</p>
        <p class="stat-sublabel">{{ stat.sublabel }}</p>
      </div>
    </div>

    <section class="content-card mb-8">
      <div class="card-header">
        <div>
          <h2 class="font-serif">Product Information</h2>
          <p class="subtitle-xs">Data automatically synced from Shopee marketplace</p>
        </div>
        <span class="badge-readonly">READ ONLY</span>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th class="text-center">Collection</th>
              <th class="text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.name">
              <td class="product-info">
                <img :src="item.image" class="product-thumb" />
                <div class="product-details">
                  <p class="product-name">{{ item.name }}</p>
                  <p class="product-price-sub">Rp {{ item.price.toLocaleString() }}</p>
                </div>
              </td>
              <td class="text-price">Rp {{ item.price.toLocaleString() }}</td>
              <td class="text-center">
                <span class="collection-tag">{{ item.collection }}</span>
              </td>
              <td class="text-right text-emerald">{{ item.stock }} units</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="bottom-grid">
      <section class="content-card p-6">
        <h2 class="font-serif mb-6">Product Collection</h2>
        <div class="list-container">
          <div v-for="col in collections" :key="col.name" class="list-item">
            <div class="item-left">
              <span class="dot-indicator"></span>
              <span class="item-name">{{ col.name }}</span>
            </div>
            <span class="item-count">{{ col.count }} products</span>
          </div>
        </div>
      </section>

      <section class="content-card p-6">
        <h2 class="font-serif mb-6">Best Selling Products</h2>
        <div class="list-container">
          <div v-for="best in bestSellers" :key="best.name" class="best-seller-item">
            <div class="item-left">
              <img :src="best.image" class="best-thumb" />
              <div>
                <p class="item-name">{{ best.name }}</p>
                <p class="product-price-sub">Rp {{ best.price.toLocaleString() }}</p>
              </div>
            </div>
            <span class="sold-count">{{ best.sold }} sold</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Box, Layers, ShoppingCart } from "lucide-vue-next";

// Data sesuai gambar referensi
const mainStats = ref([
  {
    label: "Total Products",
    value: "90",
    sublabel: "Active products from Shopee",
    icon: Box,
    bgColor: "#f8f5f2",
    iconColor: "#8c6a43",
  },
  {
    label: "Orders to Ship",
    value: "4",
    sublabel: "Pending orders to pack",
    icon: Layers,
    bgColor: "#e7f5f2",
    iconColor: "#2d8a7d",
  },
  {
    label: "Products Sold",
    value: "247",
    sublabel: "Total units sold",
    icon: ShoppingCart,
    bgColor: "#fff0f0",
    iconColor: "#e54b4b",
  },
]);

const products = ref([
  {
    name: "Diana Cashmere Dress",
    price: 2890000,
    collection: "Diana",
    stock: 16,
    image: "https://placehold.co/100x120?text=Diana",
  },
  {
    name: "Miyari Silk Blouse",
    price: 1190000,
    collection: "Miyari",
    stock: 20,
    image: "https://placehold.co/100x120?text=Miyari",
  },
  {
    name: "Diana Cashmere Cardigan",
    price: 2490000,
    collection: "Diana",
    stock: 14,
    image: "https://placehold.co/100x120?text=Cardigan",
  },
]);

const collections = ref([
  { name: "Diana", count: 2 },
  { name: "Myza", count: 1 },
  { name: "Valerie", count: 1 },
  { name: "Miyari", count: 1 },
]);

const bestSellers = ref([
  {
    name: "Diana Cashmere Dress",
    price: 2890000,
    sold: 61,
    image: "https://placehold.co/100x120?text=Diana",
  },
  {
    name: "Miyari Silk Blouse",
    price: 1190000,
    sold: 68,
    image: "https://placehold.co/100x120?text=Miyari",
  },
]);
</script>

<style scoped>
/* Base Layout */
.dashboard-page {
  padding: 30px 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}
.font-serif {
  font-family: "Playfair Display", serif;
  font-weight: 500;
  color: #1a1a1a;
  margin: 0;
}
.mb-8 {
  margin-bottom: 2rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}

/* Header */
.header-section {
  margin-bottom: 2rem;
}
.header-section h1 {
  font-size: 2.5rem;
}
.subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 4px;
}
.subtitle-xs {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 4px;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.icon-container {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.stat-value {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}
.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin-top: 0.25rem;
}
.stat-sublabel {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.125rem;
}

/* Content Cards */
.content-card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.badge-readonly {
  background: #f8f5f2;
  color: #8c6a43;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.05em;
}

/* Tables */
.table-wrapper {
  overflow-x: auto;
}
.data-table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
.data-table th {
  padding: 1rem 1.5rem;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9ca3af;
  border-bottom: 1px solid #f9fafb;
}
.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f9fafb;
}
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.product-thumb {
  width: 3rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 0.375rem;
  background: #f3f4f6;
}
.product-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
  margin: 0;
}
.product-price-sub {
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
}
.text-price {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.collection-tag {
  background: #f8f5f2;
  color: #8c6a43;
  font-size: 0.75rem;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
}
.text-emerald {
  color: #10b981;
  font-weight: 500;
  font-size: 0.875rem;
}

/* Grid Bawah */
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.p-6 {
  padding: 1.5rem;
}
.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fafafa;
  border-radius: 0.75rem;
}
.item-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.dot-indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background: #8c6a43;
}
.item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #1f2937;
}
.item-count {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Best Seller */
.best-seller-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #fafafa;
  border-radius: 0.75rem;
  transition: all 0.3s;
}
.best-seller-item:hover {
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.best-thumb {
  width: 2.5rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
  background: #f3f4f6;
}
.sold-count {
  font-size: 0.75rem;
  font-weight: 700;
  color: #f87171;
}

/* Helpers */
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>
