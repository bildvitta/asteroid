<template>
  <div ref="signatureContainer" class="qas-signature-pad relative-position">
    <canvas :id="canvasId" :ref="$attrs.ref" class="qas-signature-pad__canvas rounded-borders vertical-bottom" :height="height" />
    <qas-btn v-if="!emptyModel" class="q-mb-sm q-mr-sm absolute-bottom-right" color="primary" dense icon="o_delete" round @click="clearSignature" />
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'

import { uid } from 'quasar'
import { isEqual } from 'lodash'

export default {
  name: 'QasSignaturePad',

  components: {
    QasBtn
  },

  props: {
    signatureOptions: {
      default: () => ({}),
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

    emptyModel: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:emptyModel'],

  expose: ['clearSignature', 'saveSignature', 'updateEmptyModel'],

  data () {
    return {
      // variavel para armazenar o import da lib
      SignaturePad: null,
      signaturePad: null,
      hasEndStrokeEvent: false,
      canvasId: uid()
    }
  },

  watch: {
    async signatureOptions (newValue, oldValue) {
      if (isEqual(newValue, oldValue)) return

      await this.setupSignaturePad()
      this.updateEmptyModel()
    }
  },

  async mounted () {
    window.addEventListener('resize', this.setCanvasWidth)
    this.setCanvasWidth()

    await this.importSignaturePad()
    this.setupSignaturePad()
  },

  unmounted () {
    window.removeEventListener('resize', this.setCanvasWidth)
    this.signaturePad.off()
  },

  methods: {
    async importSignaturePad () {
      this.SignaturePad = (await import('signature_pad')).default
    },

    setupSignaturePad () {
      const canvasElement = document.getElementById(this.canvasId)
      this.signaturePad = new this.SignaturePad(canvasElement, this.signatureOptions)

      if (!this.hasEndStrokeEvent) {
        this.signaturePad.addEventListener('endStroke', this.updateEmptyModel)
      }

      this.hasEndStrokeEvent = true
      this.clearSignature()
    },

    saveSignature () {
      return this.signaturePad.toDataURL(this.type)
    },

    clearSignature () {
      this.signaturePad.clear()
      this.updateEmptyModel()
    },

    updateEmptyModel () {
      this.$emit('update:emptyModel', this.signaturePad.isEmpty())
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
  &__canvas {
    border: 1px solid $grey-3;
  }
}
</style>
