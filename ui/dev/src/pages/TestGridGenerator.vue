<template>
  <q-page class="container">
    <qas-grid-generator :fields="mockData.fields" hide-empty-result :result="{ ...mockData.results[0] }" />
  </q-page>
</template>

<script>
export default {
  computed: {
    mockData () {
      return require('../mock/fetchList.json')
    }
  },

  methods: {
    showUuid ({ uuid }) {
      alert(`uuid: ${uuid}`)
    }
  }
}
</script>
