<template>
  <component :is="component.is" v-bind="component.props" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

defineOptions({ name: 'PvTableGeneratorProps' })

const props = defineProps({
  componentName: {
    type: String,
    default: 'QasTextTruncate'
  },

  componentProps: {
    type: Object,
    default: () => ({})
  },

  row: {
    type: Object,
    default: () => ({})
  },

  name: {
    type: String,
    default: 'name'
  }
})

const component = computed(() => {
  const componentPaths = {
    QasTextTruncate: {
      component: () => import('../../text-truncate/QasTextTruncate.vue'),
      props: {
        text: props.row[props.name],
        maxWidth: 400
      }
    },

    QasToggleVisibility: {
      component: () => import('../../toggle-visibility/QasToggleVisibility.vue'),
      props: {}
    },

    QasCopy: {
      component: () => import('../../copy/QasCopy.vue'),
      props: {
        text: props.row[props.name]
      }
    }
  }

  return {
    is: defineAsyncComponent(componentPaths[props.componentName].component),
    props: {
      ...componentPaths[props.componentName].props
    }
  }
})
</script>
