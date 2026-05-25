<template>
  <div class="manage-content-page">
    <header class="page-header">
      <div class="header-left">
        <h1 class="serif-title">Manage Content</h1>
        <p class="subtitle">Update website content, text, and images</p>
      </div>
      <button class="btn-edit-data" @click="saveContent">
        <Save class="save-icon" />
        Save Data
      </button>
    </header>

    <div class="accordion-container">
      <div class="section-card" :class="{ 'is-open': activeSections.about }">
        <div class="section-header" @click="toggleSection('about')">
          <h2 class="serif-card-title">About Footer</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div class="form-group">
            <label>Footer Title</label>
            <input
              v-model="form.footer_about_title"
              type="text"
              class="admin-input"
              placeholder="ABOUT SHEENA"
            />
          </div>
          <div class="form-group">
            <label>Brand Description</label>
            <textarea v-model="form.footer_about_desc" class="admin-textarea" rows="4"></textarea>
          </div>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.social }">
        <div class="section-header" @click="toggleSection('social')">
          <h2 class="serif-card-title">Social Media Links</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div v-for="(social, index) in socialLinks" :key="index" class="pill-item">
            <div class="pill-left">
              <div class="icon-circle">🔗</div>

              <template v-if="social.isEditing">
                <input
                  v-model="social.platform"
                  type="text"
                  class="admin-input social-name-input"
                  placeholder="Platform name"
                />

                <input
                  v-model="social.url"
                  type="text"
                  class="admin-input social-url-input"
                  placeholder="Social media URL"
                />
              </template>

              <template v-else>
                <span class="platform-name">
                  {{ social.platform }}
                </span>

                <span class="url-text">
                  {{ social.url }}
                </span>
              </template>

              <transition name="toast">
                <div v-if="showToast" class="custom-toast">
                  <span class="toast-icon">✓</span>

                  <span>{{ toastMessage }}</span>

                  <button @click="showToast = false">×</button>
                </div>
              </transition>
            </div>

            <div class="pill-actions">
              <button class="action-btn" @click.stop="toggleEditSocial(social)">✎</button>
              <button class="action-btn delete" @click.stop="removeSocialLink(index)">🗑</button>
            </div>
          </div>

          <button class="btn-dashed-add" @click="addSocialLink">+ ADD NEW SOCIAL MEDIA</button>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.contact }">
        <div class="section-header" @click="toggleSection('contact')">
          <h2 class="serif-card-title">Contact Information</h2>
          <span class="arrow-toggle">▼</span>
        </div>

        <div class="section-body">
          <div class="form-row">
            <div class="form-group">
              <label>Email Address</label>
              <input
                v-model="form.contact_email"
                type="email"
                class="admin-input"
                :class="{ 'input-error': errors.email }"
                @input="validateEmail"
                placeholder="example@domain.com"
              />
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label>Phone Number</label>
              <input
                v-model="form.contact_phone"
                type="text"
                class="admin-input"
                :class="{ 'input-error': errors.phone }"
                @input="cleanPhoneInput"
                placeholder="Hanya angka (e.g. 081311983690)"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Email Note</label>
              <input v-model="form.contact_email_note" type="text" class="admin-input" />
            </div>

            <div class="form-group">
              <label>Phone Note</label>
              <input v-model="form.contact_phone_note" type="text" class="admin-input" />
            </div>
          </div>

          <div class="form-group mt-4">
            <label>Boutique Address</label>
            <textarea v-model="form.contact_address" class="admin-textarea" rows="3"></textarea>
          </div>

          <div class="form-group mt-4">
            <label>Address Note</label>
            <input v-model="form.contact_address_note" type="text" class="admin-input" />
          </div>
        </div>
      </div>
      <div class="section-card" :class="{ 'is-open': activeSections.size }">
        <div class="section-header" @click="toggleSection('size')">
          <h2 class="serif-card-title">Size Guide</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <h4 class="sub-label">Page Header</h4>
          <div class="form-group">
            <label>Subtitle</label>
            <input v-model="form.size_label" type="text" class="admin-input" />
          </div>
          <div class="form-group">
            <label>Main Title</label>
            <input v-model="form.size_title" type="text" class="admin-input" />
          </div>
          <div class="form-group">
            <label>Short Description</label>
            <textarea v-model="form.size_description" class="admin-textarea"></textarea>
          </div>

          <h4 class="sub-label mt-6">How to Measure</h4>
          <div class="measure-grid">
            <div v-for="(item, index) in measureSteps" :key="index" class="measure-card">
              <div class="icon-circle mb-2">📏</div>

              <input v-model="item.title" type="text" class="admin-input center" />

              <textarea v-model="item.desc" class="admin-textarea mt-2"></textarea>
            </div>
          </div>

          <h4 class="sub-label mt-6">Size Table Editor</h4>
          <div class="table-container">
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
                <tr v-for="(row, index) in sizeTopsTable" :key="index">
                  <td>
                    <input v-model="row.size" class="table-input" />
                  </td>
                  <td>
                    <input v-model="row.length" class="table-input" />
                  </td>
                  <td>
                    <input v-model="row.sleeve" class="table-input" />
                  </td>
                  <td>
                    <input v-model="row.bust" class="table-input" />
                  </td>
                  <td>
                    <button class="action-btn delete" @click="removeSizeRow(index)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="text-gold mt-2" @click="addSizeRow">+ ADD ROW</button>
          </div>
        </div>
      </div>

      <div class="section-card" :class="{ 'is-open': activeSections.faq }">
        <div class="section-header" @click="toggleSection('faq')">
          <h2 class="serif-card-title">FAQ Management</h2>
          <span class="arrow-toggle">▼</span>
        </div>
        <div class="section-body">
          <div v-for="(faq, index) in faqItems" :key="index" class="faq-row">
            <div class="drag-handle">⠿</div>

            <div class="faq-content">
              <input v-model="faq.question" class="faq-input faq-q" placeholder="FAQ question" />

              <textarea
                v-model="faq.answer"
                class="faq-input faq-a"
                placeholder="FAQ answer"
                rows="2"
              ></textarea>
            </div>

            <button class="action-btn delete" @click="removeFaq(index)">🗑</button>
          </div>

          <button class="btn-dashed-add mt-4" @click="addFaq">+ ADD NEW FAQ</button>
        </div>
      </div>
    </div>

    <footer class="sync-footer">
      <p>
        <strong>Note:</strong> Product information cannot be edited here as it is automatically
        synced from Shopee marketplace. Only website content and contact information can be updated.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Save } from "lucide-vue-next";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

// State untuk mengatur accordion mana yang terbuka
const activeSections = reactive({
  about: true,
  social: false,
  contact: false,
  size: false,
  faq: false,
});

const toastMessage = ref("");
const showToast = ref(false);

const triggerToast = (message) => {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const toggleSection = (key) => {
  activeSections[key] = !activeSections[key];
};

const socialLinks = ref([
  {
    platform: "Instagram",
    url: "https://www.instagram.com/shnco___/",
    isEditing: false,
  },
  {
    platform: "Shopee",
    url: "https://shopee.co.id/shnco___",
    isEditing: false,
  },
  {
    platform: "Tiktok",
    url: "https://www.tiktok.com/@meetthesheena",
    isEditing: false,
  },
]);

const addSocialLink = () => {
  socialLinks.value.push({
    platform: "New Social",
    url: "",
    isEditing: true,
  });
};

const removeSocialLink = (index) => {
  socialLinks.value.splice(index, 1);
};

const toggleEditSocial = (social) => {
  social.isEditing = !social.isEditing;
};

const form = ref({
  footer_about_title: "ABOUT SHEENA",
  footer_about_desc:
    "Crafting timeless elegance since 1985. Each piece tells a story of exceptional craftsmanship and refined design.",

  footer_instagram_url: "https://www.instagram.com/shnco___/",
  footer_shopee_url: "https://shopee.co.id/shnco___",
  footer_tiktok_url: "https://www.tiktok.com/@meetthesheena",

  contact_email: "meetthesheena@gmail.com",
  contact_email_note: "Response within 24 hours",
  contact_phone: "+62 81311983690",
  contact_phone_note: "Mon-Fri, 9:00 AM - 6:00 PM (GMT+7)",
  contact_address: "123 Luxury Lane",
  contact_address_note: "Jakarta, Indonesia",

  size_label: "FIND YOUR FIT",
  size_title: "Size Guide",
  size_description: "Use our detailed size charts to find your perfect fit",

  size_measure_steps: JSON.stringify([
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
  ]),

  size_tops_table: JSON.stringify([
    { size: "S", length: "53", sleeve: "63", bust: "94" },
    { size: "M", length: "54", sleeve: "63", bust: "98" },
    { size: "L", length: "55", sleeve: "64", bust: "102" },
  ]),
});

const fetchContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json();

  form.value = {
    ...form.value,
    ...(result.data || {}),
  };

  if (form.value.footer_social_links) {
    socialLinks.value = JSON.parse(form.value.footer_social_links).map((item) => ({
      ...item,
      isEditing: false,
    }));
  }

  if (form.value.size_measure_steps) {
    measureSteps.value = JSON.parse(form.value.size_measure_steps);
  }
  if (form.value.size_tops_table) {
    sizeTopsTable.value = JSON.parse(form.value.size_tops_table);
  }
  if (form.value.footer_faq_items) {
    faqItems.value = JSON.parse(form.value.footer_faq_items);
  }
};

const saveContent = async () => {
  form.value.footer_social_links = JSON.stringify(
    socialLinks.value.map(({ platform, url }) => ({
      platform,
      url,
    })),
  );

  form.value.size_measure_steps = JSON.stringify(measureSteps.value);
  form.value.size_tops_table = JSON.stringify(sizeTopsTable.value);
  form.value.footer_faq_items = JSON.stringify(faqItems.value);

  const response = await fetch(`${API_BASE}/admin/home-content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
    body: JSON.stringify(form.value),
  });

  const result = await response.json();
  triggerToast("Footer content updated successfully");

  await fetchContent();
};

const sizeTopsTable = ref([
  { size: "S", length: "53", sleeve: "63", bust: "94" },
  { size: "M", length: "54", sleeve: "63", bust: "98" },
  { size: "L", length: "55", sleeve: "64", bust: "102" },
]);
const measureSteps = ref([]);

const faqItems = ref([
  {
    question: "How can I track my order?",
    answer:
      "Once your order is dispatched, you will receive an email containing the tracking number.",
  },
]);

const addSizeRow = () => {
  sizeTopsTable.value.push({
    size: "",
    length: "",
    sleeve: "",
    bust: "",
  });
};

const removeSizeRow = (index) => {
  sizeTopsTable.value.splice(index, 1);
};

const addFaq = () => {
  faqItems.value.push({
    question: "",
    answer: "",
  });
};

const removeFaq = (index) => {
  faqItems.value.splice(index, 1);
};

//FIX BUG EMIAL & PHONE VALIDATION
// 1. Deklarasikan reactive state untuk menampung error
const errors = reactive({
  email: "",
  phone: "",
});

// Memastikan input nomor telepon HANYA angka (menghapus otomatis karakter selain angka/plus di awal)
const cleanPhoneInput = () => {
  // Mengizinkan angka, jika ingin mengizinkan tanda '+' di awal bisa gunakan: .replace(/[^\d+]/g, '')
  form.value.contact_phone = form.value.contact_phone.replace(/\D/g, "");

  if (!form.value.contact_phone) {
    errors.phone = "Nomor telepon wajib diisi";
  } else {
    errors.phone = "";
  }
};

// Validasi format email secara realtime saat mengetik
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.contact_email) {
    errors.email = "Email wajib diisi";
  } else if (!emailRegex.test(form.value.contact_email)) {
    errors.email = "Format email tidak valid (harus mengandung '@' dan domain)";
  } else {
    errors.email = "";
  }
};

const saveContent = async () => {
  // Jalankan validasi akhir sebelum save
  validateEmail();
  cleanPhoneInput();

  // Jika ada error, hentikan proses save dan beri peringatan
  if (errors.email || errors.phone) {
    triggerToast("Gagal menyimpan: Mohon perbaiki format input yang salah");
    return;
  }

  form.value.footer_social_links = JSON.stringify(
    socialLinks.value.map(({ platform, url }) => ({
      platform,
      url,
    })),
  );

  form.value.size_measure_steps = JSON.stringify(measureSteps.value);
  form.value.size_tops_table = JSON.stringify(sizeTopsTable.value);
  form.value.footer_faq_items = JSON.stringify(faqItems.value);

  try {
    const response = await fetch(`${API_BASE}/admin/home-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
      body: JSON.stringify(form.value),
    });

    const result = await response.json();
    triggerToast("Footer content updated successfully");
    await fetchContent();
  } catch (error) {
    console.error(error);
    triggerToast("Terjadi kesalahan sistem saat menyimpan");
  }
};

onMounted(fetchContent);
</script>

<style scoped>
/* Base Styles */
.manage-content-page {
  padding: 40px;
  background-color: #fbfbfb;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  color: #1a1a1a;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 32px;
  margin: 0;
}

.subtitle {
  color: #aaa;
  font-size: 14px;
}

.save-icon {
  width: 18px;
  height: 18px;
}

.btn-edit-data {
  background: white;
  border: 1px solid #e5d5c5;
  color: #8c6a43;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Accordion Card */
.accordion-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.section-header {
  padding: 24px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.serif-card-title {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 22px;
  margin: 0;
}

.arrow-toggle {
  color: #ccc;
  font-size: 12px;
  transition: transform 0.3s ease;
}

.is-open .arrow-toggle {
  transform: rotate(180deg);
}

.section-body {
  max-height: 0;
  overflow: hidden;
  padding: 0 30px;
  transition: all 0.3s ease;
}

.is-open .section-body {
  max-height: 2000px; /* Nilai besar agar konten bisa scroll */
  padding: 10px 30px 30px 30px;
  border-top: 1px solid #f8f9fa;
}

/* Forms */
.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: #555;
}

.admin-input,
.admin-textarea {
  width: 100%;
  background-color: #f8f9fa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
}

/* Pill Items (Social Links) */
.pill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #e5d5c5;
  border-radius: 50px;
  margin-bottom: 12px;
}

.pill-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-circle {
  background: #f5f1ee;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.platform-name {
  font-weight: 700;
  font-size: 13px;
  min-width: 80px;
}
.url-text {
  color: #888;
  font-size: 13px;
}

/* Buttons & Icons */
.btn-dashed-add {
  width: 100%;
  padding: 14px;
  border: 1px dashed #8c6a43;
  background: transparent;
  color: #8c6a43;
  border-radius: 8px;
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  letter-spacing: 1px;
}

.action-btn {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.action-btn.delete:hover {
  color: #e74c3c;
}

/* FAQ Styles */
.faq-row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #fdfdfd;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  margin-bottom: 10px;
}

.drag-handle {
  color: #ddd;
  cursor: grab;
}
.faq-q {
  font-weight: 700;
  font-size: 13px;
  margin: 0;
}
.faq-a {
  font-size: 12px;
  color: #888;
  margin: 4px 0 0 0;
}

/* Table Styles */
.size-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.size-table th {
  text-align: left;
  font-size: 11px;
  color: #aaa;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.size-table td {
  padding: 15px 10px;
  font-size: 13px;
  font-weight: 600;
}

.text-gold {
  color: #8c6a43;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  border: none;
  background: none;
}

/* Helper */
.sub-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
  font-weight: 500;
}
.center {
  text-align: center;
}
.mt-4 {
  margin-top: 16px;
}
.mt-6 {
  margin-top: 24px;
}

.measure-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.measure-card {
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
}

/* Footer Note */
.sync-footer {
  margin-top: 40px;
  background: #ebf0f7;
  padding: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: #7a8ba3;
  line-height: 1.6;
}

.social-input {
  max-width: 360px;
  margin-left: 12px;
}

.social-name-input {
  width: 140px;
}

.social-url-input {
  width: 360px;
}

.table-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  outline: none;
}

.faq-content {
  flex: 1;
}

.faq-input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
}

.faq-input.faq-q {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 6px;
}

.faq-input.faq-a {
  font-size: 12px;
  color: #888;
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

/* Style tambahan untuk feedback validasi */
.admin-input.input-error {
  border-color: #e74c3c !important;
  background-color: #fff6f5;
}

.error-text {
  color: #e74c3c;
  font-size: 11px;
  margin-top: 4px;
  display: block;
  font-weight: 500;
}
</style>
