<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-boundary="false" :use-filter="false">
    <template #default>
      <qas-table-generator :columns2="['email']" :fields="fields" :results="results" row-key="uuid" />
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      results: []
    }
  },

  computed: {
    entity () {
      return 'users'
    }
  },

  created () {
    setTimeout(() => {
      this.results.push({

        uuid: '31362c39-2cb5-4fe2-982a-c270f88d2462121',
        isActive: true,
        company: 'empresa-1',
        name: 'John Dow',
        email: 'Mervin76.Mervin76.Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76Mervin76@gmail.com',
        document: '99999999999',
        phone: '99999999999',
        createdAt: '2022-03-18T03:54:11.000Z',
        updatedAt: '2022-03-18T09:22:11.000Z'

      })
    }, 4000)
  }
}
</script>
