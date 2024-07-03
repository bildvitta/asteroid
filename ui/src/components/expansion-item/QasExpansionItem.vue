<template>
  <div class="qas-expansion-item" :class="errorClasses">
    <component :is="component.is" class="qas-expansion-item__box">
      <q-expansion-item header-class="text-bold q-mt-sm q-pa-none" :label="props.label">
        <template #header>
          <slot name="header">
            <div class="full-width">
              <div class="items-center q-col-gutter-sm row">
                <slot name="label">
                  <h5 class="col-auto text-h5 text-weight-medium">
                    {{ props.label }}
                  </h5>
                </slot>

                <div class="col-auto items-center q-col-gutter-sm row">
                  <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex" class="col-auto">
                    <qas-badge v-bind="badge" />
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </template>

        <q-separator v-if="!hasNestedExpansionItem" class="q-my-md" />

        <slot name="content">
          <qas-grid-generator v-if="hasGridGenerator" v-bind="gridGeneratorProps" use-inline />
        </slot>

        <q-separator v-if="hasNestedExpansionItem && props.useBottomSeparator" class="q-my-md" />
      </q-expansion-item>
    </component>

    <div v-if="hasError" class="q-pt-sm qas-expansion-item__error-message text-caption text-negative">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
import QasBox from '../box/QasBox.vue'

import { computed, provide, inject } from 'vue'

defineOptions({ name: 'QasExpansionItem' })

const props = defineProps({
  badges: {
    type: Array,
    default: () => []
  },

  error: {
    type: Boolean
  },

  errorMessage: {
    type: String,
    default: ''
  },

  label: {
    type: String,
    default: ''
  },

  gridGeneratorProps: {
    type: Object,
    default: () => ({})
  },

  useBottomSeparator: {
    type: Boolean,
    default: true
  }
})

provide('isExpansionItem', true)

const hasNestedExpansionItem = inject('isExpansionItem', false)

const component = {
  is: hasNestedExpansionItem ? 'div' : QasBox
}

const hasError = computed(() => props.error || !!props.errorMessage)
const errorClasses = computed(() => ({ 'qas-expansion-item--error': hasError.value }))
const hasGridGenerator = computed(() => !!Object.keys(props.gridGeneratorProps).length)
</script>

<style lang="scss">
.qas-expansion-item {
  $root: &;

  & + & {
    margin-top: var(--qas-spacing-lg);
  }

  &--error {
    #{$root}__box {
      border: 2px solid $negative;
    }

    #{$root}__error-message {
      padding-left: 12px; // espaçamento igual ao de erro do quasar.
    }
  }

  .q-item {
    margin-top: 0;
    min-height: auto;
  }

  .q-item:hover {
    color: initial !important;
  }
}
</style>
