<template>
  <q-page class="container row spaced">
    <div class="col-12">
      <qas-signature-pad ref="signaturePad" v-model:empty="isEmpty" height="250" :signature-options="{ backgroundColor }" />

      <div v-if="isEmpty" class="q-mt-sm">Está vazio</div>
      <div class="q-gutter-sm q-mb-xl q-mt-sm row">
        <q-btn color="primary" label="Salvar" no-caps @click="getSignatureData(getSignatureData)" />
        <q-btn color="primary" label="Limpar" no-caps @click="clearSignature" />
        <q-btn color="primary" label="Trocar cor" no-caps @click="changeColor" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {

  data () {
    return {
      backgroundColor: 'white',
      isEmpty: true,
      signature: 'https://develop-portal-cms.bivilabs.com.br/uploads/banners/photo/e94f3d47-6789-473a-add0-637e10e8cefe.png'
    }
  },

  methods: {
    getSignatureData () {
      alert(`base64 gerado: ${this.$refs.signaturePad.getSignatureData()}`)
    },

    clearSignature () {
      this.$refs.signaturePad.clearSignature()
    },

    changeColor () {
      this.backgroundColor = 'grey'
    }
  }
}
</script>
