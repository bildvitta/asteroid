<template>
  <div class="container q-py-lg">
    <div>
      <qas-select v-model="model" label="Meu select obrigatório" :options="options" required />
      Model: {{ model }}
    </div>

    <div class="q-mt-md">
      <qas-select v-model="model" label="Com uma opção" :options="options" use-auto-select />
      Model: {{ model }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'AutoSelect' })

const model = ref('')

const options = [
  {
    label: 'Unica opção 1',
    value: 1
  }
]
</script>
