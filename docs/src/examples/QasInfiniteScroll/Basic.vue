<template>
  <div class="container q-py-lg">
    <qas-infinite-scroll
      v-model:list="historyList"
      max-height="450px"
      url="url-example"
    >
      <qas-timeline :list="historyList" />
    </qas-infinite-scroll>
  </div>
</template>

<script>
export default {
  name: 'Basic',

  data () {
    return {
      historyList: [
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
        },
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
        },
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
