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

// const isOptionGroup = computed(() => !!attrs.options?.length)

// const attributes = computed(() => {
//   const {
//     inline = false,
//     dense = true
//   } = attrs

//   return {
//     ...attrs,
//     inline: isOptionGroup.value ? inline : undefined,
//     dense
//   }
// })

// const component = computed(() => attrs.options?.length ? 'q-option-group' : 'q-radio')

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
console.log('TCL: component -> component', component)
</script>
