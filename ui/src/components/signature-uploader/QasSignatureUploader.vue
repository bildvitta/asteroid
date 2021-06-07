<template>
  <div>
    <qas-uploader v-model="uploader" :entity="entity" :label="labelUpload" ref="uploader">
      <template #header="{ scope }">
         <div class="flex flex-center full-width justify-between no-border no-wrap q-gutter-xs q-pa-sm text-white transparent">
            <div class="col column items-start justify-center">
              <div v-if="scope.label" class="q-uploader__title">{{ scope.label }}</div>
            </div>

            <q-btn dense flat icon="o_add" round @click="openDialog"/>

            <q-btn dense flat icon="o_cloud_upload" round @click="upload(scope)" />

          </div>
      </template>

      <template #list>
         <div class="col-12 q-col-gutter-md row">
           <!-- TO DO: TRATAR SE TIVER VALOR NO V-MODEL PARA O EDIT -->
            <div v-if="values" class="row col-12">
              <qas-avatar class="q-mr-sm" color="grey-3" icon="o_attach_file" :image="values" rounded />

              <div class="col items-center no-wrap row">
                <div class="column no-wrap">
                  <div class="ellipsis">{{ labelSignature }}</div>
                </div>
                <div class="items-center q-ml-sm row">
                  <q-btn dense flat icon="o_delete" round @click="removeSignature" />
                </div>
              </div>
            </div>
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
    }
  },

  data () {
    return {
      dialog: false,
      isEmpty: true,
      uploader: '',
      values: ''
    }
  },

  methods: {
    openDialog () {
      this.dialog = true
    },

    saveSignature () {
      this.values = this.$refs.signaturePadModal.saveSignature()
      console.log(this.values, '<--- this.values')
      this.closeSignature()
    },

    closeSignature () {
      this.dialog = false
    },

    removeSignature () {
      this.values = ''
    },

    upload (scope) {
      try {
        console.log(scope,'<----- scope')
        const blob = this.base64ImageToBlob(this.values)
        console.log(blob, '<----- blob')
        const file = new File([blob], "signature.png", { type: 'image/png' })
        console.log(file, '<----- file')
        scope.addFiles([file])
      } catch(error) {
        console.log(error, '<---- error')
      }
    },

    base64ImageToBlob(str) {
      // extract content type and base64 payload from original string
      let pos = str.indexOf(';base64,')
      let type = str.substring(5, pos)
      let b64 = str.substr(pos + 8)

      // decode base64
      let imageContent = atob(b64)

      // create an ArrayBuffer and a view (as unsigned 8-bit)
      let buffer = new ArrayBuffer(imageContent.length)
      let view = new Uint8Array(buffer)

      // fill the view, using the decoded base64
      for(var n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n)
      }

      // convert ArrayBuffer to Blob
      var blob = new Blob([buffer], { type });

      return blob;
    }
  }
}
</script>