<template>
  <div class="container spaced">
    <div>
      <qas-checkbox v-model="model" label="Checkbox com opções" :options />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" disable label="Checkbox com opções" :options />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" error label="Checkbox com opções" :options />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" error error-message="Mensagem de erro" label="Checkbox com opções" :options />
    </div>

    <div class="q-mt-lg">
      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Options' })

const model = ref([1])

const options = [
  {
    label: 'Opção 1',
    value: 1
  },
  {
    label: 'Opção 2',
    value: 2
  },
  {
    label: 'Opção 3',
    value: 3
  }
]
</script>
