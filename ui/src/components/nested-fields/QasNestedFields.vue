<template>
  <div :id="fieldName" class="qas-nested-fields" :data-cy="`nested-fields-${fieldName}`">
    <component :is="containerComponent">
      <div v-if="useSingleLabel" class="text-left">
        <qas-label :label="fieldLabel" typography="h5" />
      </div>

      <div ref="inputContent">
        <component :is="componentTag" v-bind="componentProps">
          <template v-for="(row, index) in nested" :key="`row-${index}`">
            <div v-if="!row[destroyKey]" :id="`row-${index}`" class="full-width qas-nested-fields__field-item" data-cy="nested-fields-item">
              <header v-if="hasHeader" class="flex items-center q-pb-md" :class="headerClasses">
                <qas-label v-if="!useSingleLabel" :label="getRowLabel(index)" margin="none" typography="h5" />

                <qas-actions-menu v-if="hasBlockActions(row)" v-bind="getActionsMenuProps(index, row)" :use-label="false" />
              </header>

              <slot :errors="transformedErrors" :fields="getFields(index, row)" :index="index" :model="nested[index]" name="before-fields" :update-value="updateValuesFromInput" />

              <div ref="formGenerator" class="col-12 justify-between q-col-gutter-x-md row">
                <slot :errors="transformedErrors" :fields="getFields(index, row)" :index="index" name="fields" :update-value="updateValuesFromInput">
                  <qas-form-generator v-model="nested[index]" class="col" :columns="formColumns" :disable="isDisabledRow(row)" :errors="transformedErrors[index]" :fields="getFields(index, row)" :fields-props="getFieldsProps(index, row)" :gutter="formGutter" @update:model-value="updateValuesFromInput($event, index)">
                    <template v-for="(slot, key) in $slots" #[key]="scope">
                      <slot v-bind="scope" :disabled="isDisabledRow(row)" :errors="transformedErrors" :index="index" :name="key" />
                    </template>
                  </qas-form-generator>
                </slot>

                <div v-if="hasInlineActions(row)" class="flex items-center qas-nested-fields__actions">
                  <qas-actions-menu v-bind="getActionsMenuProps(index, row)" :use-label="false" />
                </div>
              </div>

              <slot :errors="transformedErrors" :fields="getFields(index, row)" :index="index" :model="nested[index]" name="after-fields" :update-value="updateValuesFromInput" />
            </div>
          </template>
        </component>

        <div v-if="useAdd">
          <slot :add="add" name="add-input">
            <div v-if="showAddFirstInputButton" class="text-left">
              <qas-btn class="q-px-sm" color="primary" data-cy="nested-fields-add-btn" :label="addFirstInputLabel" variant="tertiary" @click="add()" />
            </div>

            <div v-else-if="useInlineActions" class="cursor-pointer items-center q-col-gutter-x-md q-mt-md row" data-cy="nested-fields-add-btn" @click="add()">
              <div class="col">
                <qas-input class="disabled no-pointer-events" hide-bottom-space :label="addInputLabel" @focus="add()" />
              </div>

              <div class="col-auto">
                <qas-btn color="primary" icon="sym_r_add_circle_outline" variant="tertiary" />
              </div>
            </div>

            <div v-else class="text-left">
              <qas-btn class="q-px-sm" color="primary" data-cy="nested-fields-add-btn" icon="sym_r_add" :label="addInputLabel" variant="tertiary" @click="add()" />
            </div>
          </slot>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import QasActionsMenu from '../actions-menu/QasActionsMenu.vue'
import QasBtn from '../btn/QasBtn.vue'
import QasFormGenerator from '../form-generator/QasFormGenerator.vue'
import QasInput from '../input/QasInput.vue'
import QasLabel from '../label/QasLabel.vue'

import { constructObject } from '../../helpers'
import { Spacing } from '../../enums/Spacing'

import { TransitionGroup } from 'vue'
import debug from 'debug'
import { extend } from 'quasar'

const log = debug('asteroid-ui:qas-nested-fields')

export default {
  name: 'QasNestedFields',

  components: {
    QasActionsMenu,
    QasBtn,
    QasFormGenerator,
    QasInput,
    QasLabel,

    // Vue
    TransitionGroup
  },

  props: {
    actionsMenuProps: {
      type: [Object, Function],
      default: () => ({})
    },

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
          color: 'grey-10',
          icon: 'sym_r_delete',
          label: 'Excluir',
          variant: 'tertiary'
        }
      }
    },

    buttonDuplicateProps: {
      type: Object,
      default: () => {
        return {
          icon: 'sym_r_content_copy',
          label: 'Duplicar',
          useLabelOnSmallScreen: false,
          variant: 'tertiary'
        }
      }
    },

    destroyKey: {
      type: String,
      default: 'destroyed'
    },

    disabledRows: {
      type: [Array, Boolean, Function],
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

    fieldsHandlerFn: {
      type: Function,
      default: undefined
    },

    fieldsProps: {
      type: [Object, Function],
      default: () => ({})
    },

    formColumns: {
      type: [Array, String, Object],
      default: () => []
    },

    formGutter: {
      default: Spacing.Lg,
      type: [String, Boolean],
      validator: value => typeof value === 'boolean' || Object.values(Spacing).includes(value)
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

    useBox: {
      type: Boolean
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
    children () {
      return this.field?.children
    },

    containerComponent () {
      return this.useBox ? 'qas-box' : 'div'
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

    fieldLabel () {
      return this.field?.label
    },

    fieldName () {
      return this.field?.name
    },

    showDestroyButton () {
      return this.nested.filter(item => !item[this.destroyKey]).length > 1 || this.hasDestroyAlways
    },

    transformedErrors () {
      return Array.isArray(this.errors) ? this.errors : constructObject(this.fieldName, this.errors)
    },

    showAddFirstInputButton () {
      return this.useFirstInputButton && !this.nested.length
    },

    hasHeader () {
      return (this.useSingleLabel && !this.useInlineActions) || !this.useSingleLabel
    },

    headerClasses () {
      return {
        'justify-end': this.useSingleLabel,
        'justify-between': !this.useSingleLabel
      }
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
    getActionsMenuProps (index, row) {
      if (typeof this.actionsMenuProps === 'function') {
        return this.actionsMenuProps({
          index,
          row,
          list: this.getDefaultActionsMenuList(index, row)
        })
      }

      return {
        ...this.actionsMenuProps,
        list: this.getActionsMenuList(index, row)
      }
    },

    getDefaultActionsMenuList (index, row) {
      const list = {}

      if (this.useDuplicate) {
        list.duplicate = {
          ...this.buttonDuplicateProps,
          handler: () => this.add(row)
        }
      }

      if (this.showDestroyButton) {
        list.destroy = {
          ...this.buttonDestroyProps,
          handler: () => this.destroy(index, row)
        }
      }

      return list
    },

    getActionsMenuList (index, row) {
      const list = this.getDefaultActionsMenuList(index, row)

      for (const key in this.actionsMenuProps.list) {
        const { handler, ...content } = this.actionsMenuProps.list[key] || {}

        list[key] = {
          handler: payload => handler?.({ payload, row, index }),
          ...content
        }
      }

      return list
    },

    getFields (index, row) {
      const fields = this.children

      if (this.fieldsHandlerFn) {
        return this.fieldsHandlerFn({ fields, index, row })
      }

      return fields
    },

    getFieldsProps (index, row) {
      if (typeof this.fieldsProps === 'function') {
        return this.fieldsProps({ index, row })
      }

      return this.fieldsProps
    },

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

      log('add', payload)

      this.updateModelValue()
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

      log('destroy', { index, row })

      this.updateModelValue()
    },

    updateModelValue () {
      this.$emit('update:modelValue', this.nested)
    },

    updateValuesFromInput (value, index) {
      this.nested.splice(index, 1, value)

      this.updateModelValue()
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

    async setFocus () {
      await this.$nextTick()

      const { formGenerator } = this.$refs
      const firstElementToBeFocused = formGenerator.pop().querySelector('input, select, textarea')

      return firstElementToBeFocused?.focus && firstElementToBeFocused.focus()
    },

    getRealRowIndex (index) {
      return [...this.nested].splice(0, index).filter(item => !item[this.destroyKey]).length
    },

    getRowLabel (rowIndex) {
      if (this.rowLabel) {
        if (!this.useIndexLabel) return this.rowLabel

        const index = this.useRemoveOnDestroy ? rowIndex : this.getRealRowIndex(rowIndex)

        return `${this.rowLabel} ${index + 1}`
      }

      return this.fieldLabel
    },

    isDisabledRow (row) {
      if (!this.disabledRows) return false

      if (typeof this.disabledRows === 'function') return this.disabledRows(row)

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

  &__field-item {
    margin-bottom: var(--qas-spacing-md);
  }

  &__field-item + &__field-item {
    margin-top: var(--qas-spacing-xl);
  }
}
</style>
