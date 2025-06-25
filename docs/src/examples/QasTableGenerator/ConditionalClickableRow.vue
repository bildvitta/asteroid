<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="fields" :results="results" row-key="uuid" :row-route-fn="rowRouteFn" />
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'ConditionalClickableRow',

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

  methods: {
    rowRouteFn (row) {
      // Exemplo: apenas usuários ativos podem ser clicados
      if (row.status === 'inactive') {
        // Retorna undefined para desabilitar o clique
        return undefined
      }

      // Retorna a rota para usuários ativos
      return {
        name: 'user-details',
        params: { id: row.uuid }
      }
    }
  }
}
</script>
