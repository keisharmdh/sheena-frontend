<template>
  <div class="about-container">
    <section class="story-section">
      <span class="label">OUR STORY</span>
      <h1 class="serif-title">About SHEENA</h1>
      <p class="description">
        Founded on the principles of quiet luxury and refined aesthetics, SHEENA celebrates the art
        of understated elegance. We believe that true style transcends trends, residing in the
        quality of craftsmanship, the integrity of materials, and the harmony of design. Founded on
        the principles of quiet luxury and refined aesthetics, SHEENA celebrates the art of
        understated elegance. We believe that true style transcends trends, residing in the quality
        of craftsmanship, the integrity of materials, and the harmony of design. We create for the
        discerning woman who values quality over quantity, who understands that luxury whispers
        rather than shouts. This is fashion with intention—pieces that become more beautiful with
        time and tell your unique story.
      </p>
    </section>

    <section class="subscribe-section">
      <span class="label">STAY CONNECTED</span>
      <h2 class="serif-title">Join Our Community</h2>
      <p class="sub-text">
        Be the first to discover new collections, exclusive offerings, and the stories behind our
        designs.
      </p>

      <form @submit.prevent="handleSubscribe" class="subscribe-form">
        <input v-model="emailInput" type="email" placeholder="Enter your email . . ." required />
        <button type="submit" class="btn-subscribe">Subscribe</button>
      </form>
      <p class="disclaimer">We respect your privacy. Unsubscribe at any time.</p>
    </section>

    <Transition name="slide-fade">
      <div v-if="showSuccessAlert" class="alert-subs">
        <div class="alert-content">
          <span class="check-icon">✓</span>
          <span class="alert-text">Thank you for subscribing!</span>
        </div>
        <button class="close-alert" @click="showSuccessAlert = false">&times;</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emailInput = ref("");
const showSuccessAlert = ref(false);

const handleSubscribe = () => {
  if (emailInput.value) {
    // Simulasi pengiriman data ke server
    console.log("Email tersimpan:", emailInput.value);

    // Munculkan alert
    showSuccessAlert.ref = false; // reset jika sedang muncul
    setTimeout(() => {
      showSuccessAlert.value = true;
      emailInput.value = ""; // Kosongkan input
    }, 100);

    // Auto close alert setelah 4 detik
    setTimeout(() => {
      showSuccessAlert.value = false;
    }, 4000);
  }
};
</script>

<style scoped>
.about-container {
  padding: 120px 20px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.label {
  display: block;
  font-size: 11px;
  letter-spacing: 3px;
  color: #8c6a43;
  margin-bottom: 20px;
  font-family: sans-serif;
}

.serif-title {
  font-family: "Playfair Display", serif;
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 30px;
  color: #1a1a1a;
}

.description {
  color: #888;
  line-height: 1.8;
  font-size: 15px;
  margin-bottom: 100px;
}

/* Subscribe Section */
.subscribe-section {
  padding-top: 50px;
  border-top: 1px solid #f0f0f0;
}

.sub-text {
  color: #666;
  margin-bottom: 40px;
}

.subscribe-form {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 20px;
}

input {
  width: 350px;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-right: none;
  font-size: 14px;
  outline: none;
}

.btn-subscribe {
  background: #8c6a43;
  color: white;
  border: none;
  padding: 0 40px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}

.btn-subscribe:hover {
  background: #755938;
}

.disclaimer {
  font-size: 11px;
  color: #aaa;
}

/* --- ALERT SUBS CSS (Persis Gambar) --- */
.alert-subs {
  position: fixed;
  top: 30px;
  right: 30px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  width: 320px;
  z-index: 10000;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.check-icon {
  width: 20px;
  height: 20px;
  border: 1px solid #8c6a43;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8c6a43;
  font-size: 12px;
}

.alert-text {
  font-size: 13px;
  color: #333;
}

.close-alert {
  background: none;
  border: none;
  color: #ccc;
  font-size: 18px;
  cursor: pointer;
}

/* Animasi Slide dari Kanan */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
