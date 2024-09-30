<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity :use-query-pagination="false">
    <template #header>
      <qas-page-header title="Lista de materiais" :use-breadcrumbs="false">
        <qas-btn icon="sym_r_add" label="Novo [item]" />
      </qas-page-header>
    </template>

    <template #default>
      <qas-table-generator :columns="columns" :fields="fields" :results="results" row-key="uuid" />
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'InternalPagination',

  data () {
    return {
      fields: {},
      errors: {},
      results: [],
      metadata: {}
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    columns () {
      return [
        'name',
        'company'
      ]
    }
  }
}
</script>
