<template>
  <div class="qas-list-items shadow-14">
    <q-list bordered class="rounded-borders" separator>
      <q-item v-for="(item, index) in list" :key="index" v-ripple :clickable="useClickableItem" @click="onClick({ item, index }, true)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section" />
          </q-item-section>

          <q-item-section v-if="useSectionActions" side>
            <slot :index="index" :item="item" name="item-section-side">
              <qas-btn flat round @click="onClick({ item, index })">
                <q-icon v-bind="iconProps" />
              </qas-btn>
            </slot>
          </q-item-section>
        </slot>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasListItems',

  components: {
    QasBtn
  },

  props: {
    iconProps: {
      default: () => ({ color: 'primary', name: 'o_chevron_right' }),
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
