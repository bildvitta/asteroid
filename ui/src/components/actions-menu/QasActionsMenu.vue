<template>
  <qas-btn class="qas-actions-menu" flat :icon-right="icon" :label="label" padding="xs" :ripple="false" text-color="dark" :use-label-on-small-screen="false">
    <q-menu class="q-py-xs qas-actions-menu__menu">
      <q-list class="qas-actions-menu__list">
        <slot v-for="(item, key) in list" :item="item" :name="key">
          <q-item :key="key" v-bind="item.props" clickable color="dark" @click="onClick(item)">
            <q-item-section>
              <div class="flex items-center q-gutter-x-md">
                <q-icon :name="item.icon" size="sm" />
                <div>{{ item.label }}</div>
              </div>
            </q-item-section>
          </q-item>
        </slot>

        <qas-delete v-if="hasDelete" v-bind="deleteProps" clickable tag="q-item">
          <q-item-section>
            <div class="flex items-center q-gutter-x-sm">
              <q-icon :name="deleteIcon" size="sm" />
              <div>{{ deleteLabel }}</div>
            </div>
          </q-item-section>
        </qas-delete>
      </q-list>
    </q-menu>
  </qas-btn>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasActionsMenu',

  components: {
    QasBtn
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
    hasDelete () {
      return !!Object.keys(this.deleteProps).length
    }
  },

  methods: {
    onClick (item) {
      if (typeof item.handler === 'function') {
        const { handler, ...filtered } = item
        item.handler(filtered)
      }
    }
  }
}
</script>

<style lang="scss">
.qas-actions-menu {
  transition: color 300ms;

  &:hover {
    color: var(--q-primary) !important;
  }

  .q-focus-helper {
    display: none;
  }

  &__list {
    z-index: 1;

    .q-item {
      font-weight: 600;
    }
  }
}
</style>
