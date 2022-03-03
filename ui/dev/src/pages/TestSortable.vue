<template>
  <q-page class="container">
    <qas-sortable v-model:sorted="model" class="row" :results="results">
      <div v-for="(result, index) in results" :key="index">
        <img :src="result.photo" style="max-width: 300px;">
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
        { photo: 'https://picsum.photos/seed/picsum/200/300', id: '1w312l' },
        { photo: 'https://picsum.photos/200/300?grayscale', id: '2y927s' },
        { photo: 'https://picsum.photos/id/870/200/300?grayscale&blur=2', id: '3x432q' }
      ]
    }
  }
}
</script>
