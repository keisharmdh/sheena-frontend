import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("shopping_bag") || "[]"),
  }),

  getters: {
    isEmpty: (state) => state.items.length === 0,
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.qty, 0),

    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.qty, 0),
  },

  actions: {
    saveCart() {
      localStorage.setItem("shopping_bag", JSON.stringify(this.items));
    },

   addItem(product) {
  const existing = this.items.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    this.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      color: product.color,
      qty: 1,
    });
  }

  this.saveCart();
},

    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.saveCart();
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    },
  },
});