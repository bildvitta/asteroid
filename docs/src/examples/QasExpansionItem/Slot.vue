<template>
  <div class="container spaced">
    <qas-expansion-item :badges="badges" label="Cleyton">
      <template #content>
        Meu conteúdo customizado
      </template>
    </qas-expansion-item>
  </div>
</template>

<script setup>
defineOptions({ name: 'UsersList' })

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
