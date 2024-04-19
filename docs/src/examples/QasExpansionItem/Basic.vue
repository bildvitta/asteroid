<template>
  <div class="container spaced">
    <qas-expansion-item :badges="badges" label="Cleyton">
      <template #content>
        <div class="q-mb-md text-subtitle1">
          Dados do contato
        </div>

        <div>grid-generator-inline</div>
      </template>
    </qas-expansion-item>
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const badges = [
  {
    color: 'green-14',
    label: 'Aprovado',
    textColor: 'white'
  },
  {
    color: 'red-14',
    label: 'Reprovado',
    textColor: 'white'
  }
]
</script>
