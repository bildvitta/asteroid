<!--
  * Este é um componente interno para ser utilizado dentro do componente "QasTreeGenerator"
  * por isto não existe documentação para este componente e nem é exportado para fora do asteroid
-->
<template>
  <qas-form-view ref="formView" v-model="values" v-model:errors="errors" v-model:fields="fields" :use-actions="false" :use-boundary="false" v-bind="formViewProps">
    <template #default>
      <qas-form-generator v-model="values" :errors="errors" :fields="fields" :use-box="false" v-bind="formGeneratorProps" />
    </template>
  </qas-form-view>
</template>

<script>
import QasFormGenerator from '../form-generator/QasFormGenerator.vue'
import QasFormView from '../form-view/QasFormView.vue'

export default {
  name: 'QasTreeForm',

  components: {
    QasFormGenerator,
    QasFormView
  },

  props: {
    formGeneratorProps: {
      type: Object,
      default: () => ({})
    },

    formViewProps: {
      type: Object,
      default: () => ({})
    },

    parent: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      errors: {},
      fields: {},
      values: {}
    }
  },

  watch: {
    parent (parent) {
      Object.assign(this.values, { parent })
    }
  },

  methods: {
    submit () {
      return this.$refs.formView.submitHandler()
    }
  }
}
</script>
