<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="fields" :results="results" row-key="uuid" :row-route-fn="rowRouteFn" />
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'TableLink',

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
      /* Poderá ter acesso ao row, caso precise passar uma rota com id da linha por exemplo. */
      return { path: 'actions-menu' }
    },

    /*
      Ao usar a prop "use-external-link", o retorno da prop "row-route-fn"
      deverá ser uma função retornando um path.
    */
    rowExternalRouteFn () {
      return 'https://asteroid.nave.dev/'
    }
  }
}
</script>
