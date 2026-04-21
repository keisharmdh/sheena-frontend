<template>
  <div class="faq-container">
    <div class="back-navigation" @click="$router.back()">
      <span class="arrow">‹</span> Back to Help
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
import { ref } from "vue";

const activeIndex = ref(null);

const faqData = [
  {
    question: "How do I purchase items from SHEENA?",
    answer:
      "All SHEENA products are purchased through Shopee marketplace. When you click 'Add to Bag' and proceed to checkout on our website, you will be redirected to Shopee to complete your purchase securely. This ensures you have access to multiple payment options and buyer protection.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times depend on the courier you select during Shopee checkout and your location. Express couriers typically deliver within 2-3 business days, while standard shipping may take 5-7 business days. Shopee will display the estimated delivery date for your specific address during checkout.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, returns and exchanges are handled through Shopee's return system. You can initiate a return or exchange request directly through your Shopee account within 14 days of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached. Please refer to Shopee's return policy for detailed instructions.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After completing your purchase on Shopee, you can track your order directly through your Shopee account. You will receive real-time updates on order confirmation, package shipment, delivery status, and estimated arrival time. Shopee will also send you tracking notifications via email and app.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all payment methods supported by Shopee, including credit/debit cards (Visa, Mastercard, American Express), bank transfers, ShopeePay, and cash on delivery (where available). All transactions are processed securely through Shopee's payment gateway with buyer protection.",
  },
  {
    question: "How do I know size to order?",
    answer:
      "Please refer to our detailed Size Guide which includes measurement instructions and size charts for all our products. If you're between sizes, we recommend sizing up for a more comfortable fit. You can also contact our customer support team for personalized sizing recommendations before making your purchase.",
  },
  {
    question: "What shipping couriers are available?",
    answer:
      "Shipping options follow Shopee's available couriers, which may include standard shipping, express delivery, and economy options. You can view all available couriers and their estimated delivery times during the Shopee checkout process. Courier availability may vary based on your location.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be cancelled or modified through your Shopee account before the seller ships the item. Once the order has been shipped, cancellation is no longer possible. To cancel an order, go to your Shopee account, find the order, and select 'Cancel Order'. For assistance, you can contact Shopee customer service or our support team.",
  },
  {
    question: "Are your products made form quality materials?",
    answer:
      "Yes, all SHEENA pieces are crafted from premium natural materials including cashmere, silk, merino wool, and virgin wool. We are committed to quality and sustainability, working with certified suppliers who maintain ethical and sustainable practices. Each product page includes detailed material information.",
  },
  {
    question: "How should I care for my garments?",
    answer:
      "Each product comes with specific care instructions on the label and product page. Generally, our luxury pieces require gentle care - hand washing or dry cleaning is recommended for most items. Proper care will ensure your SHEENA pieces maintain their quality and beauty for years to come.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, your privacy and security are our top priorities. All transactions are processed through Shopee's secure payment system, which is encrypted and PCI-DSS compliant. We never store your payment information on our website. Your personal data is protected according to Shopee's privacy policy and our own privacy standards.",
  },
  {
    question: "What if I recieve a damaged or incorrect item?",
    answer:
      "If you receive a damaged or incorrect item, please contact us immediately through our Contact page or initiate a return request through your Shopee account. Shopee's buyer protection ensures you can request a refund or replacement for damaged or incorrect items. Please provide photos of the issue when submitting your request.",
  },
];

const toggleAccordion = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null; // Tutup jika diklik lagi
  } else {
    activeIndex.value = index; // Buka yang baru
  }
};
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
