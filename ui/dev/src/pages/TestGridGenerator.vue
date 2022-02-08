<template>
  <q-page class="container">
    <qas-grid-generator :fields="mockData.fields" :result="mockData.results[0]" />
  </q-page>
</template>

<script>
export default {
  computed: {
    mockData () {
      return require('../mock/fetchList.json')
    },

    columns () {
      return [
        'name',
        'email',
        'avatar',
        { align: 'right', name: 'actions' }
      ]
    }
  },

  methods: {
    showUuid ({ uuid }) {
      alert(`uuid: ${uuid}`)
    }
  }
}
</script>
