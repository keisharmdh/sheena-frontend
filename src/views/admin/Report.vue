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
          <component :is="stat.icon" class="stat-icon" />
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-label">{{ stat.label }}</p>
          <p class="stat-growth" :class="stat.trend">
            {{ stat.growth }} <span class="trend-text">{{ stat.growthLabel }}</span>
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
          <Download class="download-icon" /> Download Report
        </button>
      </div>
      <p class="helper-text">
        Report will be downloaded in XLSX format with detailed transaction data
      </p>
    </section>

    <section class="recap-section admin-card">
      <h2 class="serif-card-title">Sales Recap</h2>
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
            <template v-for="report in salesReports" :key="report.month_key">
              <tr class="month-row">
                <td>{{ report.month }}</td>
                <td>Rp {{ formatRupiah(report.total_revenue) }}</td>
                <td>{{ report.total_orders }}</td>
                <td :class="report.growth >= 0 ? 'growth-positive' : 'growth-negative'">
                  {{
                    report.growth === null
                      ? "-"
                      : `${report.growth >= 0 ? "+" : ""}${report.growth}%`
                  }}
                </td>
              </tr>

              <tr v-for="order in report.orders" :key="order.order_sn" class="order-row">
                <td>↳ {{ order.date }}</td>
                <td>Rp {{ formatRupiah(order.total_amount) }}</td>
                <td>{{ order.order_sn }}</td>
                <td>{{ order.status }}</td>
              </tr>
            </template>
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
    <transition name="toast">
      <div v-if="showToast" class="custom-toast">
        <span class="toast-icon">✓</span>
        <span>{{ toastMessage }}</span>
        <button @click="showToast = false">×</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { ShoppingBag, Wallet, Calculator, Download } from "lucide-vue-next";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const salesSummary = ref({
  total_orders: 0,
  total_items_sold: 0,
  total_revenue: 0,
});

const salesReports = ref([]);
const toastMessage = ref("");
const showToast = ref(false);

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const formatRupiah = (value) => {
  return Number(value || 0).toLocaleString("id-ID");
};

const fetchSalesSummary = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/sales`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    const result = await response.json();

    salesSummary.value = result.data;
  } catch (error) {
    console.error("Fetch sales summary error:", error);
  }
};

const fetchSalesReports = async () => {
  try {
    const response = await fetch(`${API_BASE}/admin/reports/sales`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    const result = await response.json();

    salesReports.value = result.data || [];
  } catch (error) {
    console.error("Fetch sales reports error:", error);
  }
};

// Top Statistics Data
const topStats = computed(() => {
  const totalRevenue = Number(salesSummary.value.total_revenue || 0);
  const totalOrders = Number(salesSummary.value.total_orders || 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return [
    {
      icon: Wallet,
      label: "Total Revenue",
      value: `Rp ${formatRupiah(totalRevenue)}`,
      growth: `${salesSummary.value.revenue_growth >= 0 ? "+" : ""}${salesSummary.value.revenue_growth || 0}%`,
      growthLabel: salesSummary.value.growth_label || "vs previous month",
      trend: Number(salesSummary.value.revenue_growth) >= 0 ? "positive" : "negative",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: totalOrders,
      growth: `${salesSummary.value.orders_growth >= 0 ? "+" : ""}${salesSummary.value.orders_growth || 0}%`,
      growthLabel: salesSummary.value.growth_label || "vs previous month",
      trend: Number(salesSummary.value.orders_growth) >= 0 ? "positive" : "negative",
    },
    {
      icon: Calculator,
      label: "Avg. Order Value",
      value: `Rp ${formatRupiah(avgOrderValue)}`,
      growth: `${salesSummary.value.avg_order_growth >= 0 ? "+" : ""}${salesSummary.value.avg_order_growth || 0}%`,
      growthLabel: salesSummary.value.growth_label || "vs previous month",
      trend: Number(salesSummary.value.avg_order_growth) >= 0 ? "positive" : "negative",
    },
  ];
});

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

// const handleDownload = () => {
//   let orderRows = [];

//   salesReports.value.forEach((month) => {
//     (month.orders || []).forEach((order) => {
//       orderRows.push({
//         month: month.month,
//         date: order.date,
//         order_sn: order.order_sn,
//         status: order.status,
//         total_amount: order.total_amount,
//       });
//     });
//   });

//   if (filter.startDate) {
//     orderRows = orderRows.filter((item) => item.date >= filter.startDate);
//   }

//   if (filter.endDate) {
//     orderRows = orderRows.filter((item) => item.date <= filter.endDate);
//   }

//   if (!orderRows.length) {
//     triggerToast("Tidak ada data pada rentang tanggal tersebut.");
//     return;
//   }

//   const rows = [
//     ["Month", "Date", "Order SN", "Status", "Revenue"],
//     ...orderRows.map((item) => [
//       item.month,
//       item.date,
//       item.order_sn,
//       item.status,
//       item.total_amount,
//     ]),
//   ];

//   const csvContent = rows.map((row) => row.map((value) => `"${value ?? ""}"`).join(",")).join("\n");

//   const blob = new Blob([csvContent], {
//     type: "text/csv;charset=utf-8;",
//   });

//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");

//   link.href = url;
//   link.download = `sales-report-${filter.startDate || "all"}-${filter.endDate || "all"}.csv`;
//   link.click();

//   URL.revokeObjectURL(url);

//   triggerToast("Sales report downloaded successfully!");
// };

const handleDownload = () => {
  // 1. Validasi: Pastikan admin sudah memilih tanggal mulai dan tanggal selesai
  if (!filter.startDate || !filter.endDate) {
    triggerToast("Gagal mendownload: Tanggal Start dan End wajib diisi!");
    return;
  }

  // 2. Validasi: Pastikan tanggal start tidak lebih besar dari tanggal end
  if (filter.startDate > filter.endDate) {
    triggerToast("Gagal mendownload: Tanggal Start tidak boleh melebihi Tanggal End.");
    return;
  }

  // 3. Trigger Toast untuk memberi tahu user proses download dimulai
  triggerToast("Memproses download Excel...");

  // 4. Hit endpoint backend langsung menggunakan window.open
  // Parameter dikirim via Query String sesuai instruksi backend
  window.open(
    `${API_BASE}/admin/dashboard/export-sales?start_date=${filter.startDate}&end_date=${filter.endDate}`,
    "_blank",
  );
};

onMounted(() => {
  fetchSalesSummary();
  fetchSalesReports();
});
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
  /* font-family: "FONTSPRING DEMO - The Seasons", serif; */
  font-family: "Inter", sans-serif;
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

.growth-positive {
  color: #27ae60;
  font-weight: 700;
}

.growth-negative {
  color: #eb5757;
  font-weight: 700;
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

.stat-icon {
  width: 22px;
  height: 22px;
  color: #8c6a43;
}

.download-icon {
  width: 18px;
  height: 18px;
  color: white;
}

.stat-growth.negative {
  color: #eb5757;
}

.month-row td {
  font-weight: 700;
  background: #fbfbfb;
  color: #1a1a1a;
}

.order-row td {
  font-size: 12px;
  color: #888;
  padding-left: 24px;
}

.custom-toast {
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 9999;
  min-width: 380px;
  background: white;
  border: 1px solid #eee;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 16px;
  color: #1a1a1a;
}

.toast-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.custom-toast button {
  margin-left: auto;
  background: transparent;
  border: none;
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

.month-row td.growth-positive {
  color: #27ae60;
}

.month-row td.growth-negative {
  color: #eb5757;
}
</style>
