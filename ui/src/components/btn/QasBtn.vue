<script>
import { QBtn } from 'quasar'

export default {
  extends: QBtn,

  props: {
    noCaps: {
      type: Boolean,
      default: true
    },

    color: {
      type: String,
      default: 'primary'
    },

    unelevated: {
      type: Boolean,
      default: true
    },

    hideMobileLabel: {
      type: Boolean
    }
  },

  computed: {
    isMobile () {
      return this.$q.screen.xs
    },

    mobileLabel () {
      return !(this.hideMobileLabel && this.isMobile)
    },

    // computada original do quasar modificada para sumir label no mobile.
    hasLabel () {
      return !!this.label && this.mobileLabel
    }
  }
}
</script>
