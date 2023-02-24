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
import PvActionsMenuBtnDropdown from './private/PvActionsMenuBtnDropdown.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn,
    QasDelete,
    PvActionsMenuBtnDropdown
  },

  props: {
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
      const props = {}

      if (this.hasMoreThanOneAction) {
        const { icon, label } = this.list[this.splitName] || {}

        props.color = this.color || 'grey-9'
        props.dropdownIcon = this.icon
        props.split = this.hasSplit
        props.icon = icon

        props.onSplitClick = () => this.onClick(this.list[this.splitName])

        if (this.useLabel) {
          props.label = this.hasSplit ? label : 'Opções'
        }
      } else {
        const { color, icon } = this.actions[this.firstItemKey] || {}

        props.color = color || this.color || 'primary'
        props.icon = icon
        props.label = this.useLabel ? this.tooltipLabel : ''
      }

      if (this.hasDelete) Object.assign(props, this.deleteProps)

      const isButtonComponent = (this.hasMoreThanOneAction || !this.hasDelete)
      const singleActionComponent = isButtonComponent ? 'qas-btn' : 'qas-delete'

      const is = this.hasMoreThanOneAction ? 'pv-actions-menu-btn-dropdown' : singleActionComponent

      return { is, props }
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
