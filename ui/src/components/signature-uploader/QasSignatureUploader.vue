<template>
  <div>
    <qas-uploader ref="uploader" v-model="model" v-bind="$attrs" :label="uploadLabel" :readonly="readonly" :use-resize="false">
      <template #header="{ scope }">
        <div class="cursor-pointer flex flex-center full-width justify-between no-border no-wrap q-gutter-xs text-white transparent" :class="headerClass" @click="openDialog">
          <div class="col column items-start justify-center">
            <div v-if="uploadLabel" class="q-uploader__title">{{ uploadLabel }}</div>
          </div>

          <qas-btn v-if="!readonly" color="white" icon="sym_r_add" :use-hover-on-white-color="false" variant="tertiary" @click="openDialog" />

          <qas-btn ref="forceUpload" class="hidden" @click="upload(scope)" />
          <qas-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </div>
      </template>
    </qas-uploader>

    <qas-dialog v-model="isOpenedDialog" v-bind="defaultDialogProps">
      <template #header>
        <div class="text-bold text-center">Insira sua assinatura digital no campo abaixo</div>
      </template>

      <template #description>
        <div :style="signaturePadWidth">
          <qas-signature-pad ref="signaturePadModal" v-model:empty="isEmpty" :height="signaturePadHeight" />
        </div>
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'
import QasUploader from '../uploader/QasUploader.vue'
import QasSignaturePad from '../signature-pad/QasSignaturePad.vue'
import { base64ToBlob } from '../../helpers'
import { NotifyError } from '../../plugins'

export default {
  name: 'QasSignatureUploader',

  components: {
    QasBtn,
    QasDialog,
    QasUploader,
    QasSignaturePad
  },

  props: {
    dialogProps: {
      type: Object,
      default: () => ({})
    },

    uploadLabel: {
      default: '',
      type: String
    },

    signatureLabel: {
      default: 'Assinatura',
      type: String
    },

    modelValue: {
      default: '',
      type: String
    },

    type: {
      default: 'image/png',
      type: String
    },

    readonly: {
      type: Boolean
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      isOpenedDialog: false,
      isEmpty: true,
      base64: ''
    }
  },

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    },

    headerClass () {
      return `q-pa-${this.readonly ? 'md' : 'sm'}`
    },

    defaultDialogProps () {
      return {
        maxWidth: '620px',
        ...this.dialogProps,
        ok: {
          label: 'Salvar',
          onClick: () => this.getSignatureData()
        }
      }
    },

    signaturePadWidth () {
      const sizes = {
        [this.$qas.screen.isSmall]: { width: '100%' },
        [this.$qas.screen.isMedium]: { width: '570px' },
        [this.$qas.screen.isLarge]: { width: '350px' }
      }
      return sizes.true
    },

    signaturePadHeight () {
      const sizes = {
        [this.$qas.screen.isSmall]: '250',
        [this.$qas.screen.isMedium]: '400',
        [this.$qas.screen.isLarge]: '250'
      }

      return sizes.true
    }
  },

  methods: {
    NotifyError,

    openDialog () {
      if (this.readonly) return

      this.isOpenedDialog = true
    },

    getSignatureData () {
      this.$refs.buttonCleanFiles.$el.click()
      this.base64 = this.$refs.signaturePadModal.getSignatureData()
      this.$refs.forceUpload.$el.click()
      this.closeSignature()
    },

    closeSignature () {
      this.isOpenedDialog = false
    },

    removeSignature () {
      this.$refs.buttonCleanFiles.$el.click()
      this.$emit('update:modelValue')
    },

    upload (scope) {
      try {
        const fileName = this.signatureLabel.split(' ').join('-')
        const extension = this.type.split('/').pop() || 'png'
        const blob = base64ToBlob(this.base64)
        const file = new File([blob], `${fileName}.${extension}`, { type: this.type })

        scope.addFiles([file])
      } catch {
        NotifyError('Ops! Erro ao enviar sua assinatura.')
      }
    }
  }
}
</script>
