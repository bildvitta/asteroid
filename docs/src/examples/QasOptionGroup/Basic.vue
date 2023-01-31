<template>
  <div class="container spaced">
    <qas-option-group v-model="model" v-bind="field" />

    <div class="q-mt-lg">
      model: <pre>{{ model }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: null
    }
  },

  computed: {
    field () {
      return {
        label: 'Campo Radio',
        options: [
          {
            label: 'Opção grande 1',
            value: '1'
          },
          {
            label: 'Opção grande 2',
            value: '2'
          },
          {
            label: 'Opção grande 3',
            value: '3'
          }
        ]
      }
    }
  }
}
</script>
