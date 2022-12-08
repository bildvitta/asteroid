<template>
  <div v-if="hasActions" class="qas-actions-menu">
    <qas-btn v-if="hasMoreThanOneAction" class="qas-actions-menu__button" flat :icon-right="icon" :label="label" padding="xs" :ripple="false" text-color="dark">
      <q-menu class="q-py-xs qas-actions-menu__menu">
        <pv-actions-menu-list :list="actions" />
      </q-menu>
    </qas-btn>
    <pv-actions-menu-list v-else :list="actions" />
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import PvActionsMenuList from './private/PvActionsMenuList.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn,
    PvActionsMenuList
  },

  props: {
    icon: {
      default: 'o_more_vert',
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
      default: 'o_delete'
    },

    deleteProps: {
      default: () => ({}),
      type: Object
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
              tag: 'q-item'
            }
          }
        })
      }
    },

    hasActions () {
      return !!Object.keys(this.actions).length
    },

    hasDelete () {
      return !!Object.keys(this.deleteProps).length
    },

    hasMoreThanOneAction () {
      return Object.keys(this.actions).length > 1
    }
  }
}
</script>

<style lang="scss">
.qas-actions-menu {
  &__button {
    transition: color 300ms;

    &:hover {
      color: var(--q-primary) !important;
    }

    .on-right {
      margin-left: var(--qas-spacing-xs);
    }

    .q-focus-helper {
      display: none;
    }
  }
}
</style>
