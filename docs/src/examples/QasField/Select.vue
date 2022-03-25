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
        name: 'select',
        type: 'select',
        label: 'Campo select',
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
