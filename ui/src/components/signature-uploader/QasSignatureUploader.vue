<template>
  <div>
    <qas-uploader v-model="uploader" :entity="entity" :label="labelUpload" ref="uploader">
      <template #header="{ scope }">
         <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
            <div class="col column items-start justify-center">
              <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            </div>

            <q-btn dense flat icon="o_add" round @click="openDialog"/>

            <q-btn ref="forceUpload" class="hidden" @click="upload(scope)" />
            <q-btn ref="buttonCleanFiles" class="hidden" @click="scope.removeUploadedFiles" />

          </div>
      </template>
    </qas-uploader>

    <qas-dialog v-model="dialog">
      <template #header>
        <div class="text-center text-bold">Insira sua assinatura digital no campo abaixo</div>
        </template>

      <template #description>
        <qas-signature-pad ref="signaturePadModal" height="250" :is-empty.sync="isEmpty" />
      </template>

      <template #actions>
        <q-btn label="Salvar" :disable="isEmpty" @click="saveSignature" class="full-width" no-caps color="primary" />
        <q-btn label="Cancelar" @click="closeSignature" class="full-width q-mt-sm" flat no-caps color="primary" />
      </template>
    </qas-dialog>
  </div>
</template>

<script>
import { base64ToBlob } from '../../helpers'
import { NotifyError } from '../../plugins'

export default {
  props: {
    entity: {
      required: true,
      type: String
    },

    labelUpload: {
      default: '',
      type: String
    },

    labelSignature: {
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
      get() {
        return this.value
      },

      set(value) {
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
        const fileName = this.labelSignature.split(' ').join('-')
        const blob = base64ToBlob(this.base64)
        const file = new File([blob], `${fileName}.png`, { type: 'image/png' })
        scope.addFiles([file])
      } catch(error) {
        NotifyError('Ops! Erro ao enviar sua assinatura.')
      }
    }
  }
}
</script>