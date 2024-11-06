<template>
  <div>
    <div v-if="canShowOptionGroupLabel" class="q-mb-sm text-body1">{{ optionGroupLabel }}</div>

    <component :is="component.is" v-bind="component.props" />
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  name: 'QasRadio',
  inheritAttrs: false
})

const props = defineProps({
  label: {
    default: '',
    type: String
  }
})

const attrs = useAttrs()

const isOptionGroup = computed(() => !!attrs.options?.length)

const optionGroupLabel = computed(() => props.label)

// Só mostra a label caso for q-option-group e tenha label vindo nas props
const canShowOptionGroupLabel = computed(() => isOptionGroup.value && !!optionGroupLabel.value)

/**
 * - quando é um grupo de opções, o componente é 'QOptionGroup', caso contrário,
 * é 'QRadio'.
 * - a propriedade inline só é usada no caso do QOptionGroup.
 * - todos os casos é usado o dense.
 */
const component = computed(() => {
  const { inline = true, ...payloadProps } = attrs

  return {
    is: isOptionGroup.value ? 'q-option-group' : 'q-radio',

    props: {
      ...payloadProps,

      label: props.label,

      ...(isOptionGroup.value && {
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
