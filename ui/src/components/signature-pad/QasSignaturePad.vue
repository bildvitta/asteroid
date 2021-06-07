<template>
  <div ref="signatureContainer" class="qas-signature-pad relative-position">
    <canvas :id="canvasId" :ref="$attrs.ref" :height="height" class="vertical-bottom qas-signature-pad__canvas rounded-borders"/>
    <q-btn v-if="!isEmpty" icon="o_delete" color="primary" class="qas-signature-pad__clear absolute q-mr-sm q-mb-sm" @click="clearSignature" dense round />
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
import { uid } from 'quasar'
import { isEqual } from 'lodash'

export default {
  props: {
    options: {
      default: () => ({ backgroundColor: 'white' }),
      type: Object
    },

    type: {
      default: 'image/png',
      type: String
    },

    height: {
      default: '250',
      type: String
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
      if(isEqual(newValue, oldValue)) return

      this.newSignaturePad()
      this.signatureIsEmpty()
    }
  },

  destroyed() {
    window.removeEventListener('resize', this.setWidthCanvas);
  },

  mounted () {
    window.addEventListener('resize', this.setWidthCanvas);
    this.setWidthCanvas()
    this.newSignaturePad()
  },

  methods: {
    newSignaturePad () {
      this.signaturePad = new SignaturePad(document.getElementById(this.canvasId), this.options)
      this.signaturePad.onEnd = this.signatureIsEmpty
      this.clearSignature()
    },

    saveSignature () {
      return this.signaturePad.toDataURL(this.type)
    },

    clearSignature () {
      this.signaturePad.clear()
      this.signatureIsEmpty()
    },

    signatureIsEmpty () {
      this.$emit('update:isEmpty', this.signaturePad.isEmpty())
    },

    setWidthCanvas () {
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
