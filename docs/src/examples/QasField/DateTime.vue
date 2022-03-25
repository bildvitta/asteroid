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
      model: ''
    }
  },

  computed: {
    field () {
      return {
        name: 'datetime',
        type: 'datetime',
        label: 'Campo de data e hora'
      }
    }
  }
}
</script>
