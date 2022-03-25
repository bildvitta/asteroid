<template>
  <div class="container spaced">
    <qas-field v-model="model" :field="field" />

    <div class="q-mt-lg">
      model: <pre>{{ model }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false
    }
  },

  computed: {
    field () {
      return {
        name: 'boolean',
        type: 'boolean',
        label: 'Campo boleano'
      }
    }
  }
}
</script>
