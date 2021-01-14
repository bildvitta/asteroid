<template>
  <qas-btn class="qas-settings-menu" color="primary" v-bind="$attrs" hide-mobile-label icon="o_settings" :label="label" outline v-on="$listeners">
    <q-menu class="qas-settings-menu__menu" persistent>
      <q-list class="qas-settings-menu__list" separator>
        <slot v-for="(item, key) in list" :item="item" :name="key">
          <q-item :key="key" class="text-bold text-primary" clickable v-bind="item.props" @click="onClick(item)">
            <q-item-section>
              <div class="flex items-center justify-center q-gutter-x-md">
                <q-icon :name="item.icon" />
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
  components: {
    QasBtn
  },

  props: {
    label: {
      default: 'Settings',
      type: String
    },

    list: {
      default: () => ({}),
      type: Object
    }
  },

  methods: {
    onClick (item) {
      if (typeof item.handle === 'function') {
        const { handle, ...filtered } = item
        item.handle(filtered)
      }
    }
  }
}
</script>

<style lang="scss">
.qas-settings-menu {
  &__list {
    width: 265px;
  }
}
</style>
