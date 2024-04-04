<template>
  <div v-if="hasList" class="qas-actions-menu" data-cy="actions-menu">
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

      <template v-for="(item, name) in tooltipLabels" :key="name" #[`bottom-${name}`]>
        <q-tooltip v-if="showTooltip(item)">
          {{ item.label }}
        </q-tooltip>
      </template>
    </qas-btn-dropdown>
  </div>
</template>

<script setup>
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

import useScreen from '../../composables/use-screen'

import useDelete from './composables/use-delete'
import useTooltips from './composables/use-tooltips'
import useOptionsActions from './composables/use-options-actions'
import useSingleAction from './composables/use-single-action'
import useDoubleSplitActions from './composables/use-double-split-actions'
import useSingleSplitActions from './composables/use-single-split-actions'

import getLabel from './utils/get-label'
import setClickHandler from './utils/set-click-handler'

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

const { deleteBtnProps, hasDelete } = useDelete({ color: DEFAULT_COLOR, props, qas })

const hasSplitName = computed(() => !!props.splitName)
const hasList = computed(() => !!Object.keys(fullList.value).length)

/**
 * Tamanho total da lista, considerando ação de deletar caso exista.
 */
const listSize = computed(() => Object.keys(fullList.value).length)

/**
 * Só existe split caso tenha a propriedade "splitName" e o tamanho da lista seja
 * maior que o tamanho permitido no SPLIT_SIZE (no caso 2).
 */
const hasSplit = computed(() => hasSplitName.value && listSize.value > SPLIT_SIZE)

/**
 * Quando existe apenas i item na lista, neste caso é mostrado o botão direto,
 * mesmo que não tenha a propriedade "splitName".
 */
const isSingle = computed(() => Object.keys(fullList.value).length === 1)

/**
 * Lista englobando as que vem por propriedade "list" mergeadas com a do
 * delete, caso exista.
 */
const fullList = computed(() => {
  return {
    ...props.list,
    ...deleteBtnProps.value
  }
})

/**
 * chave do primaria do objeto, é considerado sendo a splitName caso exista no
 * objeto, porém pode acontecer deste item deixar de existir por algum motivo
 * então consideramos a chave primaria sendo o primeiro item da computada fullList.
 */
const primaryKey = computed(() => {
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
  const buttonProps = fullList.value[primaryKey.value] || {}

  return {
    /**
     * Caso seja "isSingle" e tenha a opção de deletar, significa que único botão
     * que existe é o de deletar, então a cor precisa ser "DEFAULT_COLOR", em todos
     * os outros cenários, é primary.
     */
    color: isSingle.value && hasDelete.value ? DEFAULT_COLOR : 'primary',

    ...buttonProps,

    label: getLabel({ useLabel: props.useLabel, label: buttonProps.label }),
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

  if ((!hasSplitName.value || screen.isSmall) && !isSingle.value) {
    const { buttonsList } = useOptionsActions({ color: DEFAULT_COLOR, props })

    payload.buttonsList = buttonsList.value
    payload.dropdownList = buttonsPropsList

    return payload
  }

  if (isSingle.value) {
    const { buttonsList } = useSingleAction({ primaryButtonProps, primaryKey })

    payload.buttonsList = buttonsList.value

    return payload
  }

  if (listSize.value === SPLIT_SIZE) {
    const { buttonsList } = useDoubleSplitActions({
      buttonsPropsList,
      color: DEFAULT_COLOR,
      primaryButtonProps,
      primaryKey,
      props
    })

    payload.buttonsList = buttonsList.value
  }

  if (listSize.value > SPLIT_SIZE) {
    const { list } = useSingleSplitActions({
      buttonsPropsList,
      primaryButtonProps,
      primaryKey,
      props
    })

    payload.buttonsList = list.value.buttonsList
    payload.dropdownList = list.value.dropdownList
  }

  return payload
})

const { showTooltip, tooltipLabels } = useTooltips({ formattedList, fullList, props })

// functions
function getItemProps (item) {
  const { disable, props: itemProps } = item

  return {
    disable,
    ...itemProps
  }
}
</script>
