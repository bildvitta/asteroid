<template>
  <q-list class="pv-actions-menu-list">
    <slot v-for="(item, key) in list" :item="item" :name="key">
      <component :is="getComponent(key)" v-bind="item.props" :key="key" :class="itemClasses" clickable @click="onClick(item)">
        <q-item-section>
          <div class="flex items-center q-gutter-x-sm">
            <q-icon :name="item.icon" size="sm" />
            <div>{{ item.label }}</div>
          </div>
        </q-item-section>
      </component>
    </slot>
  </q-list>
</template>

<script>
import QasDelete from '../../delete/QasDelete.vue'

export default {
  name: 'PvActionsMenuList',

  components: {
    QasDelete
  },

  props: {
    list: {
      default: () => ({}),
      type: Object
    }
  },

  computed: {
    itemClasses () {
      return {
        'q-pa-xs': Object.keys(this.list).length === 1
      }
    }
  },

  methods: {
    getComponent (key) {
      if (key === 'delete') return 'qas-delete'

      return 'q-item'
    },

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
.pv-actions-menu-list {
  z-index: 1;

  .q-item {
    font-weight: 600;
  }
}
</style>
