<template>
  <Transition name="fade">
    <div v-if="isOpen" class="popup-overlay" @click.self="$emit('close')">
      <div class="filter-box">
        <div class="filter-header">
          <p class="group-title">COLLECTION</p>
          <button class="close-btn" @click="$emit('close')">&times;</button>
        </div>

        <div class="filter-body">
          <ul>
            <li
              v-for="col in collections"
              :key="col"
              :class="{ active: activeCollection === col }"
              @click="selectCollection(col)"
            >
              {{ col }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps(["isOpen", "activeCollection"]);
const emit = defineEmits(["close", "update:collection"]);

const collections = ["All", "Diana", "Miyari", "Myra", "Valerie"];

const selectCollection = (col) => {
  emit("update:collection", col);
  emit("close"); // Tutup popup setelah pilih
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 2500;
  /* Mengatur posisi box di area toolbar (kanan atas konten) */
  display: flex;
  justify-content: flex-start; /* Tetap di kiri sesuai tombol filter */
  padding: 180px 40px; /* Sesuaikan dengan tinggi header + toolbar */
}

.filter-box {
  background: white;
  width: fit-content;
  min-width: 200px;
  height: fit-content;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #eee;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 40px;
}

.group-title {
  font-size: 11px;
  letter-spacing: 2px;
  color: #8c6a43;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #ccc;
  cursor: pointer;
  line-height: 1;
}

.filter-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-body li {
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid transparent;
}

.filter-body li:hover {
  color: #8c6a43;
  padding-left: 5px;
}

.filter-body li.active {
  color: #1a1a1a;
  font-weight: bold;
  border-bottom: 1px dashed #8c6a43;
}

/* Animasi sederhana */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
