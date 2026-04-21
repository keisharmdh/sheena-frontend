<template>
  <div class="contact-container">
    <div class="back-nav" @click="$router.back()"><span>‹</span> Back to Help</div>

    <header class="contact-header">
      <span class="label">GET IN TOUCH</span>
      <h1 class="serif-title">Contact Us</h1>
      <p class="sub-desc">
        Our customer support team is here to help you with any questions or concerns
      </p>
    </header>

    <div class="contact-content">
      <div class="info-column">
        <h2 class="section-title-serif">Contact Information</h2>

        <div class="info-items">
          <a href="mailto:meetthesheena@gmail.com" class="info-item">
            <div class="icon-circle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </div>
            <div class="item-text">
              <p class="item-label">EMAIL</p>
              <p class="item-value">meetthesheena@gmail.com</p>
              <p class="item-sub">Response within 24 hours</p>
            </div>
          </a>

          <a href="tel:+6281311983690" class="info-item">
            <div class="icon-circle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                />
              </svg>
            </div>
            <div class="item-text">
              <p class="item-label">PHONE</p>
              <p class="item-value">+62 81311983690</p>
              <p class="item-sub">Mon-Fri, 9:00 AM - 6:00 PM (GMT+7)</p>
            </div>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=123+Luxury+Lane+Jakarta+Indonesia"
            target="_blank"
            class="info-item"
          >
            <div class="icon-circle">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div class="item-text">
              <p class="item-label">ADDRESS</p>
              <p class="item-value">123 Luxury Lane</p>
              <p class="item-sub">Jakarta, Indonesia</p>
            </div>
          </a>
        </div>
      </div>

      <div class="form-column">
        <h2 class="section-title-serif">Send us a Message</h2>

        <form @submit.prevent="submitToEmail" class="contact-form">
          <div class="form-group">
            <label>NAME *</label>
            <input v-model="formData.name" type="text" placeholder="Your name" required />
          </div>

          <div class="form-group">
            <label>EMAIL *</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label>MESSAGE *</label>
            <textarea
              v-model="formData.message"
              rows="6"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-send">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const submitToEmail = () => {
  // Format subjek dan body untuk email klien
  const subject = encodeURIComponent(`Message from ${formData.name}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\n` + `Email: ${formData.email}\n\n` + `Message:\n${formData.message}`,
  );

  // Membuka aplikasi email default user
  window.location.href = `mailto:meetthesheena@gmail.com?subject=${subject}&body=${body}`;

  // Opsional: Reset form setelah kirim
  // formData.name = ''; formData.email = ''; formData.message = '';
};
</script>

<style scoped>
.contact-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 20px;
}

.back-nav {
  color: #8c6a43;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 30px;
  display: inline-block;
}

.contact-header {
  margin-bottom: 60px;
}
.label {
  font-size: 11px;
  letter-spacing: 2px;
  color: #999;
}
.serif-title {
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 52px;
  font-weight: 400;
  margin: 10px 0;
}
.sub-desc {
  color: #888;
  font-size: 15px;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.section-title-serif {
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 35px;
}

/* Info Items Style */
.info-items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.info-item {
  display: flex;
  gap: 20px;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.3s;
}
.info-item:hover {
  opacity: 0.7;
}

.icon-circle {
  background: #f9f6f3;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c6a43;
  flex-shrink: 0;
}

.item-label {
  font-weight: bold;
  font-size: 11px;
  letter-spacing: 1px;
  margin-bottom: 4px;
  color: #333;
}
.item-value {
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
}
.item-sub {
  font-size: 12px;
  color: #aaa;
}

/* Form Style */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #333;
}

input,
textarea {
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  border-bottom-color: #8c6a43;
}

.btn-send {
  background: #8c6a43;
  color: white;
  border: none;
  padding: 18px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s;
}

.btn-send:hover {
  background: #755938;
}

/* Responsive */
@media (max-width: 850px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}
</style>
