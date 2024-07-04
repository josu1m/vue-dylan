<template>
  <div>
    <h1>Agregar Prueba</h1>
    <form @submit.prevent="submitForm">
      <div>
        <Input
          id="name"
          label="Nombre"
          v-model="name"
          required
          autocomplete="family-name"
          @save="submitForm"
        />
      </div>
      <div>
        <Input
          id="content"
          label="Content"
          v-model="content"
          required
          autocomplete="email"
          @save="submitForm"
        />
      </div>
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addPrueba } from "../services/pruebasService";
import Input from "../components/inputs/Input.vue";

const name = ref("");
const content = ref("");

const submitForm = async () => {
  try {
    await addPrueba({ name: name.value, content: content.value });
    name.value = "";
    content.value = "";
  } catch (error) {
    console.error("Error al agregar prueba:", error);
    // Maneja el error según sea necesario
  }
};
</script>