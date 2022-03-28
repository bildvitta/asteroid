<template>
  <qas-list-view v-model:fetching="isFetching" v-model:fields="fields" v-model:results="results" class="container spaced" entity="users">
    <template #filter>
      <qas-filters entity="users">
        <template #default="{ filter }">
          <div>
            <qas-btn label="filtrar" @click="filter({ name: 'teste 2' })" />
          </div>
        </template>
      </qas-filters>
    </template>
    <template #default>
      Fields: <qas-debugger :inspect="[fields]" />
      Results: <qas-debugger :inspect="[results]" />
      isFetching: {{ isFetching }}
    </template>
  </qas-list-view>
</template>

<script>
export default {
  data () {
    return {
      values: {},
      isFetching: false,
      fields: {},
      results: []
    }
  },

  computed: {
    customId () {
      // TODO: Alterar toda vez que rodar o navpi seed
      return '6e8cd2fe-0945-4e84-9286-839ad2f2abcb'
    }
  }
}
</script>
