<template>
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :filters-props="filtersProps">
    <template #header>
      <qas-page-header title="Lista de materiais" :use-breadcrumbs="false">
        <qas-btn icon="sym_r_add" label="Novo [item]" :use-label-on-small-screen="false" />
      </qas-page-header>
    </template>

    <template #default>
      <qas-table-generator :columns="columns" :fields="fields" :results="results" row-key="uuid">
        <template #body-cell-isActive="{ row }">
          <div class="text-weight-bold">{{ row.isActive }}</div>
        </template>
        <template #body-cell-actions>
          <div class="flex justify-end no-wrap q-gutter-x-sm">
            <qas-btn dense flat icon="sym_r_edit" rounded size="sm" />
          </div>
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
      errors: {},
      results: [],
      metadata: {}
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    filtersProps () {
      return {
        useSearchOnType: true
      }
    },

    columns () {
      return [
        'isActive',
        'name',
        { align: 'right', name: 'actions' }
      ]
    }
  }
}
</script>
