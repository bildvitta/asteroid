<template>
  <div class="container q-py-lg">
    <qas-text-truncate dialog-title="Aqui está meu título!" :text="text" />
  </div>

  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :fields="fields" :results="results" row-key="uuid">
        <template #body-cell-name="{ row }">
          <qas-text-truncate dialog-title="Aqui está meu título!" :max-width="180" :text="row.name" />
        </template>
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      fields: {},
      results: []
    }
  },

  computed: {
    entity () {
      return 'users'
    }
  },

  created () {
    this.text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatem dolorem animi molestias quasi sit, ipsa suscipit quaerat.'
  }
}
</script>
