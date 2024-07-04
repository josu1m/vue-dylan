<!--Editar.vue-->
<template>
  <EditModal
    :isOpen="pruebaId !== null"
    @close="handleClose"
    size="large"
    position="top"
  >
    <template #header>
      <h2 class="text-xl font-bold p-0 m-0">Editar Prueba</h2>
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
          label="Guardar"
        />
        <Boton
          @click="handleClose"
          size="small"
          variant="primary"
          label="Cancelar"
        />
      </div>
    </template>
  </EditModal>
  <Carga
    v-if="isSubmitting"
    size="medium"
    message="Guardando Cambios..."
    :overlay="true"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { updatePrueba, getPruebaById } from "../../services/pruebasService";
import EditModal from "../modal/Modal.vue";
import Input from "../../components/inputs/Input.vue";
import Boton from "../../components/button/Boton.vue";
import Carga from "../../components/carga/Carga.vue";
import MessageAlert from "../../components/mensaje/Mensaje.vue";

const props = defineProps<{
  pruebaId: number | null;
}>();

const emit = defineEmits(["closeEditModal", "pruebaEdited"]);

const name = ref("");
const content = ref("");
const isSubmitting = ref(false);

const handleClose = () => {
  emit("closeEditModal");
};

const submitForm = async () => {
  if (props.pruebaId !== null && !isSubmitting.value) {
    isSubmitting.value = true;
    try {
      await updatePrueba(props.pruebaId, {
        name: name.value,
        content: content.value,
      });
      emit("pruebaEdited");
      handleClose();
    } catch (error) {
      console.error("Error al actualizar la prueba:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      isSubmitting.value = false;
    }
  }
};

const fetchPruebaData = async () => {
  if (props.pruebaId !== null) {
    try {
      const prueba = await getPruebaById(props.pruebaId);
      name.value = prueba.name;
      content.value = prueba.content;
    } catch (error) {
      console.error("Error al obtener los datos de la prueba:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  }
};

watch(() => props.pruebaId, fetchPruebaData);

onMounted(fetchPruebaData);
</script>