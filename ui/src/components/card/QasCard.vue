<template>
  <div class="qas-card">
    <q-card class="column full-height overflow-hidden q-px-md q-py-sm rounded-borders-right rounded-borders-sm shadow-2" :style="style">
      <div class="items-center justify-between row">
        <component :is="titleComponent" class="text-h4 text-no-decoration" :class="titleClasses" :to="route">
          <slot name="title">
            {{ props.title }}
          </slot>
        </component>

        <qas-actions-menu v-if="hasActions" :list="actionsMenuProps" :use-label="false" />
      </div>

      <div class="q-my-sm">
        <slot name="default" />
      </div>

      <div class="q-mt-auto">
        <q-separator v-if="hasFooter" class="q-mb-sm" />

        <slot name="footer">
          <div class="full-width">
            <q-expansion-item v-if="hasExpansion" dense expand-icon-class="text-primary" header-class="q-pa-none text-primary" :label="props.expansionProps.label">
              <slot name="expansion-content">
                {{ props.expansionProps.content }}
              </slot>
            </q-expansion-item>
          </div>
        </slot>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

import { colors } from 'quasar'

defineOptions({ name: 'QasCard' })

const props = defineProps({
  actionsMenuProps: {
    type: Object,
    default: () => ({})
  },

  expansionProps: {
    type: Object,
    default: () => ({})
  },

  route: {
    type: Object,
    default: () => ({})
  },

  statusColor: {
    type: String,
    default: ''
  },

  title: {
    type: String,
    default: ''
  }
})

const hasActions = computed(() => !!Object.keys(props.actionsMenuProps).length)

const hasExpansion = computed(() => !!Object.keys(props.expansionProps).length)

const hasRoute = computed(() => !!Object.keys(props.route).length)

const titleClasses = computed(() => {
  return {
    'qas-card__router ': hasRoute.value
  }
})

const titleComponent = computed(() => hasRoute.value ? 'router-link' : 'div')

const style = computed(() => {
  if (!props.statusColor) return

  const { getPaletteColor } = colors

  return {
    borderLeft: `4px solid ${getPaletteColor(props.statusColor)}`
  }
})

const slots = useSlots()

const hasFooterSlot = computed(() => !!slots.footer)

const hasFooter = computed(() => hasFooterSlot.value || hasExpansion.value)
</script>

<style lang="scss">
.qas-card {
  &__router {
    &:hover {
      color: $primary;
    }
  }
}
</style>
