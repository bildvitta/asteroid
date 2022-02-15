<template>
  <div>
    <qas-uploader ref="uploader" v-model="model" :label="uploadLabel" :readonly="readonly" :use-resize="false" v-bind="$attrs">
      <template #header="{ scope }">
        <div class="cursor-pointer flex flex-center full-width justify-between no-border no-wrap q-gutter-xs text-white transparent" :class="headerClass" @click="openDialog">
          <div class="col column items-start justify-center">
            <div v-if="uploadLabel" class="q-uploader__title">{{ uploadLabel }}</div>
          </div>

          <q-btn v-if="!readonly" dense flat icon="o_add" round @click="openDialog" />

          <q-btn ref="forceUpload" class="hidden" @click="upload(scope)" />
          <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </div>
      </template>
    </qas-uploader>

    <qas-dialog v-model="isOpenedDialog">
      <template #header>
        <div class="text-bold text-center">Insira sua assinatura digital no campo abaixo</div>
      </template>

      <template #description>
        <qas-signature-pad ref="signaturePadModal" v-model:emptyModel="isEmpty" height="250" />
      </template>

      <template #actions>
        <q-btn class="full-width" color="primary" :disable="isEmpty" label="Salvar" no-caps @click="saveSignature" />
        <q-btn class="full-width q-mt-sm" color="primary" flat label="Cancelar" no-caps @click="closeSignature" />
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import QasDialog from '../dialog/QasDialog.vue'
import QasUploader from '../uploader/QasUploader.vue'
import QasSignaturePad from '../signature-pad/QasSignaturePad.vue'
import { base64ToBlob } from '../../helpers'
import { NotifyError } from '../../plugins'

export default {
  name: 'QasSignatureUploader',

  components: {
    QasDialog,
    QasUploader,
    QasSignaturePad
  },

  props: {
    uploadLabel: {
      default: 'Assinatura digital',
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
    }
  },

  methods: {
    NotifyError,

    openDialog () {
      if (this.readonly) return

      this.isOpenedDialog = true
    },

    saveSignature () {
      this.$refs.buttonCleanFiles.$el.click()
      this.base64 = this.$refs.signaturePadModal.saveSignature()
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
