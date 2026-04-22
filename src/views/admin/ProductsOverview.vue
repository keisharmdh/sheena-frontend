<template>
  <div class="overview-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="font-serif">Product Overview</h1>
        <p class="subtitle">Monitoring product data from Shopee marketplace</p>
      </div>
      <span class="badge-auto-sync">AUTO-SYNCED</span>
    </header>

    <div class="toolbar">
      <div class="search-box">
        <svg
          class="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search products..." v-model="searchQuery" />
      </div>
      <button class="filter-btn">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </button>
      <div class="date-display"></div>
    </div>

    <div class="content-card">
      <div class="table-wrapper">
        <table class="product-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>COLLECTION</th>
              <th>STOCK</th>
              <th>SIZES</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.sku">
              <td class="product-cell">
                <img :src="item.image" class="prod-img" />
                <div class="prod-info">
                  <p class="prod-name">{{ item.name }}</p>
                  <p class="prod-sku">SKU: {{ item.sku }}</p>
                </div>
              </td>
              <td class="price-cell">Rp {{ item.price.toLocaleString() }}</td>
              <td>
                <span class="tag-collection">{{ item.collection }}</span>
              </td>
              <td>
                <span :class="['stock-text', item.stock < 10 ? 'stock-low' : 'stock-normal']">
                  {{ item.stock }} units
                </span>
              </td>
              <td class="size-text">{{ item.sizes.join(", ") }}</td>
              <td><span class="badge-status">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        Showing {{ products.length }} of {{ products.length }} products
      </div>
    </div>

    <footer class="note-box">
      <strong>Note:</strong> Product data is automatically integrated from Shopee marketplace and
      cannot be edited from this dashboard. All changes must be made directly in your Shopee seller
      center.
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");

const products = ref([
  {
    name: "Diana Cashmere Dress",
    sku: "000001",
    price: 2890000,
    collection: "Diana",
    stock: 34,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
  {
    name: "Miyari Silk Blouse",
    sku: "000002",
    price: 1190000,
    collection: "Miyari",
    stock: 31,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
  {
    name: "Diana Cashmere Cardigan",
    sku: "000003",
    price: 2490000,
    collection: "Diana",
    stock: 6,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
  {
    name: "Valerie Wool Coat",
    sku: "000004",
    price: 3390000,
    collection: "Valerie",
    stock: 16,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
  {
    name: "Diana Merino Sweater",
    sku: "000005",
    price: 1890000,
    collection: "Diana",
    stock: 33,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
  {
    name: "Miyari Satin Top",
    sku: "000006",
    price: 1390000,
    collection: "Miyari",
    stock: 7,
    sizes: ["S", "M", "L"],
    image: "https://placehold.co/100x120",
  },
]);
</script>

<style scoped>
.overview-page {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
}
.font-serif {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  color: #1a1a1a;
  margin: 0;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}
.subtitle {
  color: #888;
  font-size: 14px;
  margin-top: 5px;
}
.badge-auto-sync {
  background: #f1ede8;
  color: #8c6a43;
  font-size: 10px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  letter-spacing: 1px;
}

/* Toolbar */
.toolbar {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  align-items: center;
}
.search-box {
  position: relative;
  flex: 1;
  max-width: 600px;
}
.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}
.search-box input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border-radius: 10px;
  border: 1px solid #eee;
  background: white;
  outline: none;
}
.filter-btn {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #eee;
  background: white;
  cursor: pointer;
  color: #8c6a43;
}

/* Table Card */
.content-card {
  background: white;
  border-radius: 15px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}
.product-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.product-table th {
  padding: 20px;
  font-size: 11px;
  color: #aaa;
  letter-spacing: 1px;
  border-bottom: 1px solid #f5f5f5;
}
.product-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
  vertical-align: middle;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 15px;
}
.prod-img {
  width: 50px;
  height: 65px;
  object-fit: cover;
  border-radius: 5px;
  background: #f5f5f5;
}
.prod-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 3px;
}
.prod-sku {
  font-size: 12px;
  color: #bbb;
  margin: 0;
}
.price-cell {
  font-weight: 500;
  color: #444;
}
.tag-collection {
  background: #f8f5f2;
  color: #8c6a43;
  padding: 4px 15px;
  border-radius: 20px;
  font-size: 12px;
}
.stock-text {
  font-weight: 500;
}
.stock-normal {
  color: #10b981;
}
.stock-low {
  color: #f87171;
}
.size-text {
  color: #888;
  font-size: 13px;
}
.badge-status {
  background: #e7f5f2;
  color: #2d8a7d;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
}

.table-footer {
  padding: 20px;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  border-top: 1px solid #f5f5f5;
}

/* Note Box */
.note-box {
  margin-top: 30px;
  background: #f3f3f3;
  padding: 20px;
  border-radius: 12px;
  font-size: 12px;
  color: #888;
  line-height: 1.6;
}
</style>
