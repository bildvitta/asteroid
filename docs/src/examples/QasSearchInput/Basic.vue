<template>
  <div class="container spaced">
    <qas-search-input v-model="search" />

    <div class="q-mt-lg">
      Model: {{ search }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    fieldsProps () {
      return {
        company: {
          label: 'Alterado label pelo fieldsProps!'
        }
      }
    }
  }
}
</script>
