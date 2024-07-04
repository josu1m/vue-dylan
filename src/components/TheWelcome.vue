<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Tabla from "../components/tabla/Tabla.vue";

const headers = ref(["Nombre", "Edad", "Ciudad"]);
const tableData = ref([
  { Nombre: "Juan", Edad: 30, Ciudad: "Madrid" },
  { Nombre: "María", Edad: 25, Ciudad: "Barcelona" },
  { Nombre: "Pedro", Edad: 35, Ciudad: "Sevilla" },
]);

const editRow = (index: number) => {
  console.log(`Editando fila ${index}`);
  // Lógica para editar la fila
};

const deleteRow = (index: number) => {
  console.log(`Eliminando fila ${index}`);
  tableData.value.splice(index, 1);
};
</script>

<template>
  <Sidebar>
    <Tabla :headers="headers" :data="tableData" :hasActions="true">
      <template #actions="{ index }">
        <button @click="editRow(index)">Editar</button>
        <button @click="deleteRow(index)">Eliminar</button>
      </template>
    </Tabla>
  </Sidebar>
</template>