<template>
  <qas-btn class="settings-menu" color="primary" v-bind="$attrs" v-on="$listeners" icon="o_settings" hide-mobile-label :label="label" outline>
    <q-menu class="settings-menu__menu" persistent>
      <q-list separator class="settings-menu__list">
        <slot v-for="(item, key) in list" :name="key" :item="item">
          <q-item clickable class="text-primary text-bold" :key="key" v-bind="item.props" @click="onClick(item)">
            <q-item-section>
              <div class="flex justify-center items-center q-gutter-x-md">
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
import QasBtn from '../btn/QasBtn.vue'

export default {
  components: {
    QasBtn
  },

  props: {
    list: {
      type: Object,
      default: () => ({})
    },

    label: {
      type: String,
      default: 'Configurações'
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
.settings-menu {
  &__list {
    width: 265px;
  }
}
</style>
