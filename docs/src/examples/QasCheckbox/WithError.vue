<template>
  <div class="container q-gutter-y-lg spaced">
    <qas-checkbox v-model="model" error-message="Mensagem de erro de teste" label="Checkbox com opções" :options />

    <qas-checkbox v-model="modelWithChildren" error-message="Mensagem de erro de teste" label="Checkbox com chidren" :options="optionsChildren" required />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'WithError' })

const model = ref([])
const modelWithChildren = ref([])

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

const optionsChildren = [
  {
    label: 'Opção 1',
    value: 1,
    children: [
      {
        label: 'Opção 2',
        value: 2
      },
      {
        label: 'Opção 3',
        value: 3
      }
    ]
  }
]
</script>
