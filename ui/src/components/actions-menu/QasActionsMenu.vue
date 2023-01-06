<template>
  <div v-if="hasActions">
    <component :is="component.is" flat v-bind="component.props" :use-label-on-small-screen="useLabelOnSmallScreen" @click="onClick()">
      <q-menu v-if="hasMoreThanOneAction" auto-close class="q-py-xs">
        <q-list>
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
      </q-menu>
    </component>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasDelete from '../delete/QasDelete.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn,
    QasDelete
  },

  props: {
    icon: {
      default: 'sym_r_more_vert',
      type: String
    },

    label: {
      default: 'Opções',
      type: String
    },

    list: {
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

    useLabelOnSmallScreen: {
      type: Boolean
    }
  },

  computed: {
    actions () {
      return {
        ...this.list,
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
        props.label = 'Opções'
        props.iconRight = this.icon
        props.textColor = 'dark'
      } else {
        props.icon = this.actions[this.firstItemKey]?.icon
        props.label = this.actions[this.firstItemKey]?.label
        props.color = 'primary'
      }

      this.hasDelete && Object.assign(props, this.deleteProps)

      return {
        is: this.hasMoreThanOneAction || !this.hasDelete ? 'qas-btn' : 'qas-delete',
        props
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

    hasMoreThanOneAction () {
      return Object.keys(this.list || {}).length + Number(this.hasDelete) > 1
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
