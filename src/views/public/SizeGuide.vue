<template>
  <div class="guide-container">
    <div class="back-nav" @click="$router.back()"><span>‹</span> Back to Help</div>

    <header class="guide-header">
      <span class="label">FIND YOUR FIT</span>
      <h1 class="serif-title">Size Guide</h1>
      <p class="sub-desc">Use our detailed size charts to find your perfect fit</p>
    </header>

    <section class="measure-section">
      <h2 class="section-title-serif">How to Measure</h2>
      <div class="measure-grid">
        <div class="measure-box" v-for="item in measureSteps" :key="item.title">
          <div class="icon-circle">
            <img src="../../assets/ruler-icon.svg" alt="icon" class="ruler-icon" />
          </div>
          <p class="measure-name">{{ item.title }}</p>
          <p class="measure-text">{{ item.desc }}</p>
        </div>
      </div>

      <div class="tip-box">
        <p>
          <strong>Tip:</strong> For the most accurate measurements, wear form-fitting clothing or
          your undergarments. Use a soft measuring tape and keep it parallel to the floor.
        </p>
      </div>
    </section>

    <section class="table-section">
      <h2 class="section-title-serif">Tops</h2>
      <table class="size-table">
        <thead>
          <tr>
            <th>SIZE</th>
            <th>TOP LENGTH (CM)</th>
            <th>SLEEVE LENGTH (CM)</th>
            <th>BUST (CM)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in topsData" :key="row.size">
            <td>{{ row.size }}</td>
            <td>{{ row.length }}</td>
            <td>{{ row.sleeve }}</td>
            <td>{{ row.bust }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="table-section">
      <h2 class="section-title-serif">Jacket</h2>
      <table class="size-table">
        <thead>
          <tr>
            <th>SIZE</th>
            <th>BUST (CM)</th>
            <th>WAIST (CM)</th>
            <th>HIPS (CM)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in jacketData" :key="row.size">
            <td>{{ row.size }}</td>
            <td>{{ row.bust }}</td>
            <td>{{ row.waist }}</td>
            <td>{{ row.hips }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="guide-footer">
      <p class="footer-title">STILL NEED HELP?</p>
      <p class="footer-sub">
        If you're unsure about sizing or need personalized recommendations, our customer support
        team is here to help.
      </p>
      <router-link to="/contact-us" class="btn-outline"> Contact Support </router-link>
    </footer>
  </div>
</template>

<script setup>
const measureSteps = [
  {
    title: "BUST",
    desc: "Measure around the fullest part of your bust, keeping the tape parallel to the floor.",
  },
  {
    title: "WAIST",
    desc: "Measure around the narrowest part of your waist, typically just above your belly button.",
  },
  {
    title: "HIPS",
    desc: "Measure around the fullest part of your hips, approximately 20cm below your waist.",
  },
];

const topsData = [
  { size: "S", length: "53", sleeve: "63", bust: "94" },
  { size: "M", length: "54", sleeve: "63", bust: "98" },
  { size: "L", length: "55", sleeve: "64", bust: "102" },
];

const jacketData = [
  { size: "XS", bust: "81-84", waist: "63-66", hips: "89-92" },
  { size: "S", bust: "86-89", waist: "68-71", hips: "94-97" },
  { size: "M", bust: "91-94", waist: "73-76", hips: "99-102" },
  { size: "L", bust: "96-99", waist: "78-81", hips: "104-107" },
  { size: "XL", bust: "101-104", waist: "83-86", hips: "109-112" },
];
</script>

<style scoped>
.guide-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;
}

.back-nav {
  color: #8c6a43;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 30px;
}

.guide-header {
  margin-bottom: 50px;
}
.label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #999;
}
.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 52px;
  font-weight: 400;
  margin: 10px 0;
}
.sub-desc {
  color: #888;
  font-size: 15px;
}

.section-title-serif {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
}

/* Measure Boxes */
.measure-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.measure-box {
  border: 1px solid #e8e8e8;
  padding: 30px 20px;
}

.icon-circle {
  background: #f9f6f3;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.measure-name {
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.measure-text {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
}

.tip-box {
  background: #fdfaf7;
  border: 1px solid #f0e6dc;
  padding: 20px;
  font-size: 13px;
  color: #666;
  margin-bottom: 60px;
}

/* Table Styles */
.table-section {
  margin-bottom: 60px;
}

.size-table {
  width: 100%;
  border-collapse: collapse;
}

.size-table th {
  background: #f4f1ee;
  text-align: left;
  padding: 15px;
  font-size: 11px;
  letter-spacing: 1px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}

.size-table td {
  padding: 15px;
  font-size: 13px;
  color: #666;
  border-bottom: 1px solid #eee;
}

/* Footer Support */
.guide-footer {
  text-align: left;
  border-top: 1px solid #eee;
  padding-top: 50px;
  margin-top: 80px;
}

.footer-title {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}
.footer-sub {
  color: #999;
  font-size: 13px;
  margin: 10px 0 25px;
}

.btn-outline {
  display: inline-block;
  padding: 12px 35px;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  text-decoration: none;
  font-size: 13px;
  transition: 0.3s;
}

.btn-outline:hover {
  background: #8c6a43;
  color: white;
}
</style>
