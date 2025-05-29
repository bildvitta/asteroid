<template>
  <component :is="component.is" v-bind="component.props" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

defineOptions({ name: 'PvTableGeneratorProps' })

const QasActionsMenu = defineAsyncComponent(() => import('../../actions-menu/QasActionsMenu.vue'))

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
      component: QasActionsMenu,
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

  // Os componentes abaixo precisam adicionar o stopPropagation e preventDefault no click para nao chamar o rowClick ou rowRouteFn
  const hasPreventEvent = ['QasActionsMenu', 'QasBtn'].includes(props.componentData.component)

  if (hasPreventEvent) {
    return {
      is: QasActionsMenu,
      props: {
        ...componentPaths[props.componentData.component].props,
        ...props.componentData.props,

        ...(hasPreventEvent && {
          onClick: event => {
            event.stopPropagation()
            event.preventDefault()

            props.componentData.props?.onClick?.(event)
          }
        })
      }
    }
  }

  return {
    is: defineAsyncComponent(componentPaths[props.componentData.component].component),
    props: {
      ...componentPaths[props.componentData.component].props,
      ...props.componentData.props

      // ...(hasPreventEvent && {
      //   onClick: event => {
      //     event.stopPropagation()
      //     event.preventDefault()

      //     props.componentData.props?.onClick?.(event)
      //   }
      // })
    }
  }
})
</script>
