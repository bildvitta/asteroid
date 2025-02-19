<template>
  <div class="flex items-center no-wrap qas-info text-body1 text-grey-8">
    <qas-avatar v-bind="defaultAvatarProps" />

    <component
      :is="textComponent"
      v-if="useRegex"
      class="q-ml-sm"
    />

    <span
      v-else
      class="q-ml-sm"
    >
      {{ props.text }}
    </span>
  </div>
</template>

<script setup>
import { h, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { QasBtn } from 'asteroid'

defineOptions({ name: 'QasInfo' })

const props = defineProps({
  avatarProps: {
    type: Object,
    default: () => ({})
  },

  buttonProps: {
    type: Object,
    default: () => ({})
  },

  routerLinkProps: {
    type: Object,
    default: () => ({})
  },

  text: {
    type: String,
    required: true
  },

  useRegex: {
    type: Boolean,
    default: true
  }
})

const defaultAvatarProps = computed(() => {
  return {
    color: 'red-14',
    ...props.avatarProps,
    icon: 'sym_r_priority_high',
    size: 'sm'
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
        class: 'text-primary text-subtitle1 qas-info__link'
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
   *  class="text-primary text-subtitle1 qas-info__link"
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
</script>

<style lang="scss">
.qas-info {
  &__link {
    text-decoration: none;
  }
}
</style>
