<template>
  <q-icon v-bind="iconProps">
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
const formattedSize = computed(() => {
  const spacingKey = getNormalizedSpacingKey(props.size)

  return SpacingWithUnit[spacingKey]
})

const iconProps = computed(() => {
  return {
    name: props.icon,
    size: formattedSize.value,
    color: props.color
  }
})

// functions
/**
 * Necessário para encontrar a chave correta no enum SpacingWithUnit.
 * @param key {string}
 */
function getNormalizedSpacingKey (key) {
  // Normaliza a primeira letra (ex: 'md' => 'Md')
  const capitalized = key.charAt(0).toUpperCase() + key.slice(1)

  if (Object.prototype.hasOwnProperty.call(SpacingWithUnit, capitalized)) return capitalized
}
</script>
