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

      <qas-signature-uploader class="col-12" entity="portal-app/problems/photo" label-signature="Assinatura do Cleyton" label-upload="Assinatura digital" />
    </div>
  </q-page>
</template>

<script>
export default {

  data () {
    return {
      backgroundColor: 'white',
      isEmpty: true
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
