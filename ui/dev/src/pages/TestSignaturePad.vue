<template>
  <q-page class="container row spaced">
    <div class="col-12">
      <qas-signature-pad ref="signaturePad" height="250" :is-empty.sync="isEmpty" :options="{ backgroundColor }" />
      <div v-if="isEmpty" class="q-mt-sm">Está vazio</div>
      <div class="q-gutter-sm q-mb-md q-mt-sm row">
        <q-btn color="primary" label="Salvar" no-caps @click="saveSignature" />
        <q-btn color="primary" label="Limpar" no-caps @click="clearSignature" />
        <q-btn color="primary" label="Trocar cor" no-caps @click="changeColor" />
      </div>

      <qas-signature-uploader v-model="signature" class="col-12" entity="documents/file" label-signature="Assinatura do Cleyton" label-upload="Assinatura digital" />
      <pre>v-model {{ signature }}</pre>
    </div>
  </q-page>
</template>

<script>
export default {

  data () {
    return {
      backgroundColor: 'white',
      isEmpty: true,
      signature: 'https://s3.amazonaws.com/develop-portal-cms.bivilabs.com.br/uploads/portal-app/problems/photo/b7ce481e-44c4-49ee-8d8b-737feb70bc18.png'
    }
  },

  methods: {
    saveSignature () {
      const values = this.$refs.signaturePad.saveSignature()
      console.log(values, '<----- values')
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
