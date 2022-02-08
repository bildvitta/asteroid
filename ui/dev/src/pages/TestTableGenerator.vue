<template>
  <q-page class="container">
    <qas-table-generator :columns="columns" :fields="mockData.fields" :results="mockData.results" row-key="uuid" :use-scroll-on-grab="false" />

    <div class="q-my-lg">Com slots</div>
    <qas-table-generator :columns="columns" :fields="mockData.fields" :results="mockData.results" row-key="uuid">
      <template #body-cell-actions="{ row }">
        <div>
          <qas-btn @click="showUuid(row)">clica aqui!</qas-btn>
        </div>
      </template>
    </qas-table-generator>
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
