<template>
  <div class="container q-py-lg">
    <qas-timeline :list="list">
      <template #default="{ item }">
        <div class="q-py-md">
          <div>Utilizando o slot </div>
          <div>data: <span class="text-bold">{{ item.date }}</span></div>
        </div>
      </template>
    </qas-timeline>
  </div>
</template>

<script setup>
defineOptions({ name: 'DefaultSlot' })

const list = [
  {
    date: '2023-01-11T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: '2023-01-12T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  }
]
</script>
