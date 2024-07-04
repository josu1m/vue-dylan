<template>
  <main>
    <Sidebar>
      <div class="max-w-3xl mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Chat</h1>
        <div id="chat-container">
          <div
            id="chat-box"
            class="border border-gray-300 p-4 mb-4 h-96 overflow-y-auto"
            ref="chatBox"
          ></div>
          <div class="flex">
            <input
              type="text"
              v-model="userMessage"
              @keyup.enter="sendMessage"
              class="flex-1 px-3 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Escribe tu mensaje..."
            />
            <button
              @click="sendMessage"
              class="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Sidebar>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "../components/Sidebar.vue";

import { ref } from "vue";
import axios from "axios";

const userMessage = ref("");
const chatBox = ref<HTMLElement | null>(null);
const responding = ref(false); // Variable para indicar si está respondiendo

async function sendMessage() {
  const message = userMessage.value.trim();
  if (!message) return;

  appendMessage("usuario", message);
  userMessage.value = "";
  responding.value = true; // Activar indicador de carga12

  // Mostrar indicador de carga (barra 12)
  const loaderElement = document.createElement("div");
  loaderElement.classList.add(
    "h-2",
    "w-full",
    "bg-blue-200",
    "rounded-full",
    "overflow-hidden",
    "my-2"
  );

  const innerLoader = document.createElement("div");
  innerLoader.classList.add(
    "h-full",
    "rounded-full",
    "animate-pulse",
    "transition-all",
    "duration-500"
  );

  // Cambia el color de fondo según el estado de carga
  innerLoader.style.backgroundColor = responding.value ? "#3182ce" : "#3b82f6";

  loaderElement.appendChild(innerLoader);
  chatBox.value?.appendChild(loaderElement);

  try {
    const response = await axios.post<{ respuesta: string }>(
      "http://localhost:3000/api/chat",
      {
        texto: message,
      }
    );
    appendMessage("AI", response.data.respuesta);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("AI", `Error al obtener respuesta: ${error.message}`);
  } finally {
    responding.value = false; // Desactivar indicador de carga
    if (loaderElement.parentNode) {
      loaderElement.parentNode.removeChild(loaderElement);
    }
  }
}

function appendMessage(sender: string, content: string) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    "p-2",
    "mb-2",
    "rounded",
    "shadow",
    "bg-white"
  );
  if (sender === "usuario") {
    messageElement.classList.add(
      "text-blue-700",
      "self-end",
      "bg-blue-100",
      "text-right"
    );
  } else if (sender === "AI") {
    messageElement.classList.add(
      "text-green-700",
      "self-start",
      "bg-green-100"
    );
  }
  messageElement.textContent = `${sender}: ${content}`;
  if (chatBox.value) {
    chatBox.value.appendChild(messageElement);
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
}
</script>

<style scoped>
</style>
