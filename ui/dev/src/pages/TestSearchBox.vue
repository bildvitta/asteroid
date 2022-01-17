<template>
  <q-page class="container q-py-lg">
    <qas-search-box :fuse-options="{ keys: ['label'] }" :list="[ {label: 'Paul', value: 1 },{ label: 'Walker', value: '2'} ]" @empty-result="onEmptyResult" :use-empty-results="false">
      <template #default="{ results }">
        Results: <pre>{{ results }}</pre>
      </template>

      <template #empty-result>
        Sem resultados
      </template>
    </qas-search-box>
  </q-page>
</template>

<script>
export default {
  methods: {
    onEmptyResult () {
      alert('Empty results')
    }
  }
}
</script>
