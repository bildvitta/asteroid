<template>
  <div class="container q-my-xl">
    <qas-select-filter v-model="company" :options />

    <div>
      Company: <div>{{ company }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const company = ref()

const options = ref([
  {
    label: 'Empresa 1',
    value: '1'
  },
  {
    label: 'Empresa 2',
    value: '2'
  },
  {
    label: 'Empresa 3',
    value: '3'
  },
  {
    label: 'Empresa 4',
    value: '4'
  },
  {
    label: 'Empresa 5',
    value: '5'
  }
])
</script>
