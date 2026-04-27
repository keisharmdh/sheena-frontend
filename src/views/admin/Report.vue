<template>
  <div class="sales-report-container">
    <header class="report-header">
      <div class="title-area">
        <h1 class="serif-title">Sales Report</h1>
        <p class="subtitle">Monitor your sales performance from Shopee marketplace</p>
      </div>
    </header>

    <section class="stats-grid">
      <div v-for="(stat, index) in topStats" :key="index" class="stat-card">
        <div class="stat-icon-box">
          <span class="stat-icon">{{ stat.icon }}</span>
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-growth" :class="stat.trend">
            {{ stat.growth }} <span class="trend-text">from last year</span>
          </p>
        </div>
      </div>
    </section>

    <section class="download-section admin-card">
      <h2 class="serif-card-title">Download Sales Report</h2>
      <div class="download-form">
        <div class="form-group">
          <label>Start Date</label>
          <input type="date" class="admin-input" v-model="filter.startDate" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="date" class="admin-input" v-model="filter.endDate" />
        </div>
        <button class="btn-download" @click="handleDownload">
          <span class="icon">📥</span> Download Report
        </button>
      </div>
      <p class="helper-text">
        Report will be downloaded in CSV format with detailed transaction data
      </p>
    </section>

    <section class="recap-section admin-card">
      <h2 class="serif-card-title">Monthly Sales Recap</h2>
      <div class="table-responsive">
        <table class="report-table">
          <thead>
            <tr>
              <th>MONTH</th>
              <th>REVENUE</th>
              <th>ORDERS</th>
              <th>GROWTH</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in monthlyData" :key="index">
              <td class="month-cell">{{ row.month }}</td>
              <td class="revenue-cell">{{ row.revenue }}</td>
              <td class="orders-cell">{{ row.orders }} orders</td>
              <td>
                <span class="growth-badge" :class="row.growthType">
                  {{ row.growthValue }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <footer class="sync-footer">
      <p>
        <strong>Note:</strong> Sales data is automatically synchronized from Shopee marketplace. For
        detailed transaction information, please refer to your Shopee seller center.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Top Statistics Data
const topStats = ref([
  { icon: "$", label: "Total Revenue", value: "Rp 2,605,490", growth: "+23.4%", trend: "positive" },
  { icon: "📈", label: "Total Orders", value: "1677", growth: "+18.2%", trend: "positive" },
  { icon: "📅", label: "Avg. Order Value", value: "Rp 1,554", growth: "+4.3%", trend: "positive" },
]);

// Download Filter
const filter = reactive({
  startDate: "",
  endDate: "",
});

// Table Data
const monthlyData = ref([
  {
    month: "January 2024",
    revenue: "Rp 145,230",
    orders: "89",
    growthValue: "+12%",
    growthType: "pos",
  },
  {
    month: "February 2024",
    revenue: "Rp 167,890",
    orders: "102",
    growthValue: "+15.6%",
    growthType: "pos",
  },
  {
    month: "March 2024",
    revenue: "Rp 198,450",
    orders: "125",
    growthValue: "+18.2%",
    growthType: "pos",
  },
  {
    month: "April 2024",
    revenue: "Rp 176,320",
    orders: "98",
    growthValue: "-11.1%",
    growthType: "neg",
  },
  {
    month: "May 2024",
    revenue: "Rp 203,560",
    orders: "134",
    growthValue: "+15.4%",
    growthType: "pos",
  },
  {
    month: "June 2024",
    revenue: "Rp 189,670",
    orders: "115",
    growthValue: "-6.8%",
    growthType: "neg",
  },
  {
    month: "July 2024",
    revenue: "Rp 221,340",
    orders: "145",
    growthValue: "+16.7%",
    growthType: "pos",
  },
  {
    month: "August 2024",
    revenue: "Rp 234,120",
    orders: "156",
    growthValue: "+5.8%",
    growthType: "pos",
  },
  {
    month: "September 2024",
    revenue: "Rp 198,900",
    orders: "128",
    growthValue: "-15.0%",
    growthType: "neg",
  },
  {
    month: "October 2024",
    revenue: "Rp 267,450",
    orders: "178",
    growthValue: "+34.5%",
    growthType: "pos",
  },
  {
    month: "November 2024",
    revenue: "Rp 289,670",
    orders: "192",
    growthValue: "+8.3%",
    growthType: "pos",
  },
  {
    month: "December 2024",
    revenue: "Rp 312,890",
    orders: "215",
    growthValue: "+8.0%",
    growthType: "pos",
  },
]);

const handleDownload = () => {
  console.log("Downloading report for:", filter.startDate, "to", filter.endDate);
  alert("Report download started...");
};
</script>

<style scoped>
/* Container & Layout */
.sales-report-container {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
}

/* Typography */
.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 32px;
  margin: 0;
}

.subtitle {
  color: #999;
  font-size: 14px;
  margin-top: 4px;
}

.serif-card-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 24px;
  margin-bottom: 25px;
}

.report-table {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
}

/* Stat Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 35px 0;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

.stat-icon-box {
  width: 45px;
  height: 45px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #8c6a43;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #8c6a43;
  margin: 0;
}

.stat-label {
  font-size: 14px;
  color: #999;
  margin: 4px 0 10px 0;
}

.stat-growth {
  font-size: 12px;
  font-weight: 700;
}

.stat-growth.positive {
  color: #27ae60;
}
.trend-text {
  color: #bbb;
  font-weight: 400;
  margin-left: 4px;
}

/* Admin Card Common */
.admin-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #f0f0f0;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}

/* Download Form */
.download-form {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.form-group label {
  font-size: 12px;
  font-weight: 700;
  color: #333;
}

.admin-input {
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
}

.btn-download {
  background: #8c6a43;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}

.btn-download:hover {
  background: #715536;
}

.helper-text {
  font-size: 12px;
  color: #bbb;
  margin: 0;
}

/* Table Styles */
.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th {
  text-align: left;
  font-size: 11px;
  color: #bbb;
  padding: 15px 10px;
  border-bottom: 1px solid #f8f9fa;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.report-table td {
  padding: 18px 10px;
  font-size: 14px;
  border-bottom: 1px solid #f8f9fa;
}

.month-cell {
  color: #333;
  font-weight: 500;
}
.revenue-cell {
  color: #333;
  font-weight: 700;
}
.orders-cell {
  color: #999;
}

/* Badges */
.growth-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 800;
}

.growth-badge.pos {
  background: #e8f8f0;
  color: #27ae60;
}
.growth-badge.neg {
  background: #fdecec;
  color: #eb5757;
}

/* Sync Footer */
.sync-footer {
  margin-top: 40px;
  background: #f3f3f3;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 12px;
  color: #7a8ba3;
  line-height: 1.6;
}
</style>
