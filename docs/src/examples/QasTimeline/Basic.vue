<template>
  <div class="container q-py-lg">
    <qas-timeline :list="list" />
  </div>
</template>

<script>
export default {
  name: 'Basic',

  computed: {
    list () {
      return [
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
    }
  }
}
</script>
