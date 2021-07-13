<template>
  <q-page class="container spaced">
    <qas-select-list v-model="select" class="q-mb-md" :options="options" @added="added" @removed="removed" />
    <pre>{{ select }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      select: [],
      options: [
        { label: 'Cleyton', value: 'cleyton' },
        { label: 'Sua monica', value: 'monique' }
      ]
    }
  },

  methods: {
    added (item) {
      console.log(item, '<----- item')
    },

    removed (item, index) {
      console.log(item, '<------ item')
      console.log(index, '<------ index')
    }
  }
}
</script>
