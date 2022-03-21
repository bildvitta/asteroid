<template>
  <!-- Descartar essa div -->
  <div class="container spaced">
    <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity">
      <template #header>
        <qas-page-header no-breadcrumbs title="Lista de materiais">
          <qas-btn hide-mobile-label icon="o_add" label="Criar novo [Alguma ação]" />
        </qas-page-header>
      </template>

      <template #default>
        <qas-table-generator :columns="columns" :fields="fields" :results="results" row-key="uuid">
          <template #body-cell-isActive="{ row }">
            <div class="text-weight-bold">{{ row.isActive }}</div>
          </template>
          <template #body-cell-actions>
            <div class="flex justify-end no-wrap q-gutter-x-sm">
              <qas-btn dense flat icon="o_edit" rounded size="sm" />
            </div>
          </template>
        </qas-table-generator>
      </template>
    </qas-list-view>
  </div>
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
