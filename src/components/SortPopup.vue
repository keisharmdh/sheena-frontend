<template>
  <Transition name="fade">
    <div v-if="isOpen" class="popup-overlay" @click.self="$emit('close')">
      <div class="sort-box">
        <ul>
          <li
            v-for="option in options"
            :key="option.value"
            :class="{ active: currentSort === option.value }"
            @click="selectSort(option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps(["isOpen", "currentSort"]);
const emit = defineEmits(["close", "update:sort"]);

const options = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "low-high" },
  { label: "Price: High to Low", value: "high-low" },
];

const selectSort = (val) => {
  emit("update:sort", val);
  emit("close");
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  padding: 150px 40px;
}
.sort-box {
  background: white;
  width: 220px;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}
ul {
  list-style: none;
  padding: 10px 0;
}
li {
  padding: 12px 25px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
}
li:hover {
  background: #f9f6f3;
  color: #8c6a43;
}
li.active {
  color: #8c6a43;
  font-weight: bold;
}
</style>
