<template>
  <qas-list-view v-model:results="results" :entity="entity">
    <template #filter>
      <qas-filters :entity="entity">
        <template #default="{ filter, removeFilter }">
          <div class="q-pt-md text-center">
            <qas-btn @click="filter({ test: 'Nova query' })">Adicionar uma nova query na url!</qas-btn>
            <qas-btn @click="removeFilter({ name: 'test' })">Remover query da url!</qas-btn>
          </div>
        </template>
      </qas-filters>
    </template>
    <template #default>
      <div class="overflow-hidden">
        Valor filtrado: <qas-debugger :inspect="[results]" />
      </div>
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
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
