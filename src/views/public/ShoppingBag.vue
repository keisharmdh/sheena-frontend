<template>
  <div class="cart-page">
    <div v-if="cart.isEmpty" class="empty-cart-full">
      <h2>Your bag is empty</h2>
      <router-link to="/shop">Go Shopping</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="items-list">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <img :src="item.image" />
          <div class="info">
            <h3>{{ item.name }}</h3>
            <p>Qty: {{ item.qty }}</p>
            <p>Subtotal: Rp {{ (item.price * item.qty).toLocaleString() }}</p>
            <button @click="removeItem(item.id)">Remove</button>
          </div>
        </div>
      </div>

      <div class="summary">
        <h3>Total: Rp {{ cart.totalPrice.toLocaleString() }}</h3>
        <button class="btn-checkout">Go to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../../stores/cart.js";

const cart = useCartStore();

// Fungsi untuk hapus
const removeItem = (id) => {
  if (confirm("Remove this item?")) {
    cart.removeItem(id);
  }
};
</script>

<style scoped>
.cart-page {
  padding: 150px 8% 80px;
}
.serif-title {
  font-family: serif;
  font-size: 40px;
  margin-bottom: 10px;
}
.cart-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 50px;
  margin-top: 40px;
}

.full-item-card {
  display: flex;
  gap: 25px;
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}
.full-item-card img {
  width: 120px;
  aspect-ratio: 3/4;
  object-fit: cover;
}

.cart-summary {
  border: 1px solid #eee;
  padding: 30px;
  height: fit-content;
}
.summary-line {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  color: #999;
}
.total {
  border-top: 1px solid #eee;
  padding-top: 15px;
  font-weight: bold;
  color: #1a1a1a;
}
.gold-text {
  color: #8c6a43;
}

.btn-go-checkout {
  background: #8c6a43;
  color: white;
  border: none;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
}
.btn-continue {
  background: white;
  border: 1px solid #eee;
  width: 100%;
  padding: 15px;
  cursor: pointer;
  color: #8c6a43;
}
</style>
