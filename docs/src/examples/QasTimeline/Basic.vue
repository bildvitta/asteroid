<template>
  <div class="container q-py-lg">
    <qas-timeline :list="list" />

    <qas-timeline :list="list2" />
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const list = [
  {
    date: '2023-01-11T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: '2023-01-12T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: '2023-01-13T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: '2023-01-14T14:58:40.000000Z',
    description: 'Cliente enviado para análise cadastral'
  }
]

const list2 = [
  {
    date: 'Cleyton',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: 'Cleyton',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: 'Cleyton',
    description: 'Cliente enviado para análise cadastral'
  },
  {
    date: 'Cleyton',
    description: 'Cliente enviado para análise cadastral'
  }
]
</script>
