<template>
  <qas-btn class="qas-actions-menu" color="primary" hide-label-on-small-screen :icon="icon" :label="label" outline>
    <q-menu class="qas-actions-menu__menu">
      <q-list class="qas-actions-menu__list" separator>
        <slot v-for="(item, key) in list" :item="item" :name="key">
          <q-item :key="key" class="text-bold text-primary" clickable v-bind="item.props" @click="onClick(item)">
            <q-item-section>
              <div class="flex items-center justify-center q-gutter-x-md">
                <q-icon :name="item.icon" :size="item.iconSize" />
                <div>{{ item.label }}</div>
              </div>
            </q-item-section>
          </q-item>
        </slot>
      </q-list>
    </q-menu>
  </qas-btn>
</template>

<script>
import QasBtn from '../btn/QasBtn'

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
