<template>
  <div class="container spaced">
    <qas-expansion-item :badges="badges" label="John Doe">
      <template #header-bottom>
        <qas-badge>Header bottom</qas-badge>
      </template>

      <template #content>
        Meu conteúdo customizado
      </template>
    </qas-expansion-item>
  </div>
</template>

<script setup>
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
