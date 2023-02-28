<template>
  <div v-if="hasActions" class="qas-actions-menu">
    <component :is="component.is" v-bind="component.props" :use-label-on-small-screen="useLabelOnSmallScreen" variant="tertiary">
      <q-list v-if="isBtnDropdown">
        <slot v-for="(item, key) in actions" :item="item" :name="key">
          <component :is="getComponent(key)" v-bind="item.props" :key="key" clickable @click="onClick(item)">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <div>{{ item.label }}</div>
            </q-item-section>
          </component>
        </slot>
      </q-list>

      <q-tooltip v-if="hasTooltip" class="text-caption">
        {{ tooltipLabel }}
      </q-tooltip>
    </component>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasDelete from '../delete/QasDelete.vue'
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn,
    QasBtnDropdown,
    QasDelete
  },

  props: {
    buttonProps: {
      default: () => ({}),
      type: Object
    },

    color: {
      default: '',
      type: String
    },

    deleteLabel: {
      type: String,
      default: 'Excluir'
    },

    deleteIcon: {
      type: String,
      default: 'sym_r_delete'
    },

    deleteProps: {
      default: () => ({}),
      type: Object
    },

    icon: {
      default: 'sym_r_more_vert',
      type: String
    },

    list: {
      default: () => ({}),
      type: Object
    },

    splitName: {
      type: String,
      default: ''
    },

    useHoverOnWhiteColor: {
      default: true,
      type: Boolean
    },

    useLabel: {
      default: true,
      type: Boolean
    },

    useLabelOnSmallScreen: {
      type: Boolean
    }
  },

  computed: {
    actions () {
      const list = { ...this.list }

      if (this.hasSplit && this.list[this.splitName] && this.isBtnDropdown) {
        this.isSmall
          ? Object.assign(list, { [this.splitName]: this.list[this.splitName] })
          : delete list[this.splitName]
      }

      return {
        ...list,
        ...(this.hasDelete && {
          delete: {
            icon: this.deleteIcon,
            label: this.deleteLabel,
            props: {
              ...this.deleteProps,
              tag: this.isBtnDropdown ? 'q-item' : 'qas-btn'
            }
          }
        })
      }
    },

    component () {
      const isButtonComponent = (this.isBtnDropdown || !this.hasDelete)
      const singleActionComponent = isButtonComponent ? 'qas-btn' : 'qas-delete'

      const is = this.isBtnDropdown ? 'qas-btn-dropdown' : singleActionComponent

      return {
        is,
        props: {
          ...(this.isBtnDropdown ? this.btnDropdownProps : this.btnProps),
          ...(this.hasDelete && this.deleteProps)
        }
      }
    },

    firstItemKey () {
      return Object.keys(this.actions)?.[0]
    },

    hasActions () {
      return !!Object.keys(this.actions).length
    },

    hasDelete () {
      return !!Object.keys(this.deleteProps).length
    },

    hasSplit () {
      return !!this.splitName
    },

    isBtnDropdown () {
      return Object.keys(this.list || {}).length + Number(this.hasDelete) > 1
    },

    hasTooltip () {
      return !this.isBtnDropdown && !this.useLabel
    },

    tooltipLabel () {
      return this.actions[this.firstItemKey]?.label
    },

    defaultButtonProps () {
      const { label, variant, ...buttonProps } = this.buttonProps

      return {
        useHoverOnWhiteColor: true,
        ...buttonProps
      }
    },

    btnDropdownProps () {
      const { icon, label } = this.list[this.splitName] || {}
      const { icon: defaultIcon, ...defaultButtonProps } = this.defaultButtonProps

      console.log({
        ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' }),
        ...defaultButtonProps,
        icon: icon || defaultIcon
      })

      return {
        buttonProps: {
          ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' }),
          ...defaultButtonProps,
          icon: icon || defaultIcon
        },

        dropdownIcon: this.icon,
        split: this.hasSplit,

        // evento
        onClick: () => this.onClick(this.list[this.splitName])
      }
    },

    btnProps () {
      const { color, icon } = this.actions[this.firstItemKey] || {}
      const { color: defaultColor, ...defaultButtonProps } = this.defaultButtonProps
      console.log(this.buttonProps, 'this.defaultButtonProps btnProps')

      return {
        color: color || defaultColor,
        icon,
        label: this.useLabel ? this.tooltipLabel : '',
        ...defaultButtonProps
      }
    },

    isSmall () {
      return this.$qas.screen.isSmall
    }
  },

  methods: {
    getComponent (key) {
      return key === 'delete' ? 'qas-delete' : 'q-item'
    },

    onClick (item = {}) {
      if (!this.isBtnDropdown) {
        item = this.actions[this.firstItemKey]
      }

      if (typeof item.handler === 'function') {
        const { handler, ...filtered } = item
        item.handler(filtered)
      }
    }
  }
}
</script>
