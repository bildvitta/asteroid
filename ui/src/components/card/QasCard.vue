<template>
  <div class="qas-card">
    <qas-box class="rounded-borders-right" v-bind="boxProps">
      <q-card class="column full-height overflow-hidden shadow-0">
        <div class="full-width items-center justify-between no-wrap row">
          <component :is="titleComponent" class="ellipsis text-h5 text-no-decoration" :class="titleClasses" :to="route">
            <slot name="title">
              {{ props.title }}
            </slot>
          </component>

          <qas-actions-menu v-if="hasActions" v-bind="formattedActionsMenuProps" />
        </div>

        <div class="q-my-sm qas-card__content">
          <slot name="default" />
        </div>

        <div class="q-mt-auto">
          <q-separator v-if="hasFooter" class="q-mb-sm" />

          <slot name="footer">
            <q-expansion-item v-if="hasExpansion" class="full-width" dense expand-icon-class="text-primary" header-class="q-pa-none text-primary" :label="props.expansionProps.label">
              <slot name="expansion-content">
                {{ props.expansionProps.content }}
              </slot>
            </q-expansion-item>
          </slot>
        </div>
      </q-card>
    </qas-box>
  </div>
</template>

<script setup>
import { computed, useSlots, inject } from 'vue'
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

// consts
const isInsideBox = inject('isBox', false)

// computeds
const boxProps = computed(() => {
  return {
    outlined: isInsideBox,
    unelevated: isInsideBox,
    spacingY: 'sm',
    style: style.value
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

const titleComponent = computed(() => hasRoute.value ? 'router-link' : 'h5')

const style = computed(() => {
  if (!props.statusColor) return

  const { getPaletteColor } = colors

  return {
    borderLeft: `4px solid ${getPaletteColor(props.statusColor)} !important`
  }
})

const slots = useSlots()

const hasFooterSlot = computed(() => !!slots.footer)

const hasFooter = computed(() => hasFooterSlot.value || hasExpansion.value)

const formattedActionsMenuProps = computed(() => {
  return {
    ...props.actionsMenuProps,
    useLabel: false
  }
})
</script>

<style lang="scss">
.qas-card {
  &__content {
    max-width: 100%;
  }

  &__router {
    &:hover {
      color: $primary;
    }
  }
}
</style>
