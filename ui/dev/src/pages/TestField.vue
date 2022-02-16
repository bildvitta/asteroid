<template>
  <q-page class="container q-col-gutter-y-md row">
    <div v-for="(item, key) in mockData.fields" :key="key" class="col-12">
      <qas-field v-model="values[key]" :field="item" />
    </div>
    <pre>{{ values }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      values: {}
    }
  },

  computed: {
    mockData () {
      return require('../mock/fetchList.json')
    },

    field () {
      return {
        type: 'select',
        name: 'test',
        options: [
          {
            label: 'Teste 1',
            value: 1,
            description: 'Torre 1, bloco 2'
          },
          {
            label: 'Teste 2',
            value: 2,
            description: 'Torre 1, bloco 3'
          }
        ]
      }
    }
  },

  watch: {
    mockData: {
      handler (value) {
        for (const key in value.fields) {
          this.values[key] = value.results[0][key]
        }
      },
      immediate: true
    }
  }
}
</script>
