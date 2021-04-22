export default {
  computed: {
    $_isSmall () {
      // until 599
      return this.$q.screen.xs
    },

    $_isMedium () {
      // from 600 until 1023
      return this.$q.screen.sm
    },

    $_isLarge () {
      // from 1024 until the limit
      return this.$q.screen.gt.sm
    },

    $_untilMedium () {
      // from 0 until 599
      return this.$q.screen.lt.sm
    },

    $_untilLarge () {
      // from 0 until 1023
      return this.$q.screen.lt.md
    },

    $_isMobile () {
      return this.$q.platform.is.mobile
    }
  }
}
