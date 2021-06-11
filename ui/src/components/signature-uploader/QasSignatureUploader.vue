<template>
  <div>
    <qas-uploader ref="uploader" v-model="uploader" :entity="entity" :label="uploadLabel">
      <template #header="{ scope }">
        <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
          <div class="col column items-start justify-center">
            <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
          </div>

          <q-btn dense flat icon="o_add" round @click="openDialog" />

          <q-btn ref="forceUpload" class="hidden" @click="upload(scope)" />
          <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />
        </div>
      </template>
    </qas-uploader>

    <qas-dialog v-model="dialog">
      <template #header>
        <div class="text-bold text-center">Insira sua assinatura digital no campo abaixo</div>
      </template>

      <template #description>
        <qas-signature-pad ref="signaturePadModal" height="250" :is-empty.sync="isEmpty" />
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
  components: {
    QasDialog,
    QasUploader,
    QasSignaturePad
  },

  props: {
    entity: {
      required: true,
      type: String
    },

    uploadLabel: {
      default: 'Assinatura digital',
      type: String
    },

    signatureLabel: {
      default: 'Assinatura',
      type: String
    },

    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      dialog: false,
      isEmpty: true,
      base64: ''
    }
  },

  computed: {
    uploader: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    base64ToBlob,

    NotifyError,

    openDialog () {
      this.dialog = true
    },

    saveSignature () {
      this.$refs.buttonCleanFiles.$el.click()
      this.base64 = this.$refs.signaturePadModal.saveSignature()
      this.closeSignature()
      this.$refs.forceUpload.$el.click()
    },

    closeSignature () {
      this.dialog = false
    },

    removeSignature () {
      this.$refs.buttonCleanFiles.$el.click()
      this.$emit('input')
    },

    upload (scope) {
      try {
        const fileName = this.signatureLabel.split(' ').join('-')
        const blob = base64ToBlob(this.base64)
        const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
        scope.addFiles([file])
      } catch (error) {
        NotifyError('Ops! Erro ao enviar sua assinatura.')
      }
    }
  }
}
</script>
