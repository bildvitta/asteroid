<template>
  <q-page class="container q-py-lg">
    <qas-search-box v-model:results="results" :fuse-options="{ keys: ['label'] }" :list="list" :use-empty-results="false" @empty-result="onEmptyResult">
      <template #default>
        Results: <pre>{{ results }}</pre>
      </template>

      <template #empty-result>
        Sem resultados
      </template>
    </qas-search-box>

    <div class="q-ma-lg">
      {{ list }}
    </div>

    <qas-btn @click="changeList">Mudar lista!</qas-btn>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      results: [],
      list: [{ label: 'Paul', value: '1' }, { label: 'Walker', value: '2' }]
    }
  },

  methods: {
    onEmptyResult () {
      alert('Empty results')
    },

    changeList () {
      this.list = [{ label: 'Paul 2', value: '1' }, { label: 'Walker 2', value: '2' }]
    }
  }
}
</script>
