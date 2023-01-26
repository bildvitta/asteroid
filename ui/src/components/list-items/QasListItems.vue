<template>
  <qas-box class="qas-list-items">
    <q-list separator>
      <q-item v-for="(item, index) in list" :key="index" v-ripple :clickable="useClickableItem" @click="onClick({ item, index }, true)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section" />
          </q-item-section>

          <q-item-section v-if="useSectionActions" side>
            <slot :index="index" :item="item" name="item-section-side">
              <qas-btn @click="onClick({ item, index })">
                <q-icon v-bind="iconProps" />
              </qas-btn>
            </slot>
          </q-item-section>
        </slot>
      </q-item>
    </q-list>
  </qas-box>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasBox from '../box/QasBox.vue'

export default {
  name: 'QasListItems',

  components: {
    QasBox,
    QasBtn
  },

  props: {
    // TODO rever
    icon: {
      type: String,
      default: 'sym_r_chevron_right'
    },

    iconProps: {
      default: () => ({ color: 'primary', name: 'sym_r_chevron_right' }),
      type: Object
    },

    list: {
      default: () => [],
      type: Array
    },

    useClickableItem: {
      type: Boolean
    },

    useSectionActions: {
      default: true,
      type: Boolean
    }
  },

  emits: ['click-item'],

  methods: {
    onClick ({ item, index }, fromItem) {
      /**
       * se o click veio do q-item e "useClickableItem" for "false", ou
       * se o click não veio do q-item e "useClickableItem" for "true", então retorna sem emitir.
       */
      if (
        (fromItem && !this.useClickableItem) || (!fromItem && this.useClickableItem)
      ) return

      this.$emit('click-item', { item, index })
    }
  }
}
</script>

<style lang="scss">
.qas-list-items {
  .q-list > .q-item {
    padding: 24px 16px;
  }
}
</style>
