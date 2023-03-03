<template>
  <div v-if="hasActions" class="qas-actions-menu">
    <component :is="component.is" v-bind="component.props" variant="tertiary">
      <q-list v-if="isBtnDropdown">
        <slot v-for="(item, key) in actions" :item="item" :name="key">
          <q-item v-bind="item.props" :key="key" clickable @click="onClick(item)">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <div>{{ item.label }}</div>
            </q-item-section>
          </q-item>
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
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn,
    QasBtnDropdown
  },

  props: {
    buttonProps: {
      default: () => ({}),
      type: Object
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

    dropdownIcon: {
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

    useLabel: {
      default: true,
      type: Boolean
    }
  },

  computed: {
    actions () {
      const list = { ...this.fullList }

      if (this.hasSplit && list[this.splitName] && this.isBtnDropdown) {
        this.isSmall
          ? Object.assign(list, { [this.splitName]: list[this.splitName] })
          : delete list[this.splitName]
      }

      return list
    },

    fullList () {
      return {
        ...this.list,
        ...(this.hasDelete && {
          delete: {
            color: 'grey-9',
            icon: this.deleteIcon,
            label: this.deleteLabel,
            handler: () => this.$qas.delete(this.deleteProps)
          }
        })
      }
    },

    component () {
      const is = this.isBtnDropdown ? 'qas-btn-dropdown' : 'qas-btn'

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
      return Object.keys(this.fullList || {}).length > 1
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
        useLabelOnSmallScreen: false,
        ...buttonProps
      }
    },

    btnDropdownProps () {
      const { icon, label } = this.fullList[this.splitName] || {}

      const {
        icon: defaultIcon,
        ...defaultButtonProps
      } = this.defaultButtonProps

      return {
        buttonProps: {
          ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' }),
          ...defaultButtonProps,
          icon: icon || defaultIcon
        },

        dropdownIcon: this.dropdownIcon,
        useSplit: this.hasSplit,

        // evento
        onClick: () => this.onClick(this.fullList[this.splitName])
      }
    },

    btnProps () {
      const { color, icon } = this.actions[this.firstItemKey] || {}
      const { color: defaultColor, ...defaultButtonProps } = this.defaultButtonProps

      return {
        color: color || defaultColor,
        icon,
        label: this.useLabel ? this.tooltipLabel : '',
        onClick: this.onClick,
        ...defaultButtonProps
      }
    },

    isSmall () {
      return this.$qas.screen.isSmall
    }
  },

  methods: {
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
