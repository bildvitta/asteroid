<template>
  <qas-box class="qas-list-items" :class="classes">
    <q-list separator>
      <q-item v-for="(item, index) in props.list" :key="index" v-ripple :clickable="props.useClickableItem" @click="onClick({ item, index }, true)">
        <slot :index="index" :item="item" name="item">
          <q-item-section>
            <slot :index="index" :item="item" name="item-section" />
          </q-item-section>

          <q-item-section v-if="props.useSectionActions" side>
            <slot :index="index" :item="item" name="item-section-side">
              <qas-btn color="primary" :icon="props.icon" variant="tertiary" @click="onClick({ item, index })" />
            </slot>
          </q-item-section>
        </slot>
      </q-item>
    </q-list>
  </qas-box>
</template>

<script setup>
import QasBox from '../box/QasBox.vue'
import QasBtn from '../btn/QasBtn.vue'

import { computed } from 'vue'

defineOptions({ name: 'QasListItems' })

const props = defineProps({
  icon: {
    type: String,
    default: 'sym_r_chevron_right'
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
})

const emit = defineEmits(['click-item'])

const classes = computed(() => ({ 'qas-list-items--no-click': !props.useClickableItem }))

function onClick ({ item, index }, fromItem) {
  /**
   * se o click veio do q-item e "useClickableItem" for "false", ou
   * se o click não veio do q-item e "useClickableItem" for "true", então retorna sem emitir.
   */
  if (
    (fromItem && !props.useClickableItem) || (!fromItem && props.useClickableItem)
  ) return

  emit('click-item', { item, index })
}
</script>

<style lang="scss">
.qas-list-items {
  &--no-click {
    .q-item {
      .q-ripple {
        display: none;
      }
    }
  }

  .q-list {
    & > .q-item {
      padding: var(--qas-spacing-lg) 0;
    }

    & > .q-item:last-child {
      padding-bottom: 0;
    }

    & > .q-item:first-child {
      padding-top: 0;
    }

    // & > .q-item {
    //   padding: var(--qas-spacing-lg) 0;
    // }

  }
  .q-list > .q-item {

  }

  // .q-list > .q-item:last-child {
  //   padding-bottom: 0;
  // }
}
</style>
