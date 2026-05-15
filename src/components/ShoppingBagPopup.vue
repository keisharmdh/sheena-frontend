<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="cart-container">
          <div class="cart-header">
            <h2 class="title">Your Bag</h2>

            <button class="close-btn" @click="$emit('close')">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8c6a43"
                stroke-width="1.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <hr class="divider" />

          <div class="cart-content">
            <template v-if="cart.isEmpty">
              <div class="icon-circle">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8c6a43"
                  stroke-width="1.2"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"
                  />
                  <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
              </div>

              <h3 class="empty-text">Your Bag is Empty</h3>

              <p class="sub-text">
                Looks like you haven't 
                anything to your bag yet.
              </p>

              <div class="action-area">
                <button
                  class="btn-continue"
                  @click="$emit('close')"
                >
                  Continue Shopping
                </button>

                <button
                  class="btn-browse"
                  @click="browseCollection"
                >
                  Browse Collection
                </button>
              </div>
            </template>

            <template v-else>
              <div class="drawer-items">
                <div
                  v-for="item in cart.items"
                  :key="item.id"
                  class="drawer-item"
                >
                  <img :src="item.image" class="drawer-img" />

                  <div class="drawer-info">
  <h4>{{ item.name }}</h4>

  <p>Qty: {{ item.qty }}</p>

  <p v-if="item.size">
    Size: {{ item.size }}
  </p>

  <p v-if="item.color">
    Color: {{ item.color }}
  </p>

  <p>
    Rp
    {{
      (item.price * item.qty).toLocaleString("id-ID")
    }}
  </p>

  <button
    class="remove-btn"
    @click="removeItem(item.id)"
  >
    Remove
  </button>
</div>
                </div>
              </div>

              <div class="drawer-summary">
                <strong>Total</strong>

                <strong>
                  Rp {{ cart.totalPrice.toLocaleString("id-ID") }}
                </strong>
              </div>

              <button
                class="btn-continue"
                @click="browseCollection"
              >
                Continue Shopping
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart.js";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const cart = useCartStore();
const router = useRouter();

const removeItem = (id) => {
  cart.removeItem(id);
};

const browseCollection = () => {
  emit("close");
  router.push("/shop");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
}

.cart-container {
  background: #fff;
  width: 90%;
  max-width: 440px;
  padding: 30px;
  position: absolute;
  top: 70px;
  right: 20px;
  border: 1px solid #eeeeee;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.title {
  font-family: "Playfair Display", "Times New Roman", serif;
  font-size: 26px;
  font-weight: 400;
  margin: 0;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
}

.divider {
  border: 0;
  border-top: 1px solid #eeeeee;
  margin: 0 -30px 60px -30px;
}

.cart-content {
  text-align: center;
  padding-bottom: 20px;
}

.icon-circle {
  background: #f9f6f3;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 35px;
}

.empty-text {
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 12px;
}

.sub-text {
  font-family: "Inter", sans-serif;
  color: #999;
  font-size: 15px;
  margin-bottom: 50px;
}

.btn-continue {
  background: #8c6a43;
  color: white;
  border: none;
  width: 100%;
  padding: 18px;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s;
}

.btn-continue:hover {
  background: #755938;
}

.btn-browse {
  background: none;
  border: none;
  color: #8c6a43;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  display: block;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.drawer-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.drawer-item {
  display: flex;
  gap: 14px;
  border-bottom: 1px solid #eee;
  padding-bottom: 14px;
}

.drawer-img {
  width: 70px;
  height: 90px;
  object-fit: cover;
}

.drawer-info h4 {
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 1.4;
}

.drawer-info p {
  margin: 2px 0;
  font-size: 13px;
  color: #777;
}

.remove-btn {
  margin-top: 6px;
  background: none;
  border: none;
  color: #c0392b;
  cursor: pointer;
  padding: 0;
}

.drawer-summary {
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
  padding-top: 16px;
  border-top: 1px solid #eee;
}
</style>