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

                <div v-if="hasBlockActions(row)" class="q-gutter-x-sm">
                  <qas-btn v-if="useDuplicate" v-bind="buttonDuplicateProps" @click="add(row)" />
                  <qas-btn v-if="showDestroyButton" v-bind="buttonDestroyProps" @click="destroy(index, row)" />
                </div>
              </div>

              <div ref="formGenerator" class="col-12 justify-between q-col-gutter-x-md row">
                <slot :errors="transformedErrors" :fields="children" :index="index" name="fields" :update-value="updateValuesFromInput">
                  <qas-form-generator v-model="nested[index]" :class="formClasses" :columns="formColumns" :disable="isDisabledRow(row)" :errors="transformedErrors[index]" :fields="children" :fields-props="fieldsProps" @update:model-value="updateValuesFromInput($event, index)">
                    <template v-for="(slot, key) in $slots" #[key]="scope">
                      <slot v-bind="scope" :disabled="isDisabledRow(row)" :errors="transformedErrors" :index="index" :name="key" />
                    </template>
                  </qas-form-generator>
                </slot>

                <div v-if="hasInlineActions(row)" class="flex items-center qas-nested-fields__actions">
                  <div class="col-auto">
                    <qas-btn v-if="useDuplicate" color="primary" flat icon="o_content_copy" round @click="add(row)" />
                  </div>
                  <div class="col-auto">
                    <qas-btn v-if="showDestroyButton" color="negative" flat icon="o_cancel" round @click="destroy(index, row)" />
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

      <div v-if="useAdd" class="q-mt-md">
        <slot :add="add" name="add-input">
          <div v-if="showAddFirstInputButton" class="text-left">
            <qas-btn class="q-px-sm" color="dark" flat @click="add()">{{ addFirstInputLabel }}</qas-btn>
          </div>

          <div v-else-if="useInlineActions" class="cursor-pointer items-center q-col-gutter-x-md q-mt-md row" @click="add()">
            <div class="col">
              <qas-input class="disabled no-pointer-events" hide-bottom-space :label="addInputLabel" outlined @focus="add()" />
            </div>

            <div class="col-auto">
              <qas-btn color="green" flat icon="o_add_circle_outline" round />
            </div>
          </div>

          <div v-else class="text-left">
            <qas-btn class="q-px-sm" color="dark" flat icon="o_add" @click="add()">{{ addInputLabel }}</qas-btn>
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
    addFirstInputLabel: {
      type: String,
      default: 'Clique aqui para adicionar'
    },

    addInputLabel: {
      type: String,
      default: 'Adicionar'
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

    disabledRows: {
      type: [Array, Boolean],
      default: false
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

    useAdd: {
      type: Boolean,
      default: true
    },

    useAnimation: {
      type: Boolean,
      default: true
    },

    useDestroyAlways: {
      type: Boolean,
      default: undefined
    },

    useDuplicate: {
      type: Boolean,
      default: true
    },

    useFirstInputButton: {
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

    useStartsEmpty: {
      default: true,
      type: Boolean
    },

    modelValue: {
      type: Array,
      default: () => []
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      nested: [],
      hasDestroyAlways: true
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

    showDestroyButton () {
      return this.nested.filter(item => !item[this.destroyKey]).length > 1 || this.hasDestroyAlways
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
        enterActiveClass: 'animated slideInDown'
      }
    },

    showAddFirstInputButton () {
      return this.useFirstInputButton && !this.nested.length
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        this.nested = extend(true, [], value)
      },
      deep: true,
      immediate: true
    },

    rowObject: {
      handler () {
        this.setDefaultNestedValue()
      },
      immediate: true
    },

    useDestroyAlways: {
      handler (value) {
        this.hasDestroyAlways = value ?? this.useStartsEmpty
      },
      immediate: true
    }
  },

  methods: {
    add (row = {}) {
      const payload = { ...this.rowObject, ...row }
      const hasIdentifierKey = payload[this.identifierItemKey]

      if (hasIdentifierKey) {
        delete payload[this.identifierItemKey]
      }

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

    /*
    * Se o item que for removido não tiver o identificador (uuid por ex) e "useRemoveOnDestroy" for "false"
    * ou "useRemoveOnDestroy" for "true" removemos o item do array, senão adicionamos a flag [destroyKey]
    * no item referente do array.
    *
    * Ex: ao adicionar um item e remover sem salvar, mesmo que useRemoveOnDestroy for false ele será removido
    * ao invés de adicionar a flag [destroyKey]
    */
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
      if (this.nested.length || this.useStartsEmpty) return
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
    },

    isDisabledRow (row) {
      if (!this.disabledRows) return false

      if (typeof this.disabledRows === 'boolean') return true

      return this.disabledRows.includes(row[this.identifierItemKey])
    },

    hasBlockActions (row) {
      return !this.useInlineActions && !this.isDisabledRow(row)
    },

    hasInlineActions (row) {
      return this.useInlineActions && !this.isDisabledRow(row)
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
