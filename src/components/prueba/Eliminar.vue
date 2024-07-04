<template>
  <DeleteModal
    :isOpen="pruebaId !== null"
    @close="handleClose"
    size="small"
    position="top"
    @keydown.esc="handleClose"
  >
    <template #header>
      <h2 class="text-xl font-bold p-0 m-0">Confirmar eliminación</h2>
    </template>

    <template #content>
      <div>¿Estás seguro de que quieres eliminar esta prueba?</div>
    </template>

    <template #footer>
      <div class="flex justify-between mt-4">
        <Boton
          @click="confirmDelete"
          size="small"
          variant="danger"
          :disabled="isDeleting"
        >
          Confirmar
        </Boton>
        <Boton
          @click="handleClose"
          size="small"
          variant="secondary"
          @keydown.enter.prevent="handleClose"
          ref="cancelButton"
        >
          Cancelar
        </Boton>
      </div>
    </template>
  </DeleteModal>

  <Carga
    v-if="isDeleting"
    size="medium"
    message="Eliminando prueba..."
    :overlay="true"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { deletePrueba } from "../../services/pruebasService";
import DeleteModal from "../modal/Modal.vue";
import Boton from "../../components/button/Boton.vue";
import Carga from "../../components/carga/Carga.vue";

const props = defineProps<{
  pruebaId: number | null;
}>();

const emit = defineEmits(["closeDeleteModal", "pruebaDeleted"]);

const cancelButton = ref<InstanceType<typeof Boton> | null>(null);
const isDeleting = ref(false);

const handleClose = () => {
  emit("closeDeleteModal");
};

const confirmDelete = async () => {
  if (props.pruebaId !== null && !isDeleting.value) {
    isDeleting.value = true;
    try {
      await deletePrueba(props.pruebaId);
      emit("pruebaDeleted");
      handleClose();
    } catch (error) {
      console.error("Error al eliminar la prueba:", error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      isDeleting.value = false;
    }
  }
};

const focusCancelButton = () => {
  if (cancelButton.value && cancelButton.value.$el) {
    (cancelButton.value.$el as HTMLElement).focus();
  }
};

onMounted(() => {
  focusCancelButton();
});

watch(
  () => props.pruebaId,
  (newValue) => {
    if (newValue !== null) {
      // El modal se está abriendo
      setTimeout(focusCancelButton, 0);
    }
  }
);
</script>