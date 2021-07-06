<template>
  <div class="qas-nested-fields">
    <div class="text-left">
      <qas-label v-if="useSingleLabel" :label="label" />
    </div>

    <div>
      <component :is="componentIs" ref="inputContent" name="fade" tag="div">
        <div v-for="(row, index) in nested" :key="index" class="full-width">
          <component :is="componentIs" name="fade" tag="div">
            <div v-if="!row[destroyKey]" :key="index" class="col-12 q-mt-md">
              <div>
                <div class="flex items-center justify-between q-py-xs">
                  <qas-label v-if="!useSingleLabel" :label="setRowLabel(index)" />

                  <div v-if="!useInlineActions" class="q-gutter-x-sm">
                    <qas-btn v-if="useDuplicate" v-bind="btnDuplicateProps" @click="add(row)" />
                    <qas-btn v-if="showDestroyBtn" v-bind="btnDestroyProps" @click="destroy(index, row)" />
                  </div>
                </div>

                <slot>
                  <div class="col-12 justify-between q-col-gutter-x-md row">
                    <qas-form-generator ref="formGenerator" v-model="nested[index]" :class="formClasses" :columns="formColumns" :errors="errors[index]" :fields="children" :fields-events="fieldsEvents" :fields-props="fieldsProps" @input="updateValuesFromInput($event, index)">
                      <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
                        <slot :name="key" v-bind="scope" />
                      </template>
                    </qas-form-generator>

                    <div v-if="useInlineActions" class="flex items-center qas-nested-fields__actions">
                      <qas-btn v-if="useDuplicate" class="col-auto" color="primary" flat icon="o_content_copy" round @click="add(row)" />
                      <qas-btn v-if="showDestroyBtn" class="col-auto" color="negative" flat icon="o_cancel" round @click="destroy(index, row)" />
                    </div>
                  </div>
                </slot>
                <div class="col-12">
                  <slot :index="index" :model-value="nested[index]" name="custom-fields" :update-value="updateValuesFromInput" />
                </div>
              </div>
            </div>
          </component>
        </div>
      </component>

      <slot :add="add" name="add-input">
        <div v-if="useInlineActions" class="cursor-pointer items-center q-col-gutter-x-md q-mt-md row" @click="add()">
          <qas-input class="col disabled no-pointer-events" hide-bottom-space :label="addInputLabel" outlined @focus="add()" />

          <div>
            <qas-btn class="col-auto" color="green" flat icon="o_add_circle_outline" round />
          </div>
        </div>

        <div v-else class="q-mt-lg">
          <qas-btn ref="test" class="full-width q-py-sm" icon="o_add" outline @click="add()">{{ addInputLabel }}</qas-btn>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn'
import QasFormGenerator from '../form-generator/QasFormGenerator'
import QasInput from '../input/QasInput'
import QasLabel from '../label/QasLabel'

import { extend } from 'quasar'
import { camelize } from 'humps'

export default {
  name: 'QasNestedFields',

  components: {
    QasBtn,
    QasFormGenerator,
    QasInput,
    QasLabel
  },

  props: {
    addInputLabel: {
      type: String,
      default: 'Inserir novo campo'
    },

    btnDestroyProps: {
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

    btnDuplicateProps: {
      type: Object,
      default: () => {
        return {
          label: 'Duplicar',
          icon: 'o_content_copy',
          flat: true,
          hideMobileLabel: true,
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
      default: () => []
    },

    field: {
      type: Object,
      default: () => ({})
    },

    fieldsEvents: {
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

    useInlineActions: {
      type: Boolean
    },

    useSingleLabel: {
      type: Boolean
    },

    value: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      nested: []
    }
  },

  computed: {
    label () {
      return this.field?.label
    },

    children () {
      const field = extend(true, {}, this.field)

      for (const key in field?.children) {
        field.children[key].name = camelize(field?.children[key].name)
      }

      return field?.children
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

    componentIs () {
      return this.useAnimation ? 'transition-group' : 'div'
    }
  },

  watch: {
    value: {
      handler (value) {
        this.nested = extend(true, [], value)
      },
      immediate: true
    },

    field: {
      handler (value) {
        !this.value.length && this.setDefaultValue()
      },
      immediate: true
    }
  },

  methods: {
    add (row = {}) {
      this.nested.push({ ...this.rowObject, ...row })

      this.$nextTick(() => {
        this.useAnimation && this.setScroll()
        this.setFocus()
      })

      return this.emitter(null, this.nested.length - 1)
    },

    setFocus () {
      const formGenerator = this.$refs.formGenerator
      const firstElementToBeFocused = formGenerator[formGenerator.length - 1].$children[0].$children[0]

      return firstElementToBeFocused?.focus && firstElementToBeFocused.focus()
    },

    emitter (value, index) {
      const payload = { value: value || this.nested, row: index }
      return this.$emit('input', payload)
    },

    destroy (index, row) {
      this.nested.splice(index, 1, { [this.destroyKey]: true, ...row })

      return this.emitter(null, index)
    },

    updateValuesFromInput (value, index) {
      this.nested.splice(index, 1, value)

      return this.emitter(null, index)
    },

    setDefaultValue () {
      this.nested.splice(0, 0, { ...this.rowObject })
    },

    setScroll () {
      const elements = this.$refs.inputContent.children
      const element = elements[elements.length - 1].elm
      const { top } = element.getBoundingClientRect()
      const pageOffset = window.pageYOffset

      window.scrollTo({
        behavior: 'smooth',
        top: pageOffset + top
      })
    },

    setRowLabel (rowIndex) {
      return `${this.label} ${rowIndex + 1}`
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
