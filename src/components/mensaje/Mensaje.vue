<template>
  <Transition name="slide-fade">
    <div
      :class="[
        'fixed bottom-5 right-5 flex items-center justify-between p-3 rounded-lg shadow-lg transition-all max-w-sm min-w-xs z-50',
        typeClass,
      ]"
      v-if="isVisible"
    >
      <div class="flex items-center flex-grow">
        <span
          :class="[
            'text-lg mr-3 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0',
            iconClass,
          ]"
          >{{ icon }}</span
        >
        <p class="m-0 font-medium break-words">{{ message }}</p>
      </div>
      <button
        v-if="closable"
        @click="closeMessage"
        class="bg-none border-none cursor-pointer opacity-70 transition-opacity p-0 ml-3 flex-shrink-0 hover:opacity-100"
      >
        <span class="text-xl leading-none">×</span>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

const props = defineProps({
  type: {
    type: String as () => "success" | "error" | "warning" | "info",
    default: "success",
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  closable: {
    type: Boolean,
    default: true,
  },
});

const isVisible = ref(false);

const typeClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-100 border-l-4 border-green-500 text-green-700";
    case "error":
      return "bg-red-100 border-l-4 border-red-500 text-red-700";
    case "warning":
      return "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700";
    case "info":
      return "bg-blue-100 border-l-4 border-blue-500 text-blue-700";
    default:
      return "bg-green-100 border-l-4 border-green-500 text-green-700";
  }
});

const icon = computed(() => {
  switch (props.type) {
    case "success":
      return "✓";
    case "error":
      return "✕";
    case "warning":
      return "⚠";
    case "info":
      return "ℹ";
    default:
      return "✓";
  }
});

const iconClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-500 text-white";
    case "error":
      return "bg-red-500 text-white";
    case "warning":
      return "bg-yellow-500 text-yellow-700";
    case "info":
      return "bg-blue-500 text-white";
    default:
      return "bg-green-500 text-white";
  }
});

const closeMessage = () => {
  isVisible.value = false;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 0);

  if (props.duration > 0) {
    setTimeout(closeMessage, props.duration);
  }
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
