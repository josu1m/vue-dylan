
<script setup>
import { ref } from "vue";
//import Modal from "../components/modal/Modal.vue";
import Sidebar from "../components/Sidebar.vue";
//import Input from "../components/inputs/Input.vue";
import PruebasList from "../components/PruebasList.vue";

//const isOpen = ref(false);

/*const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
const openModal1 = () => {
  isOpen1.value = true;
};

const closeModal1 = () => {
  isOpen1.value = false;
};*/
</script>

<template>
  <Sidebar>
    <!--<button @click="openModal">Abrir Modal</button>
    <button @click="openModal1">Abrir Prueba</button>

    <Modal :isOpen="isOpen" @close="closeModal" size="large" position="top">
      <template #header>
        <h2 class="text-xl font-bold p-0 m-0">Encabezado del Modal</h2>
      </template>

      <template #content>
        <Input
          id="exampleInput"
          label="Example label"
          autocomplete="family-name"
        ></Input>
      </template>

      <template #footer>
        <button @click="closeModal">Cerrar</button>
      </template>
    </Modal>-->
    <PruebasList/>
  </Sidebar>
</template>
