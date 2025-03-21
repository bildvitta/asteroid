<template>
  <div :class="classes.container">
    <header v-bind="headerProps">
      <slot name="header">
        {{ props.label }}
      </slot>
    </header>

    <div v-bind="contentProps">
      <slot name="content">
        {{ props.value }}
      </slot>
    </div>
  </div>
</template>

<script setup>
import { useScreen } from '../../composables'

import { computed } from 'vue'

defineOptions({ name: 'QasGridItem' })

const props = defineProps({
  label: {
    type: String,
    default: ''
  },

  useEllipsis: {
    default: true,
    type: Boolean
  },

  useInline: {
    type: Boolean
  },

  value: {
    type: [String, Number, Boolean],
    default: ''
  }
})

const screen = useScreen()

// computed
const hasEllipsis = computed(() => props.useEllipsis && !screen.isSmall)

const classes = computed(() => {
  const isInline = props.useInline && !screen.isSmall

  return {
    container: {
      flex: isInline,
      'q-col-gutter-x-md': isInline,
      'justify-between': isInline,
      'col-12': isInline,
      'no-wrap': isInline
    },

    header: {
      'text-caption': !isInline,
      'text-body1': isInline
    },

    content: {
      'text-grey-10': true,
      'text-body1': !isInline,
      'text-subtitle1': isInline,
      ellipsis: hasEllipsis.value
    }
  }
})

const headerProps = computed(() => {
  return {
    class: classes.value.header,
    ...(hasEllipsis.value && { title: props.label })
  }
})

const contentProps = computed(() => {
  return {
    class: classes.value.content,
    ...(hasEllipsis.value && { title: props.value })
  }
})
</script>
