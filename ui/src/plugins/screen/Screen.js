import { Screen, Platform } from 'quasar'

export default () => {
  const screensModel = {
    // até 599px
    isSmall: () => Screen.xs,
    // de 600 até 1023px
    isMedium: () => Screen.sm,
    // de 600 até 1023px
    isLarge: () => Screen.gt.sm,
    // de 0 até 599px
    untilMedium: () => Screen.lt.sm,
    // de 0 ate 1023px
    untilLarge: () => Screen.lt.md,

    // Plataforma
    isMobile: () => Platform.is.mobile || false
  }

  const screens = {}

  for (const key in screensModel) {
    // infelizmente esta é a única forma que conseguimos para que nossa função se tornasse reativa na view
    // é como o próprio quasar implementa
    Object.defineProperty(screens, key, {
      get () {
        return screensModel[key]()
      },

      enumerable: true
    })
  }

  return screens
}
