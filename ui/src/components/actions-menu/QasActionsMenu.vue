<template>
  <div v-if="hasActions" class="qas-actions-menu">
    <component :is="component.is" v-bind="component.props" :use-label-on-small-screen="useLabelOnSmallScreen" variant="tertiary">
      <q-list v-if="hasMoreThanOneAction">
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
      default: () => {},
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

      if (this.hasSplit && this.list[this.splitName] && this.hasMoreThanOneAction) {
        delete list[this.splitName]
      }

      return {
        ...list,
        ...(this.hasDelete && {
          delete: {
            icon: this.deleteIcon,
            label: this.deleteLabel,
            props: {
              ...this.deleteProps,
              tag: this.hasMoreThanOneAction ? 'q-item' : 'qas-btn'
            }
          }
        })
      }
    },

    component () {
      // const props = {}

      if (this.hasMoreThanOneAction) {
        // const { icon, label } = this.list[this.splitName] || {}

        // Object.assign(props, {
        //   split: this.hasSplit,
        //   dropdownIcon: this.icon,
        //   buttonProps: {
        //     // icon,
        //     // color: this.color || 'grey-9',
        //     // ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' })
        //     icon,
        //     useHoverOnWhiteColor: this.defaultButtonProps.useHoverOnWhiteColor,
        //     color: this.defaultButtonProps.color,
        //     ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' })
        //   },
        //   onClick: () => this.onClick(this.list[this.splitName])
        // })

        // props.color = this.color || 'grey-9'
        // props.dropdownIcon = this.icon
        // props.split = this.hasSplit
        // props.icon = icon

        // props.buttonProps = {
        //   icon,
        //   ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' })
        // }

        // props.onClick = () => this.onClick(this.list[this.splitName])

        // if (this.useLabel) {
        //   props.label = this.hasSplit ? label : 'Opções'
        // }
      } else {
        // const { color, icon } = this.actions[this.firstItemKey] || {}

        // Object.assign(props, {
        //   icon,
        //   color: color || this.color || 'primary',
        //   label: this.useLabel ? this.tooltipLabel : '',
        //   useHoverOnWhiteColor: this.defaultButtonProps.useHoverOnWhiteColor
        // })

        // props.color = color || this.color || 'primary'
        // props.icon = icon
        // props.label = this.useLabel ? this.tooltipLabel : ''
      }

      // Object.assign(props.buttonProps, this.useHoverOnWhiteColor)

      // props.useHoverOnWhiteColor = this.useHoverOnWhiteColor

      // Object.assign(
      //   props,
      //   this.hasMoreThanOneAction ? this.btnDropdownProps : this.btnProps
      // )

      // if (this.hasDelete) Object.assign(props, this.deleteProps)

      const isButtonComponent = (this.hasMoreThanOneAction || !this.hasDelete)
      const singleActionComponent = isButtonComponent ? 'qas-btn' : 'qas-delete'

      const is = this.hasMoreThanOneAction ? 'qas-btn-dropdown' : singleActionComponent

      return {
        is,
        props: {
          ...(this.hasMoreThanOneAction ? this.btnDropdownProps : this.btnProps),
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

    hasMoreThanOneAction () {
      return Object.keys(this.list || {}).length + Number(this.hasDelete) > 1
    },

    hasTooltip () {
      return !this.hasMoreThanOneAction && !this.useLabel
    },

    tooltipLabel () {
      return this.actions[this.firstItemKey]?.label
    },

    defaultButtonProps () {
      return {
        color: this.color,
        icon: this.icon,
        useHoverOnWhiteColor: this.useHoverOnWhiteColor,
        useLabelOnSmallScreen: this.useLabelOnSmallScreen
      }
    },

    btnDropdownProps () {
      const { icon, label } = this.list[this.splitName] || {}
      const { color, useHoverOnWhiteColor } = this.defaultButtonProps

      return {
        buttonProps: {
          ...(this.useLabel && { label: this.hasSplit ? label : 'Opções' }),
          color,
          icon,
          useHoverOnWhiteColor
        },

        dropdownIcon: this.icon,
        split: this.hasSplit,

        // evento
        onClick: () => this.onClick(this.list[this.splitName])
      }
    },

    btnProps () {
      const { color, icon } = this.actions[this.firstItemKey] || {}
      const { color: defaultButtonColor, useHoverOnWhiteColor } = this.defaultButtonProps

      return {
        color: color || defaultButtonColor || 'primary',
        icon,
        label: this.useLabel ? this.tooltipLabel : '',
        useHoverOnWhiteColor
      }
    }
  },

  methods: {
    getComponent (key) {
      return key === 'delete' ? 'qas-delete' : 'q-item'
    },

    onClick (item = {}) {
      if (!this.hasMoreThanOneAction) {
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
