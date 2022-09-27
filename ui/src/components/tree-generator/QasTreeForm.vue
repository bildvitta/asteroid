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
        v-bind="formGeneratorProps"
      />
    </template>
  </qas-form-view>
</template>

<script>
import QasFormGenerator from '../form-generator/QasFormGenerator.vue'
import QasFormView from '../form-view/QasFormView.vue'
// import { filterObject } from 'asteroid'

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
