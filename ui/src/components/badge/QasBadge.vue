<template>
  <component :is="component.is" v-bind="component.props" class="q-px-sm q-py-xs qas-badge text-caption">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'QasBadge',
  inheritAttrs: false
})

const props = defineProps({
  color: {
    type: String,
    default: 'light-blue-2'
  },

  label: {
    type: String,
    default: ''
  },

  multiLine: {
    type: Boolean
  },

  textColor: {
    type: String,
    default: 'black'
  },

  removable: {
    type: Boolean
  },

  tabindex: {
    type: [String, Number],
    default: undefined
  }
})

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
  min-height: 24px;
}
</style>
