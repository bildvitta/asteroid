<template>
  <div class="container spaced">
    <div class="q-mt-lg">
      <qas-checkbox v-model="model" label="Checkbox com children" :options="optionsChildren" />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" disable label="Checkbox com children" :options="optionsChildren" />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" error label="Checkbox com children" :options="optionsChildren" />
    </div>

    <div class="q-mt-lg">
      <qas-checkbox v-model="model" error error-message="Mensagem de erro" label="Checkbox com children" :options="optionsChildren" />
    </div>

    <div class="q-mt-lg">
      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'Children' })

const model = ref([])

const optionsChildren = [
  {
    label: 'Selecionar todos',
    value: 1,
    children: [
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
      }
    ]
  }
]
</script>
