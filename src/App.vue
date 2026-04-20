<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import router from "./router";
</script>

<template>
  <Header :class="['header', { scrolled: isScrolled }]" />
  <router-view />
  <Footer />
</template>
