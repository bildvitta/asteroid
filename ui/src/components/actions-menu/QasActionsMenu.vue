<template>
  <div v-if="hasActions" class="qas-actions-menu" data-cy="actions-menu">
    <component :is="component.is" v-bind="component.props" variant="tertiary" @click.stop.prevent>
      <q-list v-if="isBtnDropdown" data-cy="actions-menu-list">
        <slot v-for="(item, key) in actions" :item="item" :name="key">
          <q-item v-bind="item.props" :key="key" clickable data-cy="actions-menu-list-item" @click="onClick(item)">
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>
              <div>
                {{ item.label }}
              </div>
            </q-item-section>
          </q-item>
        </slot>
      </q-list>

      <q-tooltip v-if="hasTooltip" class="text-caption">
        {{ tooltipLabel }}
      </q-tooltip>
    </component>
  </div>
</template>

<script setup>
import QasBtn from '../btn/QasBtn.vue'
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

import useScreen from '../../composables/use-screen'

import { computed, inject } from 'vue'

defineOptions({ name: 'QasActionsMenu' })

const qas = inject('qas')

const props = defineProps({
  buttonProps: {
    default: () => ({}),
    type: Object
  },

  deleteLabel: {
    default: 'Excluir',
    type: String
  },

  deleteIcon: {
    default: 'sym_r_delete',
    type: String
  },

  deleteProps: {
    default: () => ({}),
    type: Object
  },

  dropdownIcon: {
    default: 'sym_r_more_vert',
    type: String
  },

  list: {
    default: () => ({}),
    type: Object
  },

  splitName: {
    default: '',
    type: String
  },

  useLabel: {
    default: true,
    type: Boolean
  },

  useTooltip: {
    type: Boolean
  }
})

const screen = useScreen()
const { deleteBtnProps, hasDelete } = useDelete()

const fullList = computed(() => {
  return {
    ...props.list,
    ...deleteBtnProps.value
  }
})

const hasSplit = computed(() => !!props.splitName)

// --------------------------------- actions -----------------------------------
const actions = computed(() => {
  const list = { ...fullList.value }

  if (hasSplit.value && list[props.splitName] && isBtnDropdown.value) {
    screen.isSmall
      ? Object.assign(list, { [props.splitName]: list[props.splitName] })
      : delete list[props.splitName]
  }

  return list
})

const hasActions = computed(() => !!Object.keys(actions.value).length)
const firstItemKey = computed(() => Object.keys(actions.value)?.[0])

// -------------------------------- tooltip ------------------------------------
const tooltipLabel = computed(() => actions.value[firstItemKey.value]?.label)
const hasTooltip = computed(() => {
  return !isBtnDropdown.value && !props.useLabel && props.useTooltip
})

// --------------------------------- button ------------------------------------
const defaultButtonProps = computed(() => {
  const { label, variant, ...buttonProps } = props.buttonProps

  return {
    useHoverOnWhiteColor: true,
    useLabelOnSmallScreen: false,
    ...buttonProps
  }
})

const btnDropdownProps = computed(() => {
  const { icon, label } = fullList.value[props.splitName] || {}

  const {
    icon: defaultIcon,
    ...defaultBtnProps
  } = defaultButtonProps.value

  return {
    buttonProps: {
      ...(props.useLabel && { label: hasSplit.value ? label : 'Opções' }),
      ...defaultBtnProps,
      icon: icon || defaultIcon
    },

    dropdownIcon: props.dropdownIcon,
    useSplit: hasSplit.value,

    onClick: () => onClick(fullList.value[props.splitName])
  }
})

const btnProps = computed(() => {
  const { color, icon } = actions.value[firstItemKey.value] || {}
  const { color: defaultColor, ...defaultBtnProps } = defaultButtonProps.value

  return {
    color: color || defaultColor,
    icon,
    label: props.useLabel ? tooltipLabel.value : '',
    onClick,
    ...defaultBtnProps
  }
})

const isBtnDropdown = computed(() => Object.keys(fullList.value || {}).length > 1)

// -------------------------------- component ----------------------------------
const component = computed(() => {
  const is = isBtnDropdown.value ? QasBtnDropdown : QasBtn

  return {
    is,
    props: {
      ...(isBtnDropdown.value ? btnDropdownProps.value : btnProps.value),
      ...(hasDelete.value && props.deleteProps)
    }
  }
})

// --------------------------------- methods -----------------------------------
function onClick (item = {}) {
  if (!isBtnDropdown.value) {
    item = actions.value[firstItemKey.value]
  }

  if (typeof item.handler === 'function') {
    const { handler, ...filtered } = item
    item.handler(filtered)
  }
}

// ------------------------------- composables ---------------------------------
function useDelete () {
  const hasDelete = computed(() => !!Object.keys(props.deleteProps).length)

  const deleteBtnProps = computed(() => {
    return {
      ...(hasDelete.value && {
        delete: {
          color: 'grey-10',
          icon: props.deleteIcon,
          label: props.deleteLabel,
          handler: () => qas.delete(props.deleteProps)
        }
      })
    }
  })

  return {
    deleteBtnProps,
    hasDelete
  }
}
</script>
