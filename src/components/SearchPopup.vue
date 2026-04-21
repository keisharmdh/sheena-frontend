<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="search-overlay" @click.self="$emit('close')">
        <div class="search-container">
          <button class="close-btn-top" @click="$emit('close')">&times;</button>

          <div class="search-input-wrapper">
            <svg
              class="search-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" stroke-width="1.5" />
              <path d="M21 21l-4.35-4.35" stroke-width="1.5" />
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Search products" autofocus />
          </div>

          <hr class="divider" />

          <div v-if="searchQuery === ''" class="search-body">
            <section class="suggested-section">
              <p class="section-title"><span class="icon-trend">↗</span> SUGGESTED SEARCHES</p>
              <div class="tag-container">
                <button
                  v-for="tag in suggestedTags"
                  :key="tag"
                  class="tag-btn"
                  @click="searchQuery = tag"
                >
                  {{ tag }}
                </button>
              </div>
            </section>

            <section class="featured-section">
              <p class="section-title">FEATURED PRODUCTS</p>
              <div class="product-list">
                <div v-for="product in featuredProducts" :key="product.id" class="product-item">
                  <img :src="product.image" :alt="product.name" class="product-img" />
                  <div class="product-info">
                    <h4>{{ product.name }}</h4>
                    <p class="product-desc">{{ product.desc }}</p>
                    <p class="product-price">{{ product.price }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div v-else-if="filteredProducts.length === 0" class="empty-state">
            <p>No products found</p>
          </div>

          <div v-else class="search-body"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({ isOpen: Boolean });
defineEmits(["close"]);

const searchQuery = ref("");

const suggestedTags = ["Cashmere", "Silk", "Wool Coat", "Trousers", "Dresses"];

const featuredProducts = ref([
  {
    id: 1,
    name: "Diana Cashmere Dress",
    desc: "100% Premium Cashmere",
    price: "Rp 2.890.000",
    image: "https://via.placeholder.com/60x80",
  },
  {
    id: 2,
    name: "Miyari Silk Blouse",
    desc: "100% Mulberry Silk",
    price: "Rp 1.190.000",
    image: "https://via.placeholder.com/60x80",
  },
  {
    id: 3,
    name: "Diana Cashmere Cardigan",
    desc: "100% Premium Cashmere",
    price: "Rp 2.490.000",
    image: "https://via.placeholder.com/60x80",
  },
]);

// Logika Filter Sederhana
const filteredProducts = computed(() => {
  if (!searchQuery.value) return [];
  return featuredProducts.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Biar nggak terlalu ke bawah */
  padding-top: 5vh;
  z-index: 10000;
}

.search-container {
  background: #fff;
  width: 95%;
  max-width: 800px;
  max-height: 85vh;
  position: relative;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.search-body::-webkit-scrollbar {
  width: 5px;
}

.search-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.search-body::-webkit-scrollbar-thumb {
  background: #8c6a43;
  border-radius: 10px;
}

.close-btn-top {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 35px;
  cursor: pointer;
}

/* Input Section */
.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.search-icon {
  color: #8c6a43;
}

input {
  border: none;
  font-size: 28px;
  font-family: serif;
  width: 100%;
  outline: none;
  color: #1a1a1a;
}

input::placeholder {
  color: #ccc;
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 0 -40px 30px -40px;
}

/* Content Sections */
.section-title {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8c6a43;
  margin-bottom: 20px;
  font-weight: 500;
}

.tag-container {
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
}

.tag-btn {
  border: 1px solid #8c6a43;
  background: none;
  padding: 8px 18px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.tag-btn:hover {
  background: #8c6a43;
  color: white;
}

/* Product List */
.product-item {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
}

.product-img {
  width: 65px;
  height: 85px;
  object-fit: cover;
  background: #f5f5f5;
}

.product-info h4 {
  font-family: serif;
  font-size: 18px;
  margin: 0 0 4px 0;
  font-weight: 400;
}

.product-desc {
  font-size: 13px;
  color: #999;
  margin-bottom: 6px;
}

.product-price {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
}

/* Empty State */
.empty-state {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: serif;
  font-size: 20px;
  color: #333;
  flex-grow: 1;
  min-height: 200px;
}

/* Animasi */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
