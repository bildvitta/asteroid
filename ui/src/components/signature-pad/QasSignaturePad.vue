<template>
  <div ref="signatureContainer" class="qas-signature-pad relative-position">
    <canvas :id="canvasId" :ref="$attrs.ref" class="qas-signature-pad__canvas rounded-borders vertical-bottom" :height="height" />
    <qas-btn v-if="!emptyModel" class="absolute-bottom-right q-mb-sm q-mr-sm" color="primary" dense icon="o_delete" round @click="clearSignature" />
  </div>
</template>

<script>
import { uid } from 'quasar'
import { isEqual } from 'lodash-es'
import SignaturePad from 'signature_pad'

import QasBtn from '../btn/QasBtn.vue'
export default {
  name: 'QasSignaturePad',

  components: {
    QasBtn
  },

  props: {
    emptyModel: {
      type: Boolean,
      default: true
    },

    height: {
      default: '250',
      type: String
    },

    signatureOptions: {
      default: () => ({}),
      type: Object
    },

    type: {
      default: 'image/png',
      type: String
    }
  },

  emits: ['update:emptyModel'],

  expose: ['clearSignature', 'saveSignature', 'updateEmptyModel'],

  data () {
    return {
      canvasId: uid(),
      hasEndStrokeEvent: false,
      signaturePad: null,
      SignaturePad: null
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

    this.setupSignaturePad()
  },

  unmounted () {
    window.removeEventListener('resize', this.setCanvasWidth)
    this.signaturePad.off()
  },

  methods: {
    clearSignature () {
      this.signaturePad.clear()
      this.updateEmptyModel()
    },

    saveSignature () {
      return this.signaturePad.toDataURL(this.type)
    },

    setCanvasWidth () {
      const signatureContainer = this.$refs.signatureContainer
      const canvasElement = signatureContainer.querySelector('canvas')
      canvasElement.setAttribute('width', signatureContainer.offsetWidth)
    },

    setupSignaturePad () {
      const canvasElement = document.getElementById(this.canvasId)
      this.signaturePad = new SignaturePad(canvasElement, this.signatureOptions)

      if (!this.hasEndStrokeEvent) {
        this.signaturePad.addEventListener('endStroke', this.updateEmptyModel)
      }

      this.hasEndStrokeEvent = true
      this.clearSignature()
    },

    updateEmptyModel () {
      this.$emit('update:emptyModel', this.signaturePad.isEmpty())
    }
  }
}
</script>

<style lang="scss">
// .qas-signature-pad {
//   &__canvas {
//     border: 1px solid $grey-3;
//   }
// }
</style>
