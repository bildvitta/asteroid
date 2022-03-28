<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
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
</template>

<script>
export default {
  data () {
    return {
      fields: {},
      results: []
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
