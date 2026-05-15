<template>
  <div class="dashboard-page">
    <header class="header-section header-flex">
      <div>
        <h1 class="font-serif">Dashboard</h1>
        <p class="subtitle">Overview of your store performance</p>
      </div>

      <div class="sync-area">
        <div class="sync-buttons">
          <button class="connect-btn" @click="connectShopee">Connect Shopee</button>

          <button class="sync-btn" @click="syncShopeeData" :disabled="isSyncing">
            {{ isSyncing ? "Syncing..." : "Sync Shopee Data" }}
          </button>
        </div>

        <p v-if="syncMessage" class="sync-message">
          {{ syncMessage }}
        </p>
      </div>
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
            <tr v-for="item in paginatedProducts" :key="item.name + item.price + item.stock">
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
              <td class="text-right" :class="item.stock < 10 ? 'text-red' : 'text-emerald'">
                {{ item.stock }} products
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="currentProductPage--" :disabled="currentProductPage === 1">Prev</button>

          <span class="pagination-text">
            Page {{ currentProductPage }} of {{ totalProductPages }}
          </span>

          <button
            @click="currentProductPage++"
            :disabled="currentProductPage === totalProductPages"
          >
            Next
          </button>
        </div>
      </div>
    </section>

    <div class="bottom-grid">
      <section class="content-card p-6">
        <h2 class="font-serif mb-6">Product Collection</h2>
        <div class="list-container">
          <div v-for="col in collections" :key="col.name" class="list-item">
            <span class="dot-indicator"></span>
            <span class="item-name">{{ col.name }}</span>
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
import { ref, onMounted, computed } from "vue";
import { Box, Layers, ShoppingCart } from "lucide-vue-next";
const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const connectShopee = () => {
  window.location.href = `${API_BASE}/shopee/auth-url`;
};

// Data sesuai gambar referensi
const summary = ref({
  total_products: 0,
  total_orders: 0,
  total_items_sold: 0,
  total_revenue: 0,
  total_listings: 0,
});
const isSyncing = ref(false);
const syncMessage = ref("");

const mainStats = computed(() => [
  {
    label: "Total Stock",
    value: summary.value.total_products,
    sublabel: "Active products from Shopee",
    icon: Box,
    bgColor: "#f8f5f2",
    iconColor: "#8c6a43",
  },
  {
    label: "Total Orders",
    value: summary.value.total_orders,
    sublabel: "Orders synced from Shopee",
    icon: Layers,
    bgColor: "#e7f5f2",
    iconColor: "#2d8a7d",
  },
  {
    label: "Products Sold",
    value: summary.value.total_items_sold,
    sublabel: "Total units sold",
    icon: ShoppingCart,
    bgColor: "#fff0f0",
    iconColor: "#e54b4b",
  },
]);

const fetchSummary = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/dashboard/summary`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil summary dashboard");
    }

    summary.value = result.data;
  } catch (error) {
    console.error("Fetch summary error:", error);
  }
};

const cleanProductName = (name) => {
  return name?.replace("Meet The Sheena - ", "")?.replace("Meet The Sheena — ", "")?.trim();
};

const getCollectionName = (name) => {
  const cleaned = cleanProductName(name);
  return cleaned?.split(" ")?.[0] || "Shopee";
};

onMounted(() => {
  fetchSummary();
  fetchProducts();
  fetchBestSellers();
});

const syncShopeeData = async () => {
  isSyncing.value = true;
  syncMessage.value = "";

  try {
    // Sync Products
    await fetch(`${API_BASE}/sync/shopee/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    // Sync Orders
    await fetch(`${API_BASE}/sync/shopee/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    // Refresh dashboard summary
    await fetchSummary();
    await fetchProducts();

    syncMessage.value = "Shopee data synced successfully.";
  } catch (error) {
    console.error(error);
    syncMessage.value = "Failed to sync Shopee data.";
  } finally {
    isSyncing.value = false;
  }
};

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    console.log("Products result:", result);

    const productList = Array.isArray(result.data) ? result.data : result.data?.data || [];

    products.value = productList.map((product) => {
      const listings = product.product_listings || [];

      const validPriceListing = listings.find((item) => Number(item.price) > 0) || listings[0];

      const totalStock = listings.reduce((sum, item) => {
        return sum + Number(item.stock || 0);
      }, 0);

      return {
        name: cleanProductName(product.product_name),
        price: Number(validPriceListing?.price || 0),
        collection: getCollectionName(product.product_name),
        stock: totalStock,
        image: product.product_image || "https://placehold.co/100x120?text=Sheena",
      };
    });
  } catch (error) {
    console.error("Fetch products error:", error);
  }
};
const currentProductPage = ref(1);
const productPerPage = 5;

const paginatedProducts = computed(() => {
  const start = (currentProductPage.value - 1) * productPerPage;
  return products.value.slice(start, start + productPerPage);
});

const totalProductPages = computed(() => {
  return Math.ceil(products.value.length / productPerPage);
});

const collections = computed(() => {
  const grouped = {};

  products.value.forEach((product) => {
    grouped[product.collection] = (grouped[product.collection] || 0) + 1;
  });

  return Object.entries(grouped).map(([name, count]) => ({
    name,
    count,
  }));
});

const bestSellers = ref([]);

const fetchBestSellers = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/dashboard/best-selling`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();

    bestSellers.value = (result.data || []).map((item) => ({
      name: cleanProductName(item.product_name),
      price: Number(item.avg_price),
      sold: Number(item.total_sold),
      image: item.product_image || "https://placehold.co/100x120?text=Sheena",
    }));

    console.log("Best sellers:", bestSellers.value);
  } catch (error) {
    console.error("Fetch best sellers error:", error);
  }
};
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

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 1rem 1.5rem;
}

.pagination button {
  border: 1px solid #eee;
  background: white;
  color: #8c6a43;
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
}

.pagination button:disabled {
  color: #ccc;
  cursor: not-allowed;
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
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 0.75rem;
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

/* Best Seller */
.best-seller-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #fafafa;
  border-radius: 0.75rem;
  transition: all 0.3s;
}

.best-seller-item .item-left {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.best-thumb {
  width: 3rem;
  height: 3.5rem;
  object-fit: cover;
  border-radius: 0.375rem;
}

.best-seller-item .item-name {
  white-space: normal;
  overflow-wrap: break-word;
  word-break: normal;
  line-height: 1.35;
  margin: 0;
}

.sold-count {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8c6a43;
  white-space: nowrap;
  align-self: center;
}

/* Helpers */
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.sync-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.sync-btn {
  border: none;
  background: #8c6a43;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: 0.3s;
}

.sync-btn:hover {
  background: #755938;
}

.sync-btn:disabled {
  background: #c9b8a3;
  cursor: not-allowed;
}

.sync-message {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.text-red {
  color: #e53e3e;
  font-weight: 600;
  font-size: 0.875rem;
}

.pagination-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  font-family: "Inter", sans-serif;
}

.sync-buttons {
  display: flex;
  gap: 12px;
}

.connect-btn {
  border: 1px solid #8c6a43;
  background: white;
  color: #8c6a43;
  padding: 0.8rem 1.2rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: 0.3s;
}

.connect-btn:hover {
  background: #f8f5f2;
}
</style>
