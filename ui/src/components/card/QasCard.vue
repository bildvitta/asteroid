<template>
  <div class="col-12 col-lg-3 col-md-4 col-sm-6 qas-card">
    <q-card
      class="column full-height overflow-hidden q-px-md q-py-sm rounded-borders-right rounded-borders-sm shadow-2"
      :style="style"
    >
      <div class="items-center justify-between row">
        <router-link
          class="qas-card__router text-h4"
          :to="route"
        >
          {{ props.title }}
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

      <div
        v-if="hasFooterSlot"
        class="overflow-hidden row"
      >
        <slot name="footer" />
      </div>

      <q-expansion-item
        v-if="canUseExpansion"
        dense
        expand-icon-class="text-primary"
        header-class="q-pa-none text-primary"
        :label="footerLabel"
      >
        <slot name="expansion-content">
          {{ props.expansionContent }}
        </slot>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

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

  expansionContent: {
    type: String,
    default: ''
  },

  footerLabel: {
    type: String,
    default: 'Ver mais'
  }
})

const hasActions = computed(() => !!Object.keys(props.actionsMenuProps).length)

const style = computed(() => {
  if (!props.statusColor) return {}

  return {
    borderLeft: `4px solid ${props.statusColor}`
  }
})

const slots = useSlots()

const hasFooterSlot = computed(() => !!slots.footer)

const canUseExpansion = computed(() => !hasFooterSlot.value && props.useExpansion)

const hasFooter = computed(() => hasFooterSlot.value || canUseExpansion.value)
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
