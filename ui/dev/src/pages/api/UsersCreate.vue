<template>
  <qas-form-view v-model="values" class="container spaced" entity="users">
    <template v-slot:header>
      <qas-page-header no-breadcrumbs :title="title" />
    </template>
    <template v-slot="{ fields, errors }">
      {{ values }}
      <qas-form-generator v-model="values" :errors="errors" :fields="fields" :fields-props="fieldsProps" />
    </template>
  </qas-form-view>
</template>

<script>
export default {
  data () {
    return {
      values: {
      },
      test: ''
    }
  },

  computed: {
    title () {
      return 'Criar'
    },

    fieldsProps () {
      return {
        gender: {
          // autofocus: true,
          // name: 'test-input',
          rules: [val => {
            console.log(val, '>>>>> val')
            return !!val || '* Required'
          }]
       },
        name: {
          name: 'test-input',
          lazyRules: true,
          rules: [val => {
            console.log(val, '>>>>> val')
            return !!val || '* Required'
          }]
        }
      }
    }
  }
}
</script>
