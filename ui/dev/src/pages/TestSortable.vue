<template>
  <q-page class="container">
    <qas-sortable :results="results">
      <template #sorted="{ sorted }">
        <div>
          sorteddd: <pre>{{ sorted }}</pre>
        </div>
      </template>
    </qas-sortable>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: 'tab1'
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
