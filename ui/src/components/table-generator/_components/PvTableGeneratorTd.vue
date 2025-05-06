<template>
  <component :is="component.is" v-bind="component.props" />
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

  const isQasActionsMenu = props.componentData.component === 'QasActionsMenu'
  const isQasBtn = props.componentData.component === 'QasBtn'

  return {
    is: defineAsyncComponent(componentPaths[props.componentData.component].component),
    props: {
      ...componentPaths[props.componentData.component].props,
      ...props.componentData.props,

      // Caso for QasBtn ou QasActionsMenu preciso adicionar o stopPropagation e preventDefault no click para não chamar o rowClick ou rowRouteFn caso tenha.
      ...((isQasBtn || isQasActionsMenu) && {
        onClick: evt => {
          evt.stopPropagation()
          evt.preventDefault()

          // Caso for QasBtn eu repasso a ação do @click.
          if (isQasBtn) {
            props.componentData.props?.onClick?.(evt)
          }
        }
      })
    }
  }
})
</script>
