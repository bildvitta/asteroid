<template>
  <div class="container spaced">
    <div>
      <qas-signature-pad ref="signaturePad" v-model:empty="isEmpty">
        <template #default="{ getSignatureData, clearSignature }">
          <div class="q-my-lg text-center">
            <qas-btn @click="onGetSignatureData(getSignatureData)">Obter assinatura!</qas-btn>
            <qas-btn @click="clearSignature">Limpar assinatura!</qas-btn>
          </div>
        </template>
      </qas-signature-pad>

      <div>
        isEmpty: {{ isEmpty }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEmpty: true
    }
  },

  methods: {
    onGetSignatureData (callback = () => {}) {
      alert(callback())
    }
  }
}
</script>
