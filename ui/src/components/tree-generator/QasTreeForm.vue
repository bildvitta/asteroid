<!--
  * Este é um componente interno para ser utilizado dentro do componente "QasTreeGenerator"
  * por isto não existe documentação para este componente e nem é exportado para fora do asteroid
-->
<template>
  <qas-form-view
    ref="formView"
    v-model="values"
    v-model:errors="errors"
    v-model:fields="fields"
    mode="replace"
    :use-actions="false"
    :use-boundary="false"
    v-bind="formViewProps"
  >
    <template #default>
      <qas-form-generator
        v-model="values"
        :errors="errors"
        :fields="fields"
        v-bind="formGeneratorProps"
      />
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
    }
  },

  data () {
    return {
      errors: {},
      fields: {},
      values: {}
    }
  },

  methods: {
    submit () {
      return this.$refs.formView.submitHandler()
    },

    validate () {
      return this.$refs.formView.$refs.form.validate()
    }
  }
}
</script>
