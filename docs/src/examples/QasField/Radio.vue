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
      model: null
    }
  },

  computed: {
    field () {
      return {
        name: 'radio',
        type: 'radio',
        label: 'Campo Radio',
        options: [
          {
            label: 'Opção 1',
            value: '1'
          },
          {
            label: 'Opção 2',
            value: '2'
          },
          {
            label: 'Opção 3',
            value: '3'
          }
        ]
      }
    }
  }
}
</script>
