<template>
  <q-page class="container q-col-gutter-y-md row">
    <qas-form-generator v-model="values" :fields="mockData.fields" :fields-props="fieldsProps" :result="mockData.results[0]" />
    <pre>{{ values }}</pre>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: '',
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
    },

    fieldsProps () {
      return {
        name: {
          'onUpdate:modelValue': value => console.log(value, 'update')
        }
      }
    }
  },

  watch: {
    mockData: {
      handler (value) {
        this.values = { ...value.results[0] }
        // for (const key in value.fields) {
        //   this.values[key] = value.results[0][key]
        // }
      },
      immediate: true
    }
  }
}
</script>
