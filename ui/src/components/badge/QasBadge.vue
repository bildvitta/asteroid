<template>
  <component :is="component.is" v-bind="component.props" class="q-px-sm qas-badge text-caption">
    <slot />
  </component>
</template>

<script setup>
import { baseProps } from '../../shared/badge-config'

import { computed } from 'vue'

defineOptions({
  name: 'QasBadge',
  inheritAttrs: false
})

const props = defineProps(baseProps)

const emit = defineEmits(['remove'])
const model = defineModel({ type: Boolean, default: true })

const component = computed(() => {
  const isChip = props.removable

  return {
    is: isChip ? 'q-chip' : 'q-badge',
    props: {
      // comum
      color: props.color,
      dense: true,
      textColor: props.textColor,
      label: props.label,

      // somente QChip
      ...(isChip && {
        iconRemove: 'sym_r_close',
        removable: true,
        square: true,
        tabindex: props.tabindex,
        modelValue: model.value,
        ripple: false,
        onRemove: () => emit('remove')
      }),

      // somente QBadge
      ...(!isChip && {
        multiLine: props.multiLine,
        ariaMultiline: props.multiLine
      })
    }
  }
})
</script>

<style lang="scss">
.qas-badge {
  min-height: 20px;
  padding-bottom: 2px;
  padding-top: 2px;
}
</style>
