<script>
import { QBtn } from 'quasar'

export default {
  extends: QBtn,

  props: {
    color: {
      default: 'primary',
      type: String
    },

    // FIXME: Alterar para hideLabel="xs". Remover todos os "mobiles".
    hideMobileLabel: {
      type: Boolean
    },

    noCaps: {
      default: true,
      type: Boolean
    },

    unelevated: {
      default: true,
      type: Boolean
    }
  },

  computed: {
    // Computada original do Quasar, modificada para esconder o rótulo em dispositivos móveis.
    hasLabel () {
      return !!this.label && this.mobileLabel
    },

    isMobile () {
      return this.$q.screen.xs
    },

    mobileLabel () {
      return !(this.hideMobileLabel && this.isMobile)
    }
  }
}
</script>
