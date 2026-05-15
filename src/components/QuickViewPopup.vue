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

<div v-if="selectedSize" class="selector-section">
  <p class="section-label">SELECT COLOR</p>
  <div class="size-options">
    <button
      v-for="color in colors"
      :key="color"
      class="size-btn"
      :class="{ active: selectedColor === color }"
      @click="selectedColor = color"
    >
      {{ color }}
    </button>
  </div>
</div>

            <div class="actions-section">
              <button class="btn-primary" @click="handleAddToBag">+ Add to Bag</button>
              <button class="btn-shopee" @click="checkoutShopee">
                Checkout on Shopee
              </button>
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

  <transition name="toast">
  <div v-if="showToast" class="custom-toast">
    <span class="toast-icon">✓</span>
    <span>{{ toastMessage }}</span>
    <button @click="showToast = false">×</button>
  </div>
</transition>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCartStore } from "../stores/cart.js";

const props = defineProps(["isOpen", "product"]);
defineEmits(["close"]);

const cart = useCartStore();
const activeImage = ref(null);
const selectedSize = ref(null);
const selectedColor = ref(null);

const parseVariant = (variantName = "") => {
  // Format: Broken White (M)
  const parenMatch = variantName.match(/(.+?)\s*\(([^)]+)\)/);

  if (parenMatch) {
    return {
      color: parenMatch[1].trim(),
      size: parenMatch[2].trim(),
    };
  }

  // Format: Broken White,M
  const commaParts = variantName.split(",");

  if (commaParts.length >= 2) {
    return {
      color: commaParts[0].trim(),
      size: commaParts[1].trim(),
    };
  }

  return {
    color: variantName.trim(),
    size: "",
  };
};
 

const availableVariants = computed(() => {
  return props.product?.variants?.filter((variant) => variant.stock > 0) || [];
});

const sizeOrder = ["XS", "S", "M", "L", "XL"];
const sizes = computed(() => {
  const uniqueSizes = [
    ...new Set(
      availableVariants.value
        .map((variant) => parseVariant(variant.name).size)
        .filter(Boolean)
    ),
  ];

  return uniqueSizes.sort((a, b) => {
    return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
  });
});

const colors = computed(() => {
  if (!selectedSize.value) return [];

  return [
    ...new Set(
      availableVariants.value
        .filter((variant) => parseVariant(variant.name).size === selectedSize.value)
        .map((variant) => parseVariant(variant.name).color)
    ),
  ];
});

const selectedVariant = computed(() => {
  if (!selectedSize.value || !selectedColor.value) return null;

  return availableVariants.value.find((variant) => {
    const parsed = parseVariant(variant.name);

    return parsed.size === selectedSize.value && parsed.color === selectedColor.value;
  });
});

watch(
  () => props.product,
  (newProd) => {
    if (newProd) {
      activeImage.value = newProd.images?.[0] || newProd.image;
      selectedSize.value = null;
      selectedColor.value = null;
    }
  }
);

watch(selectedSize, () => {
  selectedColor.value = null;
});


const formatPrice = (val) => `Rp ${Number(val || 0).toLocaleString("id-ID")}`;

const handleAddToBag = () => {
  if (!selectedSize.value) {
    alert("Please select a size first.");
    return;
  }

  if (!selectedColor.value) {
    alert("Please select a color first.");
    return;
  }

  cart.addItem({
    id: `${props.product.id}-${selectedVariant.value.id}`,
    name: props.product.name,
    price: selectedVariant.value.price || props.product.price,
    image: props.product.image,
    size: selectedSize.value,
    color: selectedColor.value,
  });

  triggerToast("Added to bag");
};

const toastMessage = ref("");
const showToast = ref(false);

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const checkoutShopee = () => {
  if (!props.product?.shopeeUrl) {
    alert("Shopee link is not available.");
    return;
  }

  window.open(props.product.shopeeUrl, "_blank");
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
  cursor: pointer;
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

.custom-toast {
  position: fixed;
  top: 32px;
  right: 48px;
  z-index: 9999;

  min-width: 360px;
  padding: 18px 22px;

  background: white;
  border: 1px solid #eee;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  display: flex;
  align-items: center;
  gap: 14px;

  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 15px;
  color: #1a1a1a;
}

.toast-icon {
  width: 24px;
  height: 24px;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
}

.custom-toast button {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #bbb;
  font-size: 22px;
  cursor: pointer;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
