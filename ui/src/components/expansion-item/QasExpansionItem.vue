<template>
  <div ref="expansionItem" class="full-width qas-expansion-item" :class="errorClasses" v-bind="expansionProps.parent">
    <component :is="component.is" class="qas-expansion-item__box">
      <q-expansion-item header-class="text-bold q-mt-sm q-pa-none" :label="props.label" v-bind="expansionProps.item">
        <template #header>
          <slot name="header">
            <div class="full-width">
              <div class="items-center q-col-gutter-sm row">
                <slot name="label">
                  <h5 class="col-auto text-h5">
                    {{ props.label }}
                  </h5>
                </slot>

                <div class="col-auto items-center q-col-gutter-sm row">
                  <div v-for="(badge, badgeIndex) in props.badges" :key="badgeIndex" class="col-auto">
                    <qas-badge v-bind="badge" />
                  </div>
                </div>
              </div>

              <div v-if="hasHeaderBottom" class="q-mt-sm">
                <slot name="header-bottom" />
              </div>
            </div>
          </slot>
        </template>

        <q-separator v-if="!isNestedExpansionItem" class="q-my-md" />

        <slot name="content">
          <qas-grid-generator v-if="hasGridGenerator" v-bind="gridGeneratorProps" use-inline />
        </slot>

        <q-separator v-if="hasBottomSeparator" class="q-mt-md" />
      </q-expansion-item>
    </component>

    <div v-if="hasError" class="q-pt-sm qas-expansion-item__error-message text-caption text-negative">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<script setup>
import QasBox from '../box/QasBox.vue'

import { computed, provide, inject, onMounted, ref, useAttrs } from 'vue'

defineOptions({
  name: 'QasExpansionItem',
  inheritAttrs: false
})

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

const attrs = useAttrs()

provide('isExpansionItem', true)

// slots
const slots = defineSlots()

// refs
const expansionItem = ref(null)
const hasNextSibling = ref(false)

onMounted(setHasNextSibling)

// constants
const isNestedExpansionItem = inject('isExpansionItem', false)
const component = {
  is: isNestedExpansionItem ? 'div' : QasBox
}

// computed
const hasError = computed(() => props.error || !!props.errorMessage)
const errorClasses = computed(() => ({ 'qas-expansion-item--error': hasError.value }))

const hasGridGenerator = computed(() => !!Object.keys(props.gridGeneratorProps).length)
const hasBottomSeparator = computed(() => isNestedExpansionItem && hasNextSibling.value)
const hasHeaderBottom = computed(() => !!slots['header-bottom'])

const expansionProps = computed(() => {
  const {
    'onUpdate:modelValue': onUpdateModelValue,
    onShow,
    onBeforeShow,
    onBeforeHide,
    onAfterShow,
    onAfterHide,
    ...propsPayload
  } = attrs

  return {
    parent: {
      ...propsPayload
    },

    item: {
      onUpdateModelValue,
      onShow,
      onBeforeShow,
      onBeforeHide,
      onAfterShow,
      onAfterHide
    }
  }
})

// functions

/**
 * Caso o componente esteja dentro de um QasExpansionItem, verifica se existe um próximo irmão
 * para adicionar um separador.
 */
function setHasNextSibling (value) {
  if (!isNestedExpansionItem) return

  const hasTextContentSibling = !!expansionItem.value.nextSibling.textContent?.trim?.()
  const hasElementSibling = !!expansionItem.value.nextElementSibling

  hasNextSibling.value = hasElementSibling || hasTextContentSibling
}
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
