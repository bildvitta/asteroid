<template>
  <div class="qas-list-items">
    <component :is="component" v-if="hasList" class="qas-list-items__container" :class="classes">
      <q-list separator>
        <q-item v-for="(item, index) in props.list" :key="index" :clickable="props.useClickableItem" @click="onClick({ item, index }, true)">
          <slot :index="index" :item="item" name="item">
            <q-item-section>
              <slot :index="index" :item="item" name="item-section">
                <qas-label
                  v-if="item[props.labelKey]"
                  :label="item[props.labelKey]"
                  :margin="getLabelMargin(item)"
                  typography="h5"
                />

                <div v-if="item[props.descriptionKey]" class="text-body1">
                  {{ item[props.descriptionKey] }}
                </div>
              </slot>
            </q-item-section>

            <q-item-section v-if="props.useSectionActions" side>
              <slot :index="index" :item="item" name="item-section-side">
                <qas-btn color="grey-10" :icon="props.icon" variant="tertiary" @click="onClick({ item, index })" />
              </slot>
            </q-item-section>
          </slot>
        </q-item>
      </q-list>
    </component>

    <qas-empty-result-text v-else :text="props.emptyResultText" />
  </div>
</template>

<script setup>
import QasBtn from '../btn/QasBtn.vue'

import { computed } from 'vue'

defineOptions({ name: 'QasListItems' })

const props = defineProps({
  descriptionKey: {
    type: String,
    default: 'description'
  },

  emptyResultText: {
    type: String,
    default: undefined
  },

  icon: {
    type: String,
    default: 'sym_r_chevron_right'
  },

  labelKey: {
    type: String,
    default: 'label'
  },

  list: {
    default: () => [],
    type: Array
  },

  useBox: {
    type: Boolean,
    default: true
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

// computeds
const classes = computed(() => ({ 'qas-list-items__container--no-click': !props.useClickableItem }))

const component = computed(() => props.useBox ? 'qas-box' : 'div')

const hasList = computed(() => !!props.list.length)

// functions
function onClick ({ item, index }, fromItem) {
  /**
   * se o click veio do q-item e "useClickableItem" for "false", ou
   * se o click não veio do q-item e "useClickableItem" for "true", então retorna sem emitir.
   */
  if ((fromItem && !props.useClickableItem) || (!fromItem && props.useClickableItem)) return

  emit('click-item', { item, index })
}

function getLabelMargin (item) {
  return item[props.descriptionKey] ? 'xs' : 'none'
}
</script>

<style lang="scss">
.qas-list-items {
  &__container {
    &--no-click {
      .q-item {
        .q-ripple {
          display: none;
        }
      }
    }

    .q-list {
      .q-item {
        min-height: auto;
      }

      & > .q-item {
        padding: var(--qas-spacing-md) 0;
      }

      & > .q-item:last-child {
        padding-bottom: 0;
      }

      & > .q-item:first-child {
        padding-top: 0;
      }
    }
  }
}
</style>
