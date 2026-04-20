<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <!-- LEFT -->
      <div class="left">
        <h2 class="logo">SHEENA</h2>
      </div>

      <!-- CENTER -->
      <nav class="center">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/shop">Shop</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </nav>

      <!-- RIGHT -->
      <div class="right">
        <img src="../assets/Search.svg" class="icon" />
        <img src="../assets/ShoppingBag.svg" class="icon" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showSearch = ref(false);
const showCart = ref(false);

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

const toggleCart = () => {
  showCart.value = !showCart.value;
};

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 1000;

  background: rgba(255, 255, 255, 0.75);
  transition: all 0.3s ease;
}

/* SCROLL STATE */
.header.scrolled {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* CONTAINER (INI YANG NGATUR MARGIN KIRI-KANAN) */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  height: 80px;
}

/* LOGO */
.logo {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 3.6px;
}

/* MENU */
.center ul {
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* LINK DEFAULT */
.center a {
  text-decoration: none;
  color: black;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 15px;
  letter-spacing: 1px;
}

/* ACTIVE */
.center a.router-link-exact-active {
  color: #82603d;
}

/* ICON */
.right {
  display: flex;
  gap: 70px;
}

.icon {
  width: 22px;
  cursor: pointer;
}

/* POPUP */
.popup {
  position: absolute;
  top: 80px;
  right: 40px;
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
