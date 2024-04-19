<template>
  <div class="qas-expansion-item" :class="errorClasses">
    <qas-box class="qas-expansion-item__box">
      <q-expansion-item header-class="text-bold q-mt-sm q-pa-none" :label="props.label">
        <template #header>
          <slot name="header">
            <div class="full-width">
              <div class="items-center q-col-gutter-sm row">
                <h5 class="col-auto text-h5 text-weight-medium">
                  {{ props.label }}
                </h5>

                <div class="col-auto items-center q-col-gutter-sm row">
                  <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex" class="col-auto">
                    <qas-badge v-bind="badge" />
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </template>

        <q-separator class="q-my-md" />

        <slot name="content" />
      </q-expansion-item>
    </qas-box>

    <div v-if="hasError" class="q-pt-sm qas-expansion-item__error-message text-caption text-negative">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  }
})

const hasError = computed(() => props.error || !!props.errorMessage)

const errorClasses = computed(() => ({ 'qas-expansion-item--error': hasError.value }))
</script>

<style lang="scss">
.qas-expansion-item {
  $root: &;

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
