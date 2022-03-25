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
      model: 4.84
    }
  },

  computed: {
    field () {
      return {
        name: 'decimal',
        type: 'decimal',
        label: 'Campo de decimal'
      }
    }
  }
}
</script>
