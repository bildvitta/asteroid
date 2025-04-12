<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :columns="['email']" :fields="fields" :results="results" row-key="uuid">
        <template #body-cell-name>
          <qas-toggle-visibility data-ignore-hover text="64.829.511/0001-01" />
        </template>
      </qas-table-generator>
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
  }
}
</script>
