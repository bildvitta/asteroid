import { isLocalDevelopment } from '../../../helpers'

import { computed, watch, ref } from 'vue'

/**
 * @param {{
 *  props: { modules: [], title: string },
 *  onMenuUpdate: () => void
 * }} config
 */
export default function useAppMenuDropdown (config = {}) {
  const {
    props,
    onMenuUpdate
  } = config

  const { hostname } = window.location

  const module = ref('')

  const defaultModules = computed(() => {
    if (!isLocalDevelopment()) return props.modules

    const normalizedModules = [...props.modules]

    const { host, protocol } = location
    const value = `${protocol}//${host}`

    /**
     * Adiciona um módulo padrão chamado "Localhost" quando o aplicativo está sendo
     * executado em desenvolvimento local.
     */
    normalizedModules.unshift({
      label: `Localhost ${props.title ? `(${props.title})` : ''}`,
      icon: 'sym_r_home',
      value
    })

    return normalizedModules
  })

  const currentModelOption = computed(() => {
    return defaultModules.value.find(module => module?.value === module.value)
  })

  const appMenuDropdownProps = computed(() => {
    return {
      buttonDropdownProps: {
        'onUpdate:menu': onMenuUpdate
      },

      currentModule: currentModelOption.value,
      modules: defaultModules.value
    }
  })

  const currentModule = computed(() => {
    return props.modules.find(module => module?.value.includes(hostname))?.value
  })

  const showAppMenuDropdown = computed(() => !!currentModule.value)

  watch(() => currentModule.value, value => {
    module.value = value
  }, { immediate: true })

  return {
    appMenuDropdownProps,
    showAppMenuDropdown
  }
}
