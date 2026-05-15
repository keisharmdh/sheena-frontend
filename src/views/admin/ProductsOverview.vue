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
  <tr v-for="item in filteredProducts" :key="item.sku">
    
    <td class="product-cell">
      <img :src="item.image" class="prod-img" />

      <div class="prod-info">
        <p class="prod-name">{{ item.name }}</p>
        <p class="prod-sku">SKU: {{ item.sku }}</p>
      </div>
    </td>

    <td class="price-cell">
      Rp {{ item.price.toLocaleString() }}
    </td>

    <td>
      <span class="tag-collection">
        {{ item.collection }}
      </span>
    </td>

    <td>
      <span
        :class="[
          'stock-text',
          item.stock < 10 ? 'stock-low' : 'stock-normal'
        ]"
      >
        {{ item.stock }} products
      </span>
    </td>

    <td class="size-text">
      <ul class="size-list">
        <li v-for="size in item.sizes" :key="size">
          {{ size.replace(',', ' (') + ')' }}
        </li>
      </ul>
    </td>

    <td>
      <span
        :class="[
          'badge-status',
          item.stock > 0 ? 'status-ready' : 'status-out'
        ]"
      >
        {{ item.stock > 0 ? 'Ready' : 'Out of Stock' }}
      </span>
    </td>

  </tr>
</tbody>
        </table>
      </div>
      <div class="table-footer">
        Showing {{ filteredProducts.length }} of {{ products.length }} products
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
import { ref, onMounted, computed } from "vue";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const searchQuery = ref("");
const products = ref([]);

const getCollectionName = (name) => {
  const productName = name.toLowerCase();

  if (productName.includes("miyari")) return "Miyari";
  if (productName.includes("myza")) return "MYZA";
  if (productName.includes("diana")) return "Diana";
  if (productName.includes("valerie")) return "Valerie";

  return "Others";
};

const cleanProductName = (name) => {
  return name
    ?.replace(/Meet The Sheena\s*[-—]?\s*/gi, "")
    ?.replace(/Shopee Indonesia/gi, "")
    ?.trim();
};

const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    const result = await response.json();

    const productList = Array.isArray(result.data)
      ? result.data
      : result.data?.data || [];

    products.value = productList.map((product) => {
      const listings = product.product_listings || [];

      const validPriceListing =
        listings.find((item) => Number(item.price) > 0) || listings[0];

      const totalStock = listings.reduce((sum, item) => {
        return sum + Number(item.stock || 0);
      }, 0);

      const sizes = [
        ...new Set(
          listings
            .map((item) => item.variant_name)
            .filter(Boolean)
        ),
      ];

      return {
        id: product.id_product,
        name: cleanProductName(product.product_name),
        sku: product.shopee_item_id || product.id_product || "-",
        price: Number(validPriceListing?.price || 0),
        collection: getCollectionName(product.product_name),
        stock: totalStock,
        sizes: sizes.length ? sizes : ["-"],
        image: product.product_image || "https://placehold.co/100x120",
      };
    });
  } catch (error) {
    console.error("Gagal fetch products:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
  });
});

onMounted(() => {
  fetchProducts();
});
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
  padding: 22px 20px;
  border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
  vertical-align: middle;
}

.product-cell {
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  align-items: center;
  gap: 15px;
}

.prod-info {
  min-width: 0;
}

.prod-name {
  font-weight: 500;
  color: #333;
  margin: 0 0 3px;
  line-height: 1.4;
  max-width: 420px;
}
.prod-img {
  width: 50px;
  height: 65px;
  object-fit: cover;
  border-radius: 5px;
  background: #f5f5f5;
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

.product-table {
  table-layout: fixed;
}

.product-table th:nth-child(1),
.product-table td:nth-child(1) {
  width: 80%;
}

.product-table th:nth-child(2),
.product-table td:nth-child(2) {
  width: 11%;
  white-space: nowrap;
}

.product-table th:nth-child(3),
.product-table td:nth-child(3) {
  width: 9%;
}

.product-table th:nth-child(4),
.product-table td:nth-child(4) {
  width: 10%;
  white-space: nowrap;
}

.product-table th:nth-child(5),
.product-table td:nth-child(5) {
  width: 18%;
}

.product-table th:nth-child(6),
.product-table td:nth-child(6) {
  width: 10%;
}

.size-list {
  margin: 0;
  padding-left: 16px;
  line-height: 1.5;
}

.size-list li {
  margin-bottom: 2px;
}

.price-cell,
.stock-text {
  white-space: nowrap;
}

.badge-status {
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  white-space: nowrap;
}

.status-ready {
  background: #e8f7ef;
  color: #22a06b;
}

.status-out {
  background: #ffeaea;
  color: #e5484d;
}

.prod-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 3px;
  line-height: 1.5;
}

.size-list {
  margin: 0;
  padding-left: 18px;
  line-height: 1.6;
}

.size-list li {
  margin-bottom: 2px;
  word-break: break-word;
}
</style>
