<template>
  <div class="full-width qas-card">
    <q-card
      class="column full-height overflow-hidden q-px-md q-py-sm rounded-borders-right rounded-borders-sm shadow-2"
      :style="style"
    >
      <div class="items-center justify-between row">
        <router-link
          class="qas-card__router text-h4"
          :to="route"
        >
          <slot name="title">{{ props.title }}</slot>
        </router-link>

        <qas-actions-menu
          v-if="hasActions"
          :list="actionsMenuProps"
          :use-label="false"
        />
      </div>

      <div class="q-my-sm">
        <slot name="default" />
      </div>

      <q-separator
        v-if="hasFooter"
        class="q-mb-sm"
      />

      <slot name="footer">
        <div class="full-width">
          <q-expansion-item
            v-if="props.useExpansion"
            dense
            expand-icon-class="text-primary"
            header-class="q-pa-none text-primary"
            :label="props.expansionProps.label"
          >
            <slot name="expansion-content">
              {{ props.expansionProps.content }}
            </slot>
          </q-expansion-item>
        </div>
      </slot>
    </q-card>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

import { colors } from 'quasar'

defineOptions({ name: 'QasCard' })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },

  route: {
    type: Object,
    default: () => ({})
  },

  actionsMenuProps: {
    type: Object,
    default: () => ({})
  },

  statusColor: {
    type: String,
    default: ''
  },

  useExpansion: {
    type: Boolean
  },

  expansionProps: {
    type: Object,
    default: () => ({})
  }
})

const hasActions = computed(() => !!Object.keys(props.actionsMenuProps).length)

const style = computed(() => {
  if (!props.statusColor) return

  const { getPaletteColor } = colors

  return {
    borderLeft: `4px solid ${getPaletteColor(props.statusColor)}`
  }
})

const slots = useSlots()

const hasFooterSlot = computed(() => !!slots.footer)

const hasFooter = computed(() => hasFooterSlot.value || props.useExpansion)
</script>

<style lang="scss">
.qas-card {
  &__router {
    text-decoration: none;

    &:hover {
      color: $primary;
    }
  }
}
</style>
