<template>
  <footer class="footer">
    <div class="container">
      <!-- COL 1 -->
      <div class="col">
        <p class="titlefooter">ABOUT SHEENA</p>
        <p class="desc">
          Crafting timeless elegance since 1985. Each piece tells a story of exceptional
          craftsmanship and refined design.
        </p>
      </div>

      <!-- COL 2 -->
      <div class="col">
        <p class="titlefooter">SHOP</p>
        <ul>
          <li>New Arrival</li>
          <li>Sale</li>
        </ul>
      </div>

      <!-- COL 3 -->
      <div class="col">
        <p class="titlefooter">HELP</p>
        <ul>
          <li>Contact Us</li>
          <li>Size Guide</li>
          <li>FAQ</li>
        </ul>
      </div>

      <!-- COL 4 -->
      <div class="col">
        <p class="titlefooter">FOLLOW</p>
        <ul>
          <li>Instagram</li>
          <li>Shopee</li>
          <li>Tiktok</li>
        </ul>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="bottom">
      <p>© 2026 SHEENA. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f9f9f9;
  padding: 80px 0 0;
}

/* MAIN CONTAINER */
.container {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 0px;
  gap: 40px;
}

/* COLUMN */
.col {
  flex: 1;
}

.col:first-child {
  flex: 2; /* bisa 1.5 / 2 / 3 sesuai kebutuhan */
}

/* TITLE FOOTER */
.titlefooter {
  color: #000;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

/* DESCRIPTION */
.desc {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 17px;
  line-height: 22px;
  font-weight: 200;
}

/* LIST */
.col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 17px;
}

.col li {
  margin-bottom: 8px;
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 17px;
  font-weight: 200;
}

/* SOCIAL */
.social {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 14px;
}

/* BOTTOM BAR */
.bottom {
  border-top: 1px solid #ddd;
  margin-top: 60px;
  padding: 20px 0;
  text-align: center;
}

.bottom p {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
