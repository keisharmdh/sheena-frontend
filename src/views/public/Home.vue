<template>
  <!-- SECTION 1 -->
  <section class="overlay">
    <div class="overlay-content">
      <p>SPRING / SUMMER 2026</p>
      <h2>Timeless Elegance</h2>
      <button>Discover Collection</button>
    </div>
  </section>

  <!-- SECTION 2 -->
  <section class="grid">
    <div class="grid-left">
      <img src="../public/IMG2.png" />
    </div>

    <div class="grid-right">
      <div class="top">
        <div class="box-1">
          <ul>
            <li>COLLECTION</li>
            <li>Quiet Luxury</li>
            <li>Timeless elegance meets contemporary sophistication</li>
          </ul>
        </div>
        <div class="box-2">
          <img src="../public/IMG3.png" />
        </div>
      </div>

      <div class="btm">
        <div class="box-3">
          <img src="../public/IMG4.png" />
        </div>
        <div class="box-4">
          <img src="../public/IMG5.png" />
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3 -->
  <section class="section-new-collection">
    <div class="section-header">
      <p class="label">DISCOVER</p>
      <h2 class="serif-title">New Collection</h2>
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
            <button class="btn-add-bag">+ Add to Bag</button>
          </div>
        </div>
      </div>

      <button class="nav-arrow right">&#10095;</button>
    </div>
    <div class="view-all-container">
      <router-link to="/shop" class="btn-outline">View All Products</router-link>
    </div>
  </section>

  <!-- SECTION 4 -->
  <section class="section-feature-split">
    <div class="feature-text">
      <p class="label">FEATURED</p>
      <h2 class="serif-title">The Essence of Elegance</h2>
      <p class="description">
        Curated pieces that embody timeless sophistication. Each garment is thoughtfully designed to
        elevate your wardrobe with understated luxury and enduring style.
      </p>
      <RouterLink to="/shop" class="btn-outline">View Collection</RouterLink>
    </div>
    <div class="feature-image">
      <img src="../public/IMG_FEATURE.png" alt="Featured" />
    </div>
  </section>

  <!-- SECTION 5 -->
  <section class="section-editors-picks">
    <div class="section-header">
      <p class="label">CURATED SELECTION</p>
      <h2 class="serif-title">Editor's Picks</h2>
    </div>

    <div class="picks-grid">
      <div class="pick-large">
        <div class="img-wrapper">
          <img src="../public/IMG_PICK1.png" alt="Pick 1" />
          <button class="btn-overlay-add">+ Add to Bag</button>
        </div>
        <div class="pick-info">
          <h3>Diana Cashmere Dress</h3>
          <p>Rp 2.890.000</p>
        </div>
      </div>

      <div class="pick-column">
        <div class="pick-small">
          <div class="img-wrapper">
            <img src="../public/IMG_PICK2.png" alt="Pick 2" />
            <button class="btn-mini-add">Add</button>
          </div>
          <div class="pick-info">
            <h3>Miyari Silk Blouse</h3>
            <p>Rp 1.190.000</p>
          </div>
        </div>
        <div class="pick-small">
          <div class="img-wrapper">
            <img src="../public/IMG_PICK3.png" alt="Pick 3" />
            <button class="btn-mini-add">Add</button>
          </div>
          <div class="pick-info">
            <h3>Diana Cashmere Cardigan</h3>
            <p>Rp 2.490.000</p>
          </div>
        </div>
      </div>
    </div>

    <div class="view-all-container">
      <RouterLink to="/shop" class="btn-outline">Explore Full Collection</RouterLink>
    </div>
  </section>
</template>

<script setup>
// Contoh data untuk slider
const newArrivals = [
  { id: 1, name: "Diana Cashmere Dress", price: 2890000, image: "../public/IMG_PROD1.png" },
  { id: 2, name: "Miyari Silk Blouse", price: 1190000, image: "../public/IMG_PROD2.png" },
  { id: 3, name: "Diana Cashmere Cardigan", price: 2490000, image: "../public/IMG_PROD3.png" },
  { id: 4, name: "Valerie Wool Coat", price: 3390000, image: "../public/IMG_PROD4.png" },
  { id: 5, name: "Diana Merino Sweater", price: 1890000, image: "../public/IMG_PROD5.png" },
];
</script>

<style scoped>
.overlay {
  position: relative;
  height: 500px;

  /* background image */
  background-image: url("../public/IMG1.png");
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
  grid-template-columns: min-content 1fr; /* Bagi dua utama: Kiri & Kanan */
  gap: 60px;
  margin-left: 40px;
  margin-right: 40px;
}

/* SISI KIRI */
.grid-left {
  display: block;
  line-height: 0; /* Memisahkan gambar dan teks */
}

.grid-left img {
  height: auto; /* Sesuaikan agar tidak full ke atas */
  width: auto;
  object-fit: contain;
  display: block;
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
  grid-template-columns: 1fr 1.5fr;
  gap: 20px; /* Kolom untuk teks lebih sempit dari foto */
}

.box-1 {
  display: flex;
  align-items: center;
  width: 240px;
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

.box-2 img {
  width: auto;
  height: auto; /* Atur tinggi foto grup */
  object-fit: cover;
}

/* KANAN BAWAH: Dua foto sejajar */
.btm {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.btm img {
  width: auto;
  height: 370px;
  object-fit: cover;
  align-self: stretch;
  flex-shrink: 0;
  margin-right: 30px;
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
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.slider-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari and Opera */
}

.product-item {
  min-width: 280px;
  flex: 0 0 auto;
  text-align: left;
}

.product-img {
  background: #fff;
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 20px;
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
  margin-top: 10px;
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

.feature-text .description {
  font-family: "Inter", sans-serif;
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
</style>
