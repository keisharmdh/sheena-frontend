<template>
  <div class="login-container">
    <router-link to="/" class="back-link">
      <span class="arrow">&larr;</span> Back to Home
    </router-link>

    <div class="login-card">
      <div class="card-header">
        <div class="logo-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8c6a43"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h1 class="brand-name">Sheena</h1>
        <p class="subtitle">Enter your credentials to access the admin panel</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const router = useRouter();

const handleLogin = async () => {
  isLoading.value = true;

  // Simulasi logika login
  setTimeout(() => {
    console.log("Login attempt:", email.value);
    isLoading.value = false;
    // Jika sukses, arahkan ke dashboard admin
    // router.push('/admin/dashboard');
  }, 1500);
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8; /* Background abu-abu sangat muda sesuai visual */
  position: relative;
  font-family: "Inter", sans-serif;
}

.back-link {
  position: absolute;
  top: 40px;
  left: 40px;
  text-decoration: none;
  color: #8c6a43;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 0.7;
}

.login-card {
  background: white;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.card-header {
  margin-bottom: 40px;
}

.logo-icon {
  width: 50px;
  height: 50px;
  background: #fdfaf7;
  border: 1px solid #eee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.brand-name {
  font-family: "FONTSPRING DEMO - The Seasons", serif;
  font-size: 32px;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.subtitle {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
}

.login-form {
  text-align: left;
}

.input-group {
  margin-bottom: 24px;
}

.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #8c6a43;
}

.btn-login {
  width: 100%;
  padding: 16px;
  background-color: #8c6a43; /* Warna cokelat signature SHEENA */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.1s;
  margin-top: 10px;
}

.btn-login:hover {
  background-color: #755938;
}

.btn-login:active {
  transform: scale(0.98);
}

.btn-login:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
