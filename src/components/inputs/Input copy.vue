<template>
  <div class="float-label-input">
    <input
      type="text"
      v-model="inputValue"
      :id="id"
      :name="id"
      :autocomplete="id"
      required
      placeholder=" "
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script setup>
//COMO UTILIZAR

/*
import Input from "../components/inputs/Input.vue";
    <Input
      id="name"
      label="Nombre"
      type="text"
      autocomplete="given-name"
    ></Input>
*/
import { ref } from 'vue';

defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const inputValue = ref('');

</script>

<style scoped>
.float-label-input {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  font-family: 'Arial', sans-serif;
}

input {
  width: 100%;
  padding: 1rem 0.75rem;
  border: 1px solid #55545473;
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:hover {
  border-color: #75737375;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.25);
  border-radius: 16px;
}

label {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  pointer-events: none;
  padding: 0 0.25rem;
  border-radius: 8px;
  font-weight: 500;
}

input:focus,
input:not(:placeholder-shown) {
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: 0;
  font-size: 12px;
  background: #fff;
  padding: 0 0.25rem;
  color: #3498db;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 4px;
}

input:focus ~ label {
  color: #2980b9;
}

input:not(:placeholder-shown) ~ label {
  color: #3498db;
}

input:invalid {
  border-color: #3b3b3b;
  border-radius: 15px;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(4, 146, 241, 0.603); }
  70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
}

input:focus {
  animation: pulse 1.5s infinite;
}
</style>
