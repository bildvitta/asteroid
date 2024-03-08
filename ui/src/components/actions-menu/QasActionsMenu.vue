<template>
  <div v-if="hasList" class="inline-block qas-actions-menu" data-cy="actions-menu">
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

/**
 * Computadas para controle do tooltip
 */
const hasTooltip = computed(() => !props.useLabel && props.useTooltip && isSingle.value)
const tooltipLabel = computed(() => fullList.value[primaryKey.value]?.label)

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

    label: getLabel(buttonProps),
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
   * Cenário onde não é utilizado com split e tenha mais de 1 item na lista,
   * neste caso, ele se torna o botão de "opções" onde será usado em casos como
   * dentro de cards, etc.
   */
  if ((!hasSplitName.value || screen.isSmall) && !isSingle.value) {
    payload.buttonsList.options = {
      color: DEFAULT_COLOR,
      iconRight: 'sym_r_more_vert',
      useLabelOnSmallScreen: false,
      ...props.buttonProps,
      label: getLabel({ label: 'Opções' })
    }

    payload.dropdownList = buttonsPropsList

    return payload
  }

  /**
   * Cenário para quando existir apenas 1 item na lista.
   */
  if (isSingle.value) {
    payload.buttonsList = {
      [primaryKey.value]: {
        ...primaryButtonProps.value
      }
    }

    return payload
  }

  /**
   * Cenário onde ficará um botão ao lado do outro "Ação primaria | Ação secundaria".
   */
  if (listSize.value === SPLIT_SIZE) {
    const secondaryKey = Object.keys(buttonsPropsList).find(key => key !== primaryKey.value)
    const secondaryButton = buttonsPropsList[secondaryKey]

    payload.buttonsList = {
      [primaryKey.value]: {
        ...primaryButtonProps.value,
        label: getLabel(primaryButtonProps.value)
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
      [primaryKey.value]: {
        ...primaryButtonProps.value,
        label: getLabel(primaryButtonProps.value)
      }
    }

    delete buttonsPropsList[primaryKey.value]

    payload.dropdownList = buttonsPropsList
  }

  return payload
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
