// src/stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  // State: Tempat naruh data (seperti 'data' di Vue)
  state: () => ({
    items: [
      {
        id: 1,
        name: "Diana Cashmere Dress",
        sku: "000001",
        price: 2890000,
        qty: 2,
        size: "XS",
        color: "Natural",
        image: "/img/product-1.jpg",
      },
    ],
  }),

  // Getters: Data olahan (seperti 'computed' di Vue)
  getters: {
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.qty, 0),
    isEmpty: (state) => state.items.length === 0,
    totalItems: (state) => state.items.length,
  },

  // Actions: Fungsi untuk mengubah data (seperti 'methods' di Vue)
  actions: {
    addToCart(product) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
        this.items.push({ ...product, qty: 1 });
      }
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
});
