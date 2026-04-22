<template>
  <HeaderComponent />
  <router-view />
  <FooterComponent />
</template>

<script setup>
import HeaderComponent from "../components/Header.vue";
import FooterComponent from "../components/Footer.vue";
</script>
