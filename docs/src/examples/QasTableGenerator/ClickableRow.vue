<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" use-auto-handle-on-delete :use-filter="false">
    <template #default>
      <qas-table-generator :columns="columns" :fields="fields" :results="results" row-key="uuid" @row-click="rowClick">
        <template #body-cell-actions="{ row }">
          <div class="flex justify-end no-wrap q-gutter-x-sm">
            <qas-delete :custom-id="row.uuid" dense entity="users" flat icon="o_delete" rounded />
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
  },

  methods: {
    rowClick (event, row, index) {
      alert(`Clicou na linha ${index} do usuário "${row.name}".`)
      // Use o Vue Router para navegar para a rota desejada.
    },

    test () {
      console.log('aq')
    }
  }
}
</script>
