<template>
  <q-icon v-bind="iconProps" aria-hidden="false" :aria-label="props.text" class="qas-tip">
    <qas-tooltip :text="props.text" />
  </q-icon>
</template>

<script setup>
import { Spacing, SpacingWithUnit } from '../../enums/Spacing'

import { computed } from 'vue'

defineOptions({ name: 'QasTip' })

const props = defineProps({
  text: {
    type: String,
    default: ''
  },

  icon: {
    type: String,
    default: 'sym_r_help'
  },

  size: {
    type: String,
    default: Spacing.Md,
    validator: value => Object.values(Spacing).includes(value)
  },

  color: {
    type: String,
    default: 'grey-8'
  }
})

// computeds
const iconProps = computed(() => {
  const spacingKey = getNormalizedSpacingKey(props.size)

  return {
    name: props.icon,
    size: SpacingWithUnit[spacingKey],
    color: props.color
  }
})

// functions
/**
 * Necessário para encontrar a chave correta no enum SpacingWithUnit.
 *
 * @param spacing {string} - spacing ('xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl')
 */
function getNormalizedSpacingKey (spacing) {
  // Normaliza a primeira letra (ex: 'md' => 'Md')
  const capitalized = spacing.charAt(0).toUpperCase() + spacing.slice(1)

  // Valida se existe a chave "Md" no enum
  if (Object.prototype.hasOwnProperty.call(SpacingWithUnit, capitalized)) return capitalized
}
</script>
<style lang="scss">
.qas-tip {
  cursor: help;
}
</style>
