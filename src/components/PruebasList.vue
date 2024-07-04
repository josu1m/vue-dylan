<template>
  <div>
    <Boton @click="openAddModal" size="small" variant="primary">
      Agregar Prueba
    </Boton>

    <MessageAlert
      v-if="showMessage"
      :type="messageType"
      :message="messageText"
      :duration="3000"
      @close="hideMessage"
    />

    <Tabla :headers="headers" :data="tableData" :hasActions="true">
      <template #actions="{ index }">
        <Boton
          @click="openEditModal(pruebas[index].id)"
          size="small"
          variant="primary"
          >Editar</Boton
        >
        <Boton
          @click="openDeleteModal(pruebas[index].id)"
          size="small"
          variant="danger"
          label="Eliminar"
        />
      </template>
    </Tabla>

    <EditarPrueba
      :pruebaId="pruebaToEditId"
      @closeEditModal="closeEditModal"
      @pruebaEdited="handlePruebaEdited"
    />
    <Eliminar
      :pruebaId="pruebaToDeleteId"
      @closeDeleteModal="closeDeleteModal"
      @pruebaDeleted="handlePruebaDeleted"
    />
    <AgregarPrueba
      :isOpen="isAddModalOpen"
      @close="closeAddModal"
      @pruebaAdded="handlePruebaAdded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getPruebas } from "../services/pruebasService";
import type { Prueba } from "../services/pruebasService";
import Eliminar from "../components/prueba/Eliminar.vue";
import EditarPrueba from "../components/prueba/Editar.vue";
import AgregarPrueba from "../components/prueba/Agregar.vue";
import Boton from "../components/button/Boton.vue";
import Tabla from "../components/tabla/Tabla.vue";
import MessageAlert from "../components/mensaje/Mensaje.vue";

const pruebas = ref<Prueba[]>([]);
const isAddModalOpen = ref(false);

const pruebaToDeleteId = ref<number | null>(null);
const pruebaToEditId = ref<number | null>(null);

const showMessage = ref(false);
const messageType = ref<"success" | "error">("success");
const messageText = ref("");

const headers = ["ID", "Nombre", "Contenido"];

const tableData = computed(() =>
  pruebas.value.map((prueba) => ({
    ID: prueba.id,
    Nombre: prueba.name,
    Contenido: prueba.content,
  }))
);

const fetchPruebas = async () => {
  pruebas.value = await getPruebas();
};

const openDeleteModal = (id: number) => {
  pruebaToDeleteId.value = id;
};

const closeDeleteModal = () => {
  pruebaToDeleteId.value = null;
};

const openEditModal = (id: number) => {
  pruebaToEditId.value = id;
};

const closeEditModal = () => {
  pruebaToEditId.value = null;
};

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const showSuccessMessage = (text: string) => {
  messageType.value = "success";
  messageText.value = text;
  showMessage.value = false; // Forzar la re-renderización del componente
  setTimeout(() => {
    showMessage.value = true;
  }, 0);
};

const hideMessage = () => {
  showMessage.value = false;
};

const handlePruebaAdded = (newPrueba: Prueba) => {
  pruebas.value.push(newPrueba);
  showSuccessMessage("Prueba agregada con éxito");
};

const handlePruebaEdited = () => {
  fetchPruebas();
  showSuccessMessage("Prueba editada con éxito");
};

const handlePruebaDeleted = () => {
  fetchPruebas();
  showSuccessMessage("Prueba eliminada con éxito");
};

onMounted(fetchPruebas);
</script>