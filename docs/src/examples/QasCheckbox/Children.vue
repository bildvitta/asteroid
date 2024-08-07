<template>
  <div class="container spaced">
    <qas-checkbox v-model="model" label="Aceitar" :options="optionsChildren" />

    <div class="q-mt-lg">
      model: {{ model }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Children' })

const model = ref([])

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
