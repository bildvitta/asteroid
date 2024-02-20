<template>
  <qas-list-view v-model:results="results" :entity="entity">
    <template #filter>
      <qas-filters :entity="entity">
        <template #default="{ filter, removeFilter }">
          <div class="flex items-center justify-center q-pt-md">
            <qas-btn @click="filter({ name: 'test' })">Adicionar uma nova query na url!</qas-btn>
            <q-separator spaced vertical />
            <qas-btn @click="removeFilter({ name: 'name' })">Remover query da url!</qas-btn>
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
