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
        name: 'signature-uploader',
        type: 'signature-uploader',
        label: 'Campo boleano',
        entity: 'users'
      }
    }
  }
}
</script>
