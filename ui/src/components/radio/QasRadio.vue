<template>
  <component :is="component.is" v-bind="component.props" />
</template>

<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  name: 'QasRadio',
  inheritAttrs: false
})

const attrs = useAttrs()

/**
 * - quando é um grupo de opções, o componente é 'QOptionGroup', caso contrário,
 * é 'QRadio'.
 * - a propriedade inline só é usada no caso do QOptionGroup.
 * - todos os casos é usado o dense.
 */
const component = computed(() => {
  const isOptionGroup = !!attrs.options?.length

  const { inline = true, ...payloadProps } = attrs

  return {
    is: isOptionGroup ? 'q-option-group' : 'q-radio',
    props: {
      ...payloadProps,

      ...(isOptionGroup && {
        inline,
        class: {
          'q-gutter-x-md': inline,
          'q-gutter-y-md': !inline
        }
      }),

      dense: true
    }
  }
})
</script>
