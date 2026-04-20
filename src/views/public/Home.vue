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

  <!-- SECTION 4 -->

  <!-- SECTION 5 -->
</template>

<style scoped>
.overlay {
  position: relative;
  height: 500px;

  /* background image */
  background-image: url("src/assets/IMG1.png");
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
</style>
