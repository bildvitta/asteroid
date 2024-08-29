<template>
  <div class="container spaced">
    <qas-checkbox v-model="model" :options />

    <div class="q-mt-lg">
      model: {{ model }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Options' })

const model = ref([])

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
