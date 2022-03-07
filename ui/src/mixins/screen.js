export default {
  // TODO: Esses nomes precisam ser alterados para algo mais inteligente.

  computed: {
    mx_isSmall () {
      // until 599
      return this.$q.screen.xs
    },

    mx_isMedium () {
      // from 600 until 1023
      return this.$q.screen.sm
    },

    mx_isLarge () {
      // from 1024 until the limit
      return this.$q.screen.gt.sm
    },

    mx_untilMedium () {
      // from 0 until 599
      return this.$q.screen.lt.sm
    },

    mx_untilLarge () {
      // from 0 until 1023
      return this.$q.screen.lt.md
    },

    mx_isMobile () {
      return this.$q.platform.is.mobile
    }
  }
}
