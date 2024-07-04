<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
  >
    <div class="flex flex-col items-center">
      <div class="flex space-x-2">
        <div
          v-for="(color, index) in colors"
          :key="index"
          :class="['rounded-full animate-pulse', spinnerSizeClass]"
          :style="{
            backgroundColor: color,
            animationDelay: `${index * 0.15}s`,
            animationDuration: '1.5s',
          }"
        ></div>
      </div>
      <p v-if="message" class="mt-6 text-base text-gray-600">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String as () => "small" | "medium" | "large",
    default: "medium",
  },
  message: {
    type: String,
    default: "",
  },
});

const colors = ["#4299E1", "#63B3ED", "#90CDF4", "#BEE3F8", "#EBF8FF"];

const spinnerSizeClass = computed(() => {
  switch (props.size) {
    case "small":
      return "w-3 h-3";
    case "medium":
      return "w-5 h-5";
    case "large":
      return "w-7 h-7";
    default:
      return "w-5 h-5";
  }
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>