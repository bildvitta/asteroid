<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <!-- <qas-table-generator :fields="fields" :results="results" row-key="uuid" :row-route-fn="rowRouteFn" /> -->
      <qas-table-generator :fields="fields" :results="results" row-key="uuid">
        <template #body-cell-name>
          <div class="text-weight-bold">:)</div>
        </template>
      </qas-table-generator>
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
      /* Acesso aos dados da linha caso precise passar uma rota com id */
      return { path: 'components/table-generator' }
    }
  }
}
</script>
