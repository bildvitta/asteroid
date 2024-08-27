<template>
  <div class="container q-py-lg">
    <div>
      <qas-select v-model="model" label="Meu select obrigatório" :options="options" required />
      Model: {{ model }}
    </div>

    <div class="q-mt-md">
      <qas-select v-model="model2" label="Com uma opção" :options="options2" required />
      Model: {{ model2 }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Required' })

const model = ref('')
const model2 = ref('')

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
  },
  {
    label: 'Opção 4',
    value: 4
  },
  {
    label: 'Opção 5',
    value: 5
  },
  {
    label: 'Opção 6',
    value: 6
  },
  {
    label: 'Opção 7',
    value: 7
  },
  {
    label: 'Opção 8',
    value: 8
  }
]
const options2 = [
  {
    label: 'Unica opção 1',
    value: 1
  }
]
</script>
