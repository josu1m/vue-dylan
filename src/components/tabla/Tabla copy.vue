<!-- CustomTable.vue -->
<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td v-for="(value, key) in row" :key="key">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
//USAR
/*
const headers = ref(["Nombre", "Edad", "Ciudad", "Profesión"]);
const data = ref([
  { nombre: "Juan", edad: 30, ciudad: "Madrid", profesion: "Ingeniero" },
  { nombre: "María", edad: 25, ciudad: "Barcelona", profesion: "Diseñadora" },
  { nombre: "Carlos", edad: 35, ciudad: "Valencia", profesion: "Médico" },
  { nombre: "Ana", edad: 28, ciudad: "Sevilla", profesion: "Abogada" },
]);
    <Grafico :headers="headers" :data="data" />

*/
import { defineProps } from "vue";

interface TableRow {
  [key: string]: string | number;
}

interface Props {
  headers: string[];
  data: TableRow[];
}

defineProps<Props>();
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.custom-table th,
.custom-table td {
  padding: 15px;
  text-align: left;
  transition: all 0.3s ease;
}

.custom-table th {
  background-color: #2c3e50;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600;
  position: relative;
}

.custom-table th:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.custom-table th:hover:after {
  transform: scaleX(1);
}

.custom-table tbody tr {
  transition: all 0.3s ease;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #5c998f;
}

.custom-table tbody tr:hover {
  background-color: #483b83;
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.custom-table td {
  border-bottom: 1px solid #95a5a6;
}

.custom-table tbody tr:hover td {
  color: white;
}

@media (max-width: 600px) {
  .custom-table {
    font-size: 0.8rem;
  }

  .custom-table th,
  .custom-table td {
    padding: 10px;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-table tbody tr {
  opacity: 0;
  animation: rowFadeIn 0.5s ease-out forwards;
}

@keyframes rowFadeIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.custom-table tbody tr:nth-child(1) {
  animation-delay: 0.1s;
}
.custom-table tbody tr:nth-child(2) {
  animation-delay: 0.2s;
}
.custom-table tbody tr:nth-child(3) {
  animation-delay: 0.3s;
}
.custom-table tbody tr:nth-child(4) {
  animation-delay: 0.4s;
}
</style>