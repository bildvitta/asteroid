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
                  <qas-label v-if="!useSingleLabel" :label="label" />

                  <div v-if="!useInlineActions" class="q-gutter-x-sm">
                    <qas-btn v-if="useDuplicate" v-bind="btnDuplicateProps" @click="add(row)" />
                    <qas-btn v-if="showDestroyBtn" v-bind="btnDestroyProps" @click="destroy(index, row)" />
                  </div>
                </div>

                <div class="col-12 justify-between q-col-gutter-x-md row">
                  <qas-form-generator v-model="nested[index]" :class="formClasses" :columns="formColumns" :errors="errors[index]" :fields="children" :fields-events="fieldsEvents" :fields-props="defaultFieldsProps" @input="updateValuesFromInput($event, index)">
                    <template v-for="(slot, key) in $scopedSlots" :slot="key" slot-scope="scope">
                      <slot :name="key" v-bind="scope" />
                    </template>
                  </qas-form-generator>

                  <div v-if="useInlineActions" class="flex items-center qas-nested-fields__actions">
                    <qas-btn v-if="useDuplicate" class="col-auto" color="primary" flat icon="o_content_copy" round @click="add(row)" />
                    <qas-btn v-if="showDestroyBtn" class="col-auto" color="negative" flat icon="o_cancel" round @click="destroy(index, row)" />
                  </div>
                </div>

                <div class="col-12">
                  <slot :index="index" :model-value="nested[index]" name="custom-fields" :update-value="updateValuesFromInput" />
                </div>
              </div>
            </div>
          </component>
        </div>
      </component>

      <slot :add="add" name="add-input">
        <div class="cursor-pointer items-center q-col-gutter-x-md q-mt-md row" @click="add()">
          <qas-input class="col disabled no-pointer-events" hide-bottom-space :label="addInputLabel" outlined @focus="add()" />

          <div>
            <qas-btn class="col-auto" color="green" flat icon="o_add_circle_outline" round />
          </div>
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
import { set } from 'lodash'

export default {
  components: {
    QasBtn,
    QasFormGenerator,
    QasInput,
    QasLabel
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },

    field: {
      type: Object,
      default: () => ({})
    },

    fieldsProps: {
      type: Object,
      default: () => ({})
    },

    errors: {
      type: Array,
      default: () => []
    },

    fieldsEvents: {
      type: Object,
      default: () => ({})
    },

    formColumns: {
      type: Object,
      default: () => ({})
    },

    destroyKey: {
      type: String,
      default: 'destroyed'
    },

    rowObject: {
      type: Object,
      default: () => ({})
    },

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

    useDuplicate: {
      type: Boolean,
      default: true
    },

    useAnimation: {
      type: Boolean,
      default: true
    },

    useInlineActions: {
      type: Boolean
    },

    useDestroyAlways: {
      type: Boolean
    },

    useSingleLabel: {
      type: Boolean
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
    }
  },

  data () {
    return {
      nested: [],
      defaultFieldsProps: {}
    }
  },

  computed: {
    label () {
      return this.field?.label
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
      // return [
      //   'col',
      //   `q-col-gutter-x-${this.formGutter}`
      // ]
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
    },

    fieldsProps: {
      handler (value) {
        this.defaultFieldsProps = { ...value }
      },
      immediate: true
    }
  },

  methods: {
    add (row = {}) {
      this.nested.push({ ...this.rowObject, ...row })
      this.setFocus()

      this.$nextTick(() => this.useAnimation && this.setScroll())
      return this.emitter()
    },

    setFocus () {
      return set(this.defaultFieldsProps, `${Object.keys(this.rowObject)[0]}.autofocus`, true)
    },

    emitter (value) {
      return this.$emit('input', value || this.nested)
    },

    destroy (index, row) {
      this.nested.splice(index, 1, { [this.destroyKey]: true, ...row })

      return this.emitter()
    },

    updateValuesFromInput (value, index) {
      this.nested.splice(index, 1, value)

      return this.emitter()
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
