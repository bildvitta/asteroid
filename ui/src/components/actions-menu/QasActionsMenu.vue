<template>
  <div class="qas-actions-menu" data-cy="actions-menu">
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
    </qas-btn-dropdown>
  </div>
</template>

<script setup>
// import QasBtn from '../btn/QasBtn.vue'
import QasBtnDropdown from '../btn-dropdown/QasBtnDropdown.vue'

import useScreen from '../../composables/use-screen'

import { computed, inject } from 'vue'

const SPLIT_SIZE = 2

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
  },

  useSplit: {
    type: Boolean,
    default: true
  }
})

const screen = useScreen()

const { deleteBtnProps } = useDelete()

const hasSplitName = computed(() => !!props.splitName)
const listSize = computed(() => Object.keys(props.list).length)
const hasSplit = computed(() => hasSplitName.value && listSize.value > SPLIT_SIZE)

const fullList = computed(() => {
  return {
    ...props.list,
    ...deleteBtnProps.value
  }
})

const btnDropdownProps = computed(() => {
  // const buttonsPropsList = [...fullList.value]
  // console.log('TCL: btnDropdownProps -> buttonsPropsList', buttonsPropsList)
  // console.log('TCL: btnDropdownProps -> buttonsPropsList', buttonsPropsList)

  // console.log('TCL: btnDropdownProps -> hasSplitName.value', hasSplitName.value)
  // if (!hasSplitName.value) {
  //   const [buttonProps] = buttonsPropsList

  //   if (props.useLabel) {
  //     buttonProps.label = 'Opções'
  //   }
  // }

  // if (hasSplitName.value) {

  // }

  console.log('TCL: btnDropdownProps -> formattedList.value.buttons', formattedList.value)
  return {
    buttonsPropsList: formattedList.value.buttons,
    useSplit: hasSplit.value
  }
})

const formattedList = computed(() => {
  const buttonsPropsList = {}

  const payload = {
    dropdownList: {},
    buttons: {}
  }

  for (const key in fullList.value) {
    buttonsPropsList[key] = {
      ...fullList.value[key],
      color: 'grey-10'
    }
  }

  if (hasSplitName.value) {
    buttonsPropsList[props.splitName].color = 'primary'
  }

  /**
   * Este é o caso onde não é utilizado com split, sendo o botão de "opções",
   * onde será usado em casos como dentro de cards, etc.
   */
  if (!hasSplitName.value || screen.isSmall) {
    payload.buttons.options = {
      label: 'Opções',
      color: 'grey-10',
      useLabelOnSmallScreen: false,
      iconRight: 'sym_r_more_vert'
    }

    payload.dropdownList = buttonsPropsList
    return payload
  }

  if (listSize.value === SPLIT_SIZE) {
    payload.buttons = {
      [props.splitName]: {
        ...buttonsPropsList[props.splitName],
        color: 'primary',
        ...props.buttonProps
      },

      ...buttonsPropsList
    }

    return payload
  }

  if (listSize.value > SPLIT_SIZE) {
    payload.buttons = {
      [props.splitName]: buttonsPropsList[props.splitName]
    }

    delete buttonsPropsList[props.splitName]

    payload.dropdownList = buttonsPropsList

    return payload
  }

  return payload
})

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
