<template>
  <!-- SECTION 1 -->
  <section
    class="overlay"
    :style="{
      backgroundImage: `url(${homeContent.hero_image ? BASE_URL + homeContent.hero_image : '/IMG1.png'})`,
    }"
  >
    <div class="overlay-content">
      <p>{{ homeContent.hero_label || "SPRING / SUMMER 2026" }}</p>

      <h2>{{ homeContent.hero_title || "Timeless Elegance" }}</h2>

      <button @click="scrollToNewCollection">
        {{ homeContent.hero_button || "Discover Collection" }}
      </button>
    </div>
  </section>

  <!-- SECTION 2 -->
  <section class="grid">
    <div class="grid-left">
      <img
        :src="homeContent.section2_image_1 ? BASE_URL + homeContent.section2_image_1 : '/IMG2.png'"
      />
    </div>

    <div class="grid-right">
      <div class="top">
        <div class="box-1">
          <ul>
            <li>{{ homeContent.section2_label || "COLLECTION" }}</li>
            <li>{{ homeContent.section2_title || "Quiet Luxury" }}</li>
            <li>
              {{
                homeContent.section2_description ||
                "Timeless elegance meets contemporary sophistication"
              }}
            </li>
          </ul>
        </div>
        <div class="box-2">
          <img
            :src="
              homeContent.section2_image_2 ? BASE_URL + homeContent.section2_image_2 : '/IMG3.png'
            "
          />
        </div>
      </div>

      <div class="btm">
        <div class="box-3">
          <img
            :src="
              homeContent.section2_image_3 ? BASE_URL + homeContent.section2_image_3 : '/IMG4.png'
            "
          />
        </div>
        <div class="box-4">
          <img
            :src="
              homeContent.section2_image_4 ? BASE_URL + homeContent.section2_image_4 : '/IMG5.png'
            "
          />
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3 -->
  <section ref="newCollectionSection" class="section-new-collection">
    <section
      id="new-collection"
      ref="newCollectionSection"
      class="section-new-collection"
    ></section>
    <div class="section-header">
      <p class="label">{{ homeContent.section3_label || "DISCOVER" }}</p>
      <h2 class="serif-title">{{ homeContent.section3_title || "New Collection" }}</h2>
    </div>

    <div class="product-slider">
      <button class="nav-arrow left">&#10094;</button>

      <div class="slider-container">
        <div v-for="product in newArrivals" :key="product.id" class="product-item">
          <div class="product-img">
            <img :src="product.image" alt="product" />
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>Rp {{ product.price.toLocaleString("id-ID") }}</p>
            <button class="btn-add-bag" @click="openQuickView(product)">Quick View</button>
          </div>
        </div>
      </div>

      <button class="nav-arrow right">&#10095;</button>
    </div>
    <div class="view-all-container">
      <router-link to="/shop" class="btn-outline">
        {{ homeContent.section3_button || "View All Products" }}
      </router-link>
    </div>
  </section>

  <!-- SECTION 4 -->
  <section class="section-feature-split">
    <div class="feature-text">
      <p class="label">{{ homeContent.promo_label || "FEATURED" }}</p>
      <h2 class="serif-title">{{ homeContent.promo_title || "The Essence of Elegance" }}</h2>
      <p class="description">
        {{
          homeContent.promo_description ||
          "Curated pieces that embody timeless sophistication. Each garment is thoughtfully designed to elevate your wardrobe with understated luxury and enduring style."
        }}
      </p>
      <RouterLink to="/shop" class="btn-outline">View Collection</RouterLink>
    </div>
    <div class="feature-image">
      <img
        :src="homeContent.promo_image ? BASE_URL + homeContent.promo_image : '/Katalog6.png'"
        alt="Featured"
      />
    </div>
  </section>

  <!-- SECTION 5 -->
  <section class="section-editors-picks">
    <div class="section-header">
      <p class="label">{{ homeContent.editors_label || "CURATED SELECTION" }}</p>
      <h2 class="serif-title">{{ homeContent.editors_title || "Editors Picks" }}</h2>
    </div>

    <div class="picks-grid">
      <div class="pick-large">
        <div class="img-wrapper">
          <img src="../public/K1.png" alt="Pick 1" />
          <button class="btn-overlay-add">+ Add to Bag</button>
        </div>
        <div class="pick-info">
          <h3>Diana Cashmere Dress</h3>
          <p>Rp 170.000</p>
        </div>
      </div>

      <div class="pick-column">
        <div class="pick-small">
          <div class="img-wrapper">
            <img src="../public/K2.png" alt="Pick 2" />
            <button class="btn-mini-add">Add</button>
          </div>
          <div class="pick-info">
            <h3>Miyari Silk Blouse</h3>
            <p>Rp 168.000</p>
          </div>
        </div>
        <!-- <div class="pick-small">
          <div class="img-wrapper">
            <img src="../public/IMG5.png" alt="Pick 3" />
            <button class="btn-mini-add">Add</button>
          </div>
          <div class="pick-info">
            <h3>Diana Cashmere Cardigan</h3>
            <p>Rp 2.490.000</p>
          </div>
        </div> -->
      </div>
    </div>

    <div class="view-all-container">
      <RouterLink to="/shop" class="btn-outline">Explore Full Collection</RouterLink>
    </div>
  </section>

  <QuickView
    :isOpen="isQuickViewOpen"
    :product="selectedProduct"
    @close="isQuickViewOpen = false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../../stores/cart.js";
import QuickView from "../../components/QuickViewPopup.vue";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";
const BASE_URL = "https://sheena-backend-production.up.railway.app";

const cart = useCartStore();
const newCollectionSection = ref(null);
const newArrivals = ref([]);
const isQuickViewOpen = ref(false);
const selectedProduct = ref(null);

const scrollToNewCollection = () => {
  newCollectionSection.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const cleanProductName = (name) => {
  return name?.replace(/Meet The Sheena\s*[-—]?\s*/gi, "")?.trim();
};

const fetchNewArrivals = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    const productList = Array.isArray(result.data) ? result.data : result.data?.data || [];

    newArrivals.value = productList.slice(0, 5).map((product) => {
      const listings = product.product_listings || [];
      const validPriceListing = listings.find((item) => Number(item.price) > 0) || listings[0];

      return {
        id: product.id_product,
        name: cleanProductName(product.product_name),
        collection: "New Collection",
        price: Number(validPriceListing?.price || 0),
        image: product.product_image || "https://placehold.co/400x500?text=Sheena",
        images: [product.product_image || "https://placehold.co/400x500?text=Sheena"],
        variants: listings.map((item) => ({
          id: item.id_listing,
          name: item.variant_name,
          price: Number(item.price || 0),
          stock: Number(item.stock || 0),
          url: item.product_url,
        })),
        shopeeUrl: validPriceListing?.product_url || listings[0]?.product_url || "",
        desc: "Product data is synced from Shopee.",
        material: "-",
        details: [],
      };
    });
  } catch (error) {
    console.error("Fetch new arrivals error:", error);
  }
};

const openQuickView = (product) => {
  selectedProduct.value = product;
  isQuickViewOpen.value = true;
};

const homeContent = ref({});

const fetchHomeContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    headers: { Accept: "application/json" },
  });

  const result = await response.json();
  homeContent.value = result.data || {};
};

onMounted(() => {
  fetchHomeContent();
  fetchNewArrivals();
});
</script>

<style scoped>
.overlay {
  position: relative;
  height: 500px;

  /* background image */
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* DARK OVERLAY BIAR TEKS KEBACA */
.overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

/* CONTENT DI ATAS GAMBAR */
.overlay-content {
  position: relative;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 0 20px;
}

.overlay-content h2 {
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 72px;
  margin-bottom: 12px;
  font-weight: 400;
}

.overlay-content p {
  font-family: "Inter";
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 400;
  letter-spacing: 3.6px;
}

/* BUTTON */
.overlay-content button {
  padding: 14px 28px;
  background: transparent;
  border-color: white;
  border-width: 2px;
  color: white;
  font-family: "FONTSPRING DEMO - The Seasons";
  cursor: pointer;
}
/* ------------------------------- */
/* Container Utama */
.grid {
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 60px;
  margin-left: 40px;
  margin-right: 40px;
  align-items: start;
}

/* SISI KIRI */
.grid-left {
  display: block;
  line-height: 0; /* Memisahkan gambar dan teks */
}

.grid-left img {
  width: 100%;
  height: 640px;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  background: #fff;
}

/* KANAN (Tempat Teks dan Foto-foto lainnya) */
.grid-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* KANAN ATAS: Dibagi dua (Teks di kiri, Foto Grup di kanan) */
.top {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 20px;
}

.box-1 {
  width: 240px;
  display: flex;
  align-items: center;
}

.box-1 ul {
  list-style: none;
  text-align: left; /* Sesuaikan jika ingin rata kanan seperti gambar */
}

.box-1 li:nth-child(1) {
  font-size: 16px;
  font-family: "Inter";
  letter-spacing: 3px;
  color: #82603d;
  margin-bottom: 10px;
  line-height: 16px;
  font-weight: 400;
}

.box-1 li:nth-child(2) {
  font-family: "FONTSPRING DEMO - The Seasons"; /* Font luxury */
  font-size: 30px;
  margin-bottom: 10px;
  line-height: 36px;
  font-weight: 400;
}

.box-1 li:nth-child(3) {
  font-size: 14px;
  font-family: "Inter";
  color: #958f7e;
  line-height: 22.75px;
  font-weight: 400;
}

.box-2 {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.box-2 img {
  width: 100%;
  height: 100%;

  object-fit: contain;

  /* INI YANG PENTING */
  object-position: top left;

  display: block;

  /* biar agak melebar ke kiri */
  transform: scale(1.12) translateX(-20px);
}

/* KANAN BAWAH: Dua foto sejajar */
.btm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.btm img {
  width: 100%;
  height: 320px;
  object-fit: contain;
  object-position: center bottom;
  display: block;
  margin-right: 0;
  background: #fff;
}

/* --- SECTION 3: NEW COLLECTION (SLIDER) --- */
.section-new-collection {
  padding: 100px 40px;
  background-color: #fdfaf7; /* Warna beige sangat muda sesuai gambar */
  text-align: center;
}

.section-header {
  margin-bottom: 50px;
}

.product-slider {
  position: relative;
  display: flex;
  align-items: center;
  margin: 50px 0;
  padding: 0 50px;
}

.slider-container {
  display: flex;
  justify-content: center;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;
  width: 100%;
}

.slider-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari and Opera */
}

.product-item {
  min-width: 220px;
  flex: 0 0 220px;
  text-align: left;
}

.product-img {
  background: #fff;
  width: 220px;
  height: 300px;
  overflow: hidden;
  margin-bottom: 16px;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-item:hover .product-img img {
  transform: scale(1.05);
}

.product-info h3 {
  font-size: 13px;
  line-height: 1.4;
  min-height: 55px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
}

.product-info p {
  font-size: 12px;
  font-family: "FONTSPRING DEMO - The Seasons";
}

.btn-add-bag {
  width: 100%;
  padding: 12px;
  background: #8c6a43; /* Warna cokelat signature */
  color: white;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: auto;
}

/* Navigasi Slider */
.nav-arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #eee;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.nav-arrow:hover {
  background: #1a1a1a;
  color: white;
}
.nav-arrow.left {
  left: 0;
}
.nav-arrow.right {
  right: 0;
}

/* --- SECTION 4: THE ESSENCE OF ELEGANCE (SPLIT) --- */
.section-feature-split {
  display: flex;
  min-height: 700px;
  align-items: stretch;
  background: #fff;
}

.feature-text {
  flex: 1;
  padding: 80px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons";
}

.feature-text .description {
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 15px;
  line-height: 1.8;
  color: #666;
  margin: 30px 0 45px;
  max-width: 450px;
}

.feature-image {
  flex: 1;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- SECTION 5: EDITOR'S PICKS (GRID) --- */
.section-editors-picks {
  padding: 120px 40px;
  background: #fff;
}

.picks-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr; /* Kolom kiri lebih besar */
  gap: 40px;
  margin: 60px 0;
}

.pick-large .img-wrapper {
  height: 850px; /* Sangat tinggi sesuai visual */
  position: relative;
}

.pick-large .btn-overlay-add {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: #8c6a43;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s;
}

.pick-column {
  display: flex;
  flex-direction: column;
  gap: 60px; /* Jarak antar item kecil vertical */
}

.pick-small {
  display: flex;
  flex-direction: column;
}

.pick-small .img-wrapper {
  height: 380px;
  position: relative;
}

.btn-mini-add {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #8c6a43;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 10px;
  cursor: pointer;
}

.pick-info h3 {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 18px;
  margin-top: 20px;
  font-weight: 400;
}

.pick-info p {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.btn-outline {
  padding: 15px 40px;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-outline:hover {
  background: #1a1a1a;
  color: white;
}

.section-header {
  display: flex;
  flex-direction: column; /* Menyusun teks secara vertikal */
  align-items: center; /* Membuat konten berada di tengah secara horizontal */
  justify-content: center;
  text-align: center; /* Memastikan teks rata tengah */
  margin-bottom: 40px; /* Jarak antara header dengan grid produk */
}

.serif-title {
  font-size: 40px;
  font-weight: 400;
}
/* RESPONSIVE */
@media (max-width: 1024px) {
  .section-feature-split {
    flex-direction: column;
  }
  .picks-grid {
    grid-template-columns: 1fr;
  }
  .pick-large .img-wrapper {
    height: 600px;
  }
  .feature-text {
    padding: 60px 40px;
  }
}

.img-wrapper {
  position: relative;
  overflow: hidden;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top center;
  display: block;
}

.pick-small .pick-info {
  margin-top: 16px;
}

.btn-mini-add,
.btn-overlay-add {
  display: none;
}
</style>
