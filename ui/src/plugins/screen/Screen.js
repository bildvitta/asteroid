import { Screen, Platform } from 'quasar'

export default () => {
  const screensModel = {
    isSmall: () => Screen.xs,
    isMedium: () => Screen.sm,
    isLarge: () => Screen.gt.sm,
    untilMedium: () => Screen.lt.sm,
    untilLarge: () => Screen.lt.md,

    // Plataforma
    isMobile: () => Platform.is.mobile || false
  }

  const screens = {}

  for (const key in screensModel) {
    Object.defineProperty(screens, key, {
      get () {
        return screensModel[key]()
      },

      enumerable: true
    })
  }

  return screens
}
