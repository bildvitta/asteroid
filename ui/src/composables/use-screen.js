import { Screen, Platform } from 'quasar'
import { computed, reactive, toRefs } from 'vue'

/**
 * @function
 * @returns {{
 *  isSmall: boolean,
 *  isMedium: boolean,
 *  isLarge: boolean,
 *  untilMedium: boolean,
 *  untilLarge: boolean,
 *  isMobile: boolean
 * }}
 *
 * @example
 * useScreen().isSmall
 *
 * const { isSmall } = useScreen()
 */
export default function () {
  const screens = reactive({
    // até 599px
    isSmall: computed(() => Screen.xs),

    // de 600 até 1023px
    isMedium: computed(() => Screen.sm),

    // de 600 até 1023px
    isLarge: computed(() => Screen.gt.sm),

    // de 0 até 599px
    untilMedium: computed(() => Screen.lt.sm),

    // de 0 ate 1023px
    untilLarge: computed(() => Screen.lt.md),

    // Plataforma
    isMobile: computed(() => Platform.is.mobile || false)
  })

  return toRefs(screens)
}
