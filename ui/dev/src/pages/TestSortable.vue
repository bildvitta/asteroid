<template>
  <q-page class="container">
    <qas-sortable v-model:sortedModel="model" :results="results" class="row">
      <div v-for="(result, index) in results" :key="index">
        <img style="max-width: 300px;" :src="result.photo"/>
      </div>
    </qas-sortable>

    Model: <pre>{{ model }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: []
    }
  },

  computed: {
    results () {
      return [
        { photo: '//placehold.it/150/f00', id: '1w312l' },
        { photo: '//placehold.it/150/0f0', id: '2y927s' },
        { photo: '//placehold.it/150/00f', id: '3x432q' }
      ]
    }
  }
}
</script>
