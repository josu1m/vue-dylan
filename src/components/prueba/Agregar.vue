<template>
  <AgregarModal
    :isOpen="isOpen"
    @close="handleClose"
    size="large"
    position="top"
  >
    <template #header>
      <h2 class="text-xl font-bold p-0 m-0">Agregar Nueva Prueba</h2>
    </template>

    <template #content>
      <form @submit.prevent="submitForm">
        <div>
          <Input
            id="name"
            label="Nombre"
            v-model="name"
            required
            autocomplete="off"
          />
        </div>
        <div>
          <Input
            id="content"
            label="Contenido"
            v-model="content"
            required
            autocomplete="off"
          />
        </div>
      </form>
    </template>

    <template #footer>
      <div class="justify-between flex">
        <Boton
          @click="submitForm"
          size="small"
          variant="danger"
          :disabled="isSubmitting"
          label="Agregar"
        />
        <Boton
          @click="handleClose"
          size="small"
          variant="primary"
          label="Cancelar"
        />
      </div>
    </template>
  </AgregarModal>

  <Carga
    v-if="isSubmitting"
    size="medium"
    message="Agregando prueba..."
    :overlay="true"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { addPrueba } from "../../services/pruebasService";
import AgregarModal from "../modal/Modal.vue";
import Input from "../../components/inputs/Input.vue";
import Boton from "../../components/button/Boton.vue";
import Carga from "../../components/carga/Carga.vue";

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "pruebaAdded"]);

const name = ref("");
const content = ref("");
const isSubmitting = ref(false);

const handleClose = () => {
  emit("close");
  resetForm();
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  try {
    const newPrueba = await addPrueba({
      name: name.value,
      content: content.value,
    });
    emit("pruebaAdded", newPrueba);
    resetForm();
    handleClose();
  } catch (error) {
    console.error("Error al agregar la prueba:", error);
    // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  name.value = "";
  content.value = "";
};
</script>