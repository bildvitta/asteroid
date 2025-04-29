<template>
  <component :is="component.is" v-bind="component.props" @click.prevent.stop />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

defineOptions({ name: 'PvTableGeneratorProps' })

const props = defineProps({
  componentData: {
    type: Object,
    default: () => ({})
  },

  label: {
    type: String,
    default: ''
  },

  row: {
    type: Object,
    default: () => ({})
  },

  name: {
    type: String,
    default: ''
  }
})

const component = computed(() => {
  const defaultValue = props.row?.[props.name]

  const componentPaths = {
    QasActionsMenu: {
      component: () => import('../../actions-menu/QasActionsMenu.vue'),
      props: {}
    },

    QasBadge: {
      component: () => import('../../badge/QasBadge.vue'),
      props: {
        label: defaultValue
      }
    },

    QasBtn: {
      component: () => import('../../btn/QasBtn.vue'),
      props: {
        label: defaultValue
      }
    },

    QasCopy: {
      component: () => import('../../copy/QasCopy.vue'),
      props: {
        text: defaultValue
      }
    },

    QasStatus: {
      component: () => import('../../status/QasStatus.vue'),
      props: {}
    },

    QasTextTruncate: {
      component: () => import('../../text-truncate/QasTextTruncate.vue'),
      props: {
        dialogTitle: props.label,
        maxWidth: 260,

        // caso personalize o componente passando "list", não pode enviar "text" senão vai ter erro de tipo
        text: 'list' in (props.componentData.props || {}) ? '' : defaultValue
      }
    },

    QasToggleVisibility: {
      component: () => import('../../toggle-visibility/QasToggleVisibility.vue'),
      props: {
        text: defaultValue
      }
    }
  }

  return {
    is: defineAsyncComponent(componentPaths[props.componentData.component].component),
    props: {
      ...componentPaths[props.componentData.component].props,
      ...props.componentData.props
    }
  }
})
</script>
