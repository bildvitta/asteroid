<template>
  <div class="inline-block qas-alert">
    <qas-box v-if="displayAlert" v-bind="defaultBoxProps">
      <div class="flex items-center no-wrap">
        <div class="flex items-center no-wrap text-body1 text-grey-8">
          <q-icon v-bind="iconProps" />

          <component
            :is="textComponent"
            v-if="useRegex"
            class="q-ml-sm"
          />

          <span
            v-else
            class="q-ml-sm"
          >
            <slot>
              {{ props.text }}
            </slot>
          </span>
        </div>

        <qas-btn v-if="useCloseButton" class="q-ml-sm" color="grey-10" icon="sym_r_close" variant="tertiary" @click="close" />
      </div>
    </qas-box>
  </div>
</template>

<script setup>
import QasBtn from '../btn/QasBtn.vue'

import { Status, StatusColor } from '../../enums/Status'

import { LocalStorage } from 'quasar'
import { RouterLink } from 'vue-router'
import { h, computed, inject } from 'vue'

defineOptions({ name: 'QasAlert' })

const props = defineProps({
  buttonProps: {
    type: Object,
    default: () => ({})
  },

  routerLinkProps: {
    type: Object,
    default: () => ({})
  },

  status: {
    type: String,
    default: Status.Info,
    validator: value => Object.values(Status).includes(value)
  },

  storageKey: {
    type: String,
    default: 'default'
  },

  text: {
    type: String,
    default: ''
  },

  useBox: {
    type: Boolean,
    default: undefined
  },

  useCloseButton: {
    type: Boolean
  },

  usePersistentModelOnClose: {
    type: Boolean
  },

  useRegex: {
    type: Boolean
  }
})

// models
const model = defineModel({ type: Boolean, default: true })

// globals
const isBox = inject('isBox', false)

// composables
const { displayAlert, close } = useStorageClosed()

// computeds
const iconProps = computed(() => {
  const status = Object.keys(Status).find(key => Status[key] === props.status)
  const isErrorStatus = props.status === Status.Error

  return {
    color: StatusColor[status],
    name: isErrorStatus ? 'sym_r_error' : 'sym_r_info',
    size: 'sm'
  }
})

/**
 * Por padrão, quando este componente estiver dentro de um QasBox, ele não terá
 * shadow, terá padding e não terá margin.
 */
const defaultBoxProps = computed(() => {
  const hasBoxProps = props.useBox !== undefined

  const useBox = hasBoxProps ? props.useBox : !isBox

  return {
    unelevated: !useBox,
    useSpacing: useBox
  }
})

const textComponent = computed(() => {
  /**
   * regex para encontrar caracteres que estiverem dentro de [].
   */
  const regex = /\[.*?\]/g

  const [content] = props.text.match(regex)

  /**
   * dado o texto: Para saber mais, [Clique aqui].
   *
   * retorna: 'Clique aqui'
   */
  const routerLabel = content.replaceAll(/[[\]]/g, '')

  /**
   * dado o texto: Para saber mais, [Clique aqui].
   *
   * retorna: 'Para saber mais, $.'
   */
  const replacedText = props.text.replaceAll(regex, '$')

  /**
   * É necessário usar o regex ao invés de '$' para ele não remover o carácter
   * ao fazer o split
   *
   * dado o texto: 'Para saber mais, [Clique aqui].'
   *
   * retorna: ['Para saber mais,', '$', '.']
   *
   */
  const splitted = replacedText.split(/(\$)/)

  const index = splitted.findIndex(item => item === '$')

  const hasButtonProps = !!Object.keys(props.buttonProps).length

  const getRouterLinkRender = () => {
    return h(
      RouterLink,
      {
        ...props.routerLinkProps,
        class: 'text-primary text-subtitle1 qas-alert__link'
      },
      {
        default: () => routerLabel
      }
    )
  }

  const getQasBtnRender = () => {
    return h(
      QasBtn,
      {
        variant: 'tertiary',
        label: routerLabel,
        ...props.buttonProps
      }
    )
  }

  /**
   * Cria um render do router link ou QasBtn
   *
   * @example
   *
   * ```html
   * <router-link
   *  class="text-primary text-subtitle1 qas-alert__link"
   *  :to="props.route"
   * >
   *  Clique aqui
   * </router-link>
   * ```
   */
  const renderComponent = hasButtonProps ? getQasBtnRender() : getRouterLinkRender()

  splitted.splice(index, 1, renderComponent)

  return h(
    'span',
    splitted
  )
})

// composable definitions
function useStorageClosed () {
  // computeds
  const storageClosedKey = computed(() => `alert-${props.storageKey}-closed`)

  const displayAlert = computed(() => {
    const isClosed = props.usePersistentModelOnClose && LocalStorage.getItem(storageClosedKey.value)

    return !isClosed && model.value
  })

  // functions
  function close () {
    if (props.usePersistentModelOnClose) LocalStorage.set(storageClosedKey.value, true)

    model.value = false
  }

  return {
    displayAlert,
    close
  }
}
</script>

<style lang="scss">
.qas-alert {
  &__link {
    text-decoration: none;
  }
}
</style>
