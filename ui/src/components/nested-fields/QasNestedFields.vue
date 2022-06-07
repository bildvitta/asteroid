<template>
  <div :id="fieldName" class="qas-nested-fields">
    <div class="text-left">
      <qas-label v-if="useSingleLabel" :label="fieldLabel" />
    </div>

    <div ref="inputContent">
      <component :is="componentTag" v-bind="componentProps">
        <div v-for="(row, index) in nested" :id="`row-${index}`" :key="`row-${index}`" class="full-width">
          <div v-if="!row[destroyKey]" :key="index" class="col-12 q-mt-md">
            <div>
              <div class="flex items-center justify-between q-py-xs">
                <qas-label v-if="!useSingleLabel" :label="getRowLabel(index)" />

                <div v-if="!useInlineActions" class="q-gutter-x-sm">
                  <qas-btn v-if="useDuplicate" v-bind="buttonDuplicateProps" @click="add(row)" />
                  <qas-btn v-if="showDestroyBtn" v-bind="buttonDestroyProps" @click="destroy(index, row)" />
                </div>
              </div>

              <div ref="formGenerator" class="col-12 justify-between q-col-gutter-x-md row">
                <slot :errors="transformedErrors" :fields="children" :index="index" name="fields" :update-value="updateValuesFromInput">
                  <qas-form-generator v-model="nested[index]" :class="formClasses" :columns="formColumns" :errors="transformedErrors[index]" :fields="children" :fields-props="fieldsProps" @update:model-value="updateValuesFromInput($event, index)">
                    <template v-for="(slot, key) in $slots" #[key]="scope">
                      <slot v-bind="scope" :errors="transformedErrors" :index="index" :name="key" />
                    </template>
                  </qas-form-generator>
                </slot>

                <div v-if="useInlineActions" class="flex items-center qas-nested-fields__actions">
                  <div class="col-auto">
                    <qas-btn v-if="useDuplicate" color="primary" flat icon="o_content_copy" round @click="add(row)" />
                  </div>
                  <div class="col-auto">
                    <qas-btn v-if="showDestroyBtn" color="negative" flat icon="o_cancel" round @click="destroy(index, row)" />
                  </div>
                </div>
              </div>

              <div class="col-12">
                <slot :fields="children" :index="index" :model="nested[index]" name="custom-fields" :update-value="updateValuesFromInput" />
              </div>
            </div>
          </div>
        </div>
      </component>

      <div class="q-mt-md">
        <slot :add="add" name="add-input">
          <div v-if="useInlineActions" class="cursor-pointer items-center q-col-gutter-x-md q-mt-md row" @click="add()">
            <div class="col">
              <qas-input class="disabled no-pointer-events" hide-bottom-space :label="addInputLabel" outlined @focus="add()" />
            </div>

            <div class="col-auto">
              <qas-btn color="green" flat icon="o_add_circle_outline" round />
            </div>
          </div>

          <div v-else class="q-mt-lg">
            <qas-btn class="full-width q-py-md" icon="o_add" outline @click="add()">{{ addInputLabel }}</qas-btn>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasFormGenerator from '../form-generator/QasFormGenerator.vue'
import QasInput from '../input/QasInput.vue'
import QasLabel from '../label/QasLabel.vue'
import { TransitionGroup } from 'vue'

import { constructObject } from '../../helpers'
import { extend } from 'quasar'

export default {
  name: 'QasNestedFields',

  components: {
    QasBtn,
    QasFormGenerator,
    QasInput,
    QasLabel,

    // vue
    TransitionGroup
  },

  props: {
    addInputLabel: {
      type: String,
      default: 'Inserir novo campo'
    },

    buttonDestroyProps: {
      type: Object,
      default: () => {
        return {
          label: 'Remover',
          icon: 'o_cancel',
          flat: true,
          dense: true
        }
      }
    },

    buttonDuplicateProps: {
      type: Object,
      default: () => {
        return {
          label: 'Duplicar',
          icon: 'o_content_copy',
          flat: true,
          useLabelOnSmallScreen: false,
          dense: true
        }
      }
    },

    destroyKey: {
      type: String,
      default: 'destroyed'
    },

    errors: {
      type: [Array, Object],
      default: () => ({})
    },

    field: {
      type: Object,
      default: () => ({})
    },

    fieldsProps: {
      type: Object,
      default: () => ({})
    },

    formColumns: {
      type: Object,
      default: () => ({})
    },

    formGutter: {
      type: String,
      default: 'md',
      validator: value => {
        return [
          'xs',
          'sm',
          'md',
          'lg',
          'xl'
        ].includes(value)
      }
    },

    identifierItemKey: {
      type: String,
      default: 'uuid'
    },

    rowLabel: {
      type: String,
      default: ''
    },

    rowObject: {
      type: Object,
      default: () => ({})
    },

    useAnimation: {
      type: Boolean,
      default: true
    },

    useDestroyAlways: {
      type: Boolean
    },

    useDuplicate: {
      type: Boolean,
      default: true
    },

    useIndexLabel: {
      type: Boolean
    },

    useInlineActions: {
      type: Boolean
    },

    useSingleLabel: {
      type: Boolean
    },

    useRemoveOnDestroy: {
      type: Boolean,
      default: true
    },

    modelValue: {
      type: Array,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      nested: []
    }
  },

  computed: {
    fieldLabel () {
      return this.field?.label
    },

    fieldName () {
      return this.field?.name
    },

    children () {
      return this.field?.children
    },

    showDestroyBtn () {
      return this.nested.filter(item => !item[this.destroyKey]).length > 1 || this.useDestroyAlways
    },

    formClasses () {
      return {
        col: true,
        [`q-col-gutter-x-${this.formGutter}`]: this.useInlineActions
      }
    },

    transformedErrors () {
      return Array.isArray(this.errors) ? this.errors : constructObject(this.fieldName, this.errors)
    },

    componentTag () {
      return this.useAnimation ? 'transition-group' : 'div'
    },

    componentProps () {
      if (!this.useAnimation) return {}

      return {
        tag: 'div',
        enterActiveClass: 'animated slideInDown',
        leaveActiveClass: 'animated slideOutUp'
      }
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        this.nested = extend(true, [], value)

        if (!this.nested.length) return this.setDefaultNestedValue()
      },
      immediate: true
    }
  },

  methods: {
    add (row = {}) {
      const payload = { ...this.rowObject, ...row }

      this.nested.push(payload)

      this.$nextTick(() => {
        this.useAnimation && this.setScroll()
        this.setFocus()
      })

      this.$qas.logger.group('QasNestedFields - add', [payload])

      return this.updateModelValue()
    },

    setFocus () {
      const { formGenerator } = this.$refs
      const firstElementToBeFocused = formGenerator.pop().querySelector('input, select, textarea')

      return firstElementToBeFocused?.focus && firstElementToBeFocused.focus()
    },

    updateModelValue (value) {
      return this.$emit('update:modelValue', value || this.nested)
    },

    destroy (index, row) {
      !row[this.identifierItemKey] || this.useRemoveOnDestroy
        ? this.nested.splice(index, 1)
        : this.nested.splice(index, 1, { [this.destroyKey]: true, ...row })

      this.$qas.logger.group('QasNestedFields - destroy', [{ index, row }])

      return this.updateModelValue()
    },

    updateValuesFromInput (value, index) {
      this.nested.splice(index, 1, value)

      return this.updateModelValue(null, index)
    },

    setDefaultNestedValue () {
      this.nested.splice(0, 0, { ...this.rowObject })
    },

    setScroll () {
      const elements = this.$refs.inputContent.children
      const element = elements[elements.length - 1]
      const { top } = element.getBoundingClientRect()
      const pageOffset = window.pageYOffset

      window.scrollTo({
        behavior: 'smooth',
        top: pageOffset + top
      })
    },

    getRowLabel (rowKey) {
      if (this.rowLabel) {
        return this.useIndexLabel ? `${this.rowLabel} ${rowKey + 1}` : this.rowLabel
      }

      return this.fieldLabel
    }
  }
}
</script>

<style lang="scss">
.qas-nested-fields {
  &__actions {
    height: 56px;
  }
}
</style>
