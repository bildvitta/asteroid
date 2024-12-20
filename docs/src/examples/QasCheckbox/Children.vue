<template>
  <div class="container spaced">
    <qas-checkbox v-model="model" :columns="{ col: 12, sm: 4, md: 3 }" label="Checkbox com chidren" :options="optionsChildren" />

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
        label: 'Opção de teste com nome grande 1',
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
  }
]
</script>
