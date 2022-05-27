<template>
  <qas-btn class="qas-actions-menu" color="primary" :icon="icon" :label="label" outline padding="md" use-label-on-small-screen>
    <q-menu class="qas-actions-menu__menu">
      <q-list class="qas-actions-menu__list" separator>
        <slot v-for="(item, key) in list" :item="item" :name="key">
          <q-item :key="key" class="text-primary" clickable v-bind="item.props" @click="onClick(item)">
            <q-item-section>
              <div class="flex items-center justify-center q-gutter-x-md">
                <q-icon :name="item.icon" size="sm" />
                <div>{{ item.label }}</div>
              </div>
            </q-item-section>
          </q-item>
        </slot>

        <qas-delete v-if="hasDelete" v-bind="deleteProps" class="text-negative" clickable tag="q-item">
          <q-item-section>
            <div class="flex items-center justify-center q-gutter-x-sm">
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
      default: 'o_settings',
      type: String
    },

    label: {
      default: 'Configurações',
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
  &__list {
    width: 265px;
    z-index: 1;
  }
}
</style>
