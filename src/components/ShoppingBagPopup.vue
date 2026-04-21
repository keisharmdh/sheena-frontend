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
            <div class="icon-circle">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8c6a43"
                stroke-width="1.2"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
            </div>

            <h3 class="empty-text">Your Bag is Empty</h3>
            <p class="sub-text">Looks like you haven't added anything to your bag yet.</p>

            <div class="action-area">
              <button class="btn-continue" @click="$emit('close')">Continue Shopping</button>
              <button class="btn-browse">Browse Collection</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});
defineEmits(["close"]);
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
  font-family: "Playfair Display", "Times New Roman", serif; /* Serif khas fashion luxury */
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
  margin: 0 -30px 60px -30px; /* Garis full sampai pinggir */
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

/* Animasi */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
