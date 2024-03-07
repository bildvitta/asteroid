<template>
  <div v-if="hasList" class="inline-block qas-actions-menu" data-cy="actions-menu">
    <!-- <div v-if="hasActions" class="qas-actions-menu" data-cy="actions-menu"> -->
    <!-- <component :is="component.is" v-bind="component.props" variant="tertiary" @click.stop.prevent>
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
    </component> -->

    <qas-btn-dropdown v-bind="btnDropdownProps">
      <q-list data-cy="actions-menu-list">
        <slot v-for="(item, key) in formattedList.dropdownList" :item="item" :name="key">
          <q-item v-bind="getItemProps(item)" :key="key" clickable data-cy="actions-menu-list-item" @click="setClickHandler(item)">
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
    </qas-btn-dropdown>

    <q-tooltip v-if="hasTooltip" class="text-caption">
      {{ tooltipLabel }}
    </q-tooltip>
  </div>
</template>

<script setup>
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

import useScreen from '../../composables/use-screen'

import { computed, inject } from 'vue'

const DEFAULT_COLOR = 'grey-10'
const SPLIT_SIZE = 2

defineOptions({ name: 'QasActionsMenu' })

const qas = inject('qas')

const props = defineProps({
  buttonProps: {
    default: () => ({}),
    type: Object
  },

  disable: {
    type: Boolean
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
  },

  useSplit: {
    type: Boolean,
    default: true
  }
})

const screen = useScreen()

const { deleteBtnProps, hasDelete } = useDelete()

const listSize = computed(() => Object.keys(fullList.value).length)
const hasSplitName = computed(() => !!props.splitName)
const hasSplit = computed(() => hasSplitName.value && listSize.value > SPLIT_SIZE)
const isSingle = computed(() => Object.keys(fullList.value).length === 1)
const hasList = computed(() => !!Object.keys(fullList.value).length)

const fullList = computed(() => {
  return {
    ...props.list,
    ...deleteBtnProps.value
  }
})

const primaryKey1 = computed(() => {
  return props.splitName in fullList.value ? props.splitName : Object.keys(fullList.value)?.[0]
})

const btnDropdownProps = computed(() => {
  return {
    buttonsPropsList: formattedList.value.buttonsList,
    disable: props.disable,
    useSplit: hasSplit.value
  }
})

const primaryButtonProps = computed(() => {
  const buttonProps = fullList.value[primaryKey1.value] || {}

  return {
    color: isSingle.value && hasDelete.value ? DEFAULT_COLOR : 'primary',

    ...buttonProps,
    onClick: () => setClickHandler(buttonProps)
  }
})

const formattedList = computed(() => {
  const buttonsPropsList = { ...fullList.value }

  /**
   * dropdownList: lista que ficará no menu dropdown.
   * buttonsList: lista de botões que ficará **fora** do menu dropdown.
   */
  const payload = { dropdownList: {}, buttonsList: {} }

  /**
   * Cenário onde não é utilizado com split e não tem apenas 1 item, sendo o botão de "opções",
   * onde será usado em casos como dentro de cards, etc.
   */
  if ((!hasSplitName.value || screen.isSmall) && !isSingle.value) {
    payload.buttonsList.options = {
      color: DEFAULT_COLOR,
      iconRight: 'sym_r_more_vert',
      label: getLabel({ label: 'Opções' }),
      useLabelOnSmallScreen: false,

      ...props.buttonProps
    }

    payload.dropdownList = buttonsPropsList

    return payload
  }

  const primaryKey = primaryKey1.value
  const primaryButton = { ...primaryButtonProps.value }
  // const primaryButton = buttonsPropsList[primaryKey]

  /**
   * Cenário para quando existir apenas 1 item na lista.
   */
  if (isSingle.value) {
    payload.buttonsList = {
      [primaryKey]: {
        ...primaryButton
      }
    }

    return payload
  }

  /**
   * Cenário onde ficará um botão ao lado do outro "Ação primaria | Ação secundaria".
   */
  if (listSize.value === SPLIT_SIZE) {
    const secondaryKey = Object.keys(buttonsPropsList).find(key => key !== primaryKey)
    console.log('TCL: formattedList -> secondaryKey', secondaryKey)
    const secondaryButton = buttonsPropsList[secondaryKey]

    payload.buttonsList = {
      [primaryKey]: {
        ...primaryButton,
        label: getLabel(primaryButton)
      },

      [secondaryKey]: {
        ...secondaryButton,

        color: DEFAULT_COLOR,
        label: getLabel(secondaryButton),
        onClick: () => setClickHandler(secondaryButton)
      }
    }
  }

  /**
   * Cenário onde vai ter mais de 2 itens na lista, então precisa ficar
   * o botão primário fora do dropdown e o restante dentro do dropdown.
   */
  if (listSize.value > SPLIT_SIZE) {
    payload.buttonsList = {
      [primaryKey]: {
        ...primaryButton,
        label: getLabel(primaryButton)
      }
    }

    delete buttonsPropsList[primaryKey]

    payload.dropdownList = buttonsPropsList
  }

  return payload
})

const tooltipLabel = computed(() => primaryButtonProps.value?.label)
const hasTooltip = computed(() => {
  return !props.useLabel && props.useTooltip && isSingle.value
})

// functions
function getLabel (properties) {
  return props.useLabel ? properties.label : ''
}

function getItemProps (item) {
  const { disable, props: itemProps } = item

  return {
    disable,
    ...itemProps
  }
}

function setClickHandler (item = {}) {
  if (typeof item.handler === 'function') {
    const { handler, ...filtered } = item
    item.handler(filtered)
  }
}

// composables
function useDelete () {
  const hasDelete = computed(() => !!Object.keys(props.deleteProps).length)

  const deleteBtnProps = computed(() => {
    return {
      ...(hasDelete.value && {
        delete: {
          color: DEFAULT_COLOR,
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
