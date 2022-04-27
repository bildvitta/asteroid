<template>
  <div ref="signatureContainer" class="qas-signature-pad relative-position">
    <canvas :id="canvasId" :ref="$attrs.ref" class="qas-signature-pad__canvas rounded-borders vertical-bottom" :height="size.height" :width="size.width" />
    <q-btn v-if="!isEmpty" class="absolute q-mb-sm q-mr-sm qas-signature-pad__clear" color="primary" dense icon="o_delete" round @click="clearSignature" />
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
import { screenMixin } from '../../mixins'
import { uid } from 'quasar'
import { isEqual } from 'lodash'

export default {
  mixins: [screenMixin],

  props: {
    options: {
      type: Object,
      default: () => ({})
    },

    type: {
      type: String,
      default: 'image/png'
    },

    isEmpty: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      signaturePad: null,
      canvasId: uid()
    }
  },

  watch: {
    options (newValue, oldValue) {
      if (isEqual(newValue, oldValue)) return

      this.setupSignaturePad()
      this.isEmptyEmitter()
    }
  },

  destroyed () {
    window.removeEventListener('resize', this.setCanvasWidth)
  },

  mounted () {
    window.addEventListener('resize', this.setCanvasWidth)
    this.setCanvasWidth()
    this.setupSignaturePad()
  },

  computed: {
    size () {
      const sizes = {
        [this.$_isSmall]: { height: '250', width: '265' },
        [this.$_isMedium]: { height: '420', width: '570' },
        [this.$_isLarge]: { height: '250', width: '350' }
      }

      return sizes.true
    }
  },

  methods: {
    setupSignaturePad () {
      this.signaturePad = new SignaturePad(document.getElementById(this.canvasId), this.options)
      this.signaturePad.onEnd = this.isEmptyEmitter
      this.clearSignature()
    },

    saveSignature () {
      return this.signaturePad.toDataURL(this.type)
    },

    clearSignature () {
      this.signaturePad.clear()
      this.isEmptyEmitter()
    },

    isEmptyEmitter () {
      this.$emit('update:isEmpty', this.signaturePad.isEmpty())
    },

    setCanvasWidth () {
      const signatureContainer = this.$refs.signatureContainer
      const canvasElement = signatureContainer.querySelector('canvas')
      canvasElement.setAttribute('width', signatureContainer.offsetWidth)
    }
  }
}
</script>

<style lang="scss">
.qas-signature-pad {
  &__clear {
    bottom: 0;
    right: 0;
  }

  &__canvas {
    border: 1px solid $grey-3;
  }
}
</style>
