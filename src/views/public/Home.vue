<template>
  <!-- SECTION 1 -->
  <section class="overlay">
    <img class="bg" src="../assets/IMG1.png" />

    <div class="overlay-content">
      <p>SPRING / SUMMER 2026</p>
      <h2>Timeless Elegance</h2>
      <button>Discover Collection</button>
    </div>
  </section>

  <!-- SECTION 2 -->
  <section class="grid">
    <div class="grid-left"></div>

    <div class="grid-right"></div>
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
  padding: 12px 28px;
  background: transparent;
  border-color: white;
  border-width: 5px;
  color: white;
  font-family: "FONTSPRING DEMO - The Seasons";
  cursor: pointer;
}
</style>
