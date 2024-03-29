import { useScreen } from '../../../composables'

import { computed } from 'vue'

/**
 * @param {{
 *  props: { appUserProps: {} }
 *  onSignOut: () => void
 *  onToggleNotifications: () => void
 *  onMenuUpdate: () => void
 * }} config
 */
export default function useAppUser (config = {}) {
  const {
    props,

    onSignOut,
    onToggleNotifications,
    onMenuUpdate
  } = config

  const screen = useScreen()

  const defaultAppUserProps = computed(() => {
    return {
      avatarSize: '40px',

      menuProps: {
        'onUpdate:modelValue': onMenuUpdate()
      },

      // eventos
      onSignOut,
      onToggleNotifications,
      ...props.appUserProps
    }
  })

  const showAppUser = computed(() => {
    const hasAppUser = !!Object.keys(defaultAppUserProps.value.user || {}).length

    return hasAppUser && !screen.isUntilLarge
  })

  return {
    defaultAppUserProps,
    showAppUser
  }
}
