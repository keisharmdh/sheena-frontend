<template>
  <div class="faq-container">
    <div class="back-navigation" @click="$router.back()">
      <span class="arrow">‹</span> Back
    </div>

    <header class="faq-header">
      <span class="label">COMMON QUESTIONS</span>
      <h1 class="serif-title">FAQ</h1>
      <p class="sub-desc">
        Find answers to frequently asked questions about our products and services
      </p>
    </header>

    <div class="faq-list">
      <div
        v-for="(item, index) in faqData"
        :key="index"
        class="faq-item"
        :class="{ 'is-open': activeIndex === index }"
      >
        <div class="faq-question" @click="toggleAccordion(index)">
          <span>{{ item.question }}</span>
          <span class="chevron"></span>
        </div>

        <transition name="expand">
          <div v-if="activeIndex === index" class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </transition>
      </div>
    </div>

    <footer class="faq-footer">
      <p class="footer-title">STILL HAVE QUESTIONS?</p>
      <p class="footer-sub">
        Can't find the answer you're looking for? Our customer support team is ready to help.
      </p>
      <router-link to="/contact-us" class="btn-contact-support"> Contact Support </router-link>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const activeIndex = ref(null);

const faqData = ref([
  {
    question: "How do I purchase items from SHEENA?",
    answer:
      "All SHEENA products are purchased through Shopee marketplace.",
  },
]);

const fetchContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json();

  if (result.data?.footer_faq_items) {
    faqData.value = JSON.parse(result.data.footer_faq_items);
  }
};

const toggleAccordion = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
};

onMounted(fetchContent);
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: left;
}

/* Back Navigation */
.back-navigation {
  cursor: pointer;
  font-size: 13px;
  color: #8c6a43;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.faq-header {
  margin-bottom: 60px;
}

.label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #999;
}

.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 56px;
  margin: 10px 0;
  font-weight: 400;
}

.sub-desc {
  color: #888;
  font-size: 15px;
}

/* Accordion Style */
.faq-list {
  margin-bottom: 80px;
}

.faq-item {
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;
  overflow: hidden;
}

.faq-question {
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  font-family: "FONTSPRING DEMO - The Seasons";
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  transition: background 0.3s;
}

.faq-question:hover {
  background: #fafafa;
}

.chevron::after {
  content: "›";
  display: inline-block;
  transform: rotate(90deg);
  font-size: 20px;
  color: #999;
  transition: transform 0.3s;
}

.is-open .chevron::after {
  transform: rotate(-90deg);
}

.faq-answer {
  padding: 0 25px 25px 25px;
  color: #777;
  font-size: 14px;
  line-height: 1.6;
  font-family: "Inter";
}

/* Contact Support Section */
.faq-footer {
  text-align: center;
  border-top: 1px solid #eee;
  padding-top: 60px;
}

.footer-title {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: bold;
}
.footer-sub {
  font-size: 14px;
  color: #888;
  margin: 10px 0 30px;
}

.btn-contact-support {
  display: inline-block;
  padding: 15px 40px;
  border: 1px solid #8c6a43;
  color: #8c6a43;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-contact-support:hover {
  background: #8c6a43;
  color: white;
}

/* Transition Animasi Buka Tutup */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 200px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
