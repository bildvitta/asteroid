<template>
  <qas-dialog v-model="model" v-bind="defaultDialogProps">
    <template #description>
      <qas-form-view ref="formView" v-model="viewState.values" v-model:errors="viewState.errors" v-model:fetching="viewState.fetching" v-model:fields="viewState.fields" v-model:submitting="viewState.submitting" v-bind="defaultFormViewProps">
        <template #default>
          <slot name="form-view-default">
            <qas-form-generator v-bind="props.formGeneratorProps">
              <template v-for="(_, name) in $slots" #[`form-generator-${name}`]="context">
                <slot :name="name" v-bind="context" />
              </template>
            </qas-form-generator>
          </slot>
        </template>
      </qas-form-view>
    </template>
  </qas-dialog>
</template>

<script setup>
import QasDialog from './QasDialog.vue'
import QasFormGenerator from '../form-generator/QasFormGenerator.vue'
import QasFormView from '../form-view/QasFormView.vue'

import { useView } from '@bildvitta/composables'
import { ref, computed, useAttrs, watch } from 'vue'

defineOptions({ name: 'QasFormDialog' })

const props = defineProps({
  formViewProps: {
    type: Object,
    default: () => ({})
  },

  formGeneratorProps: {
    type: Object,
    default: () => ({})
  }
})

// models
const model = defineModel({ type: Boolean })
const viewStateModel = defineModel('viewState', { type: Object, default: () => ({}) })

// refs
const formView = ref(null)

// composables
const attrs = useAttrs()
const { reset, viewState } = useView({ mode: 'form' })

// computeds
const defaultDialogProps = computed(() => {
  return {
    ...attrs,

    ok: {
      label: 'Salvar',
      onClick: submit
    },

    useForm: true,

    // events
    onBeforeHide: reset
  }
})

const defaultFormViewProps = computed(() => {
  return {
    ...props.formViewProps,
    useActions: false,
    useBoundary: false
  }
})

// watch
watch(() => viewState.value, value => {
  Object.assign(viewStateModel.value, value)
})

// functions
function submit () {
  formView.value.submit()
}
</script>
