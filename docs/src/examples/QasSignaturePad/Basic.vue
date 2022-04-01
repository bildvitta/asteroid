<template>
  <div class="container spaced">
    <div>
      <qas-signature-pad ref="signaturePad" v-model:empty="isEmpty" />

      <div class="q-my-lg text-center">
        <qas-btn @click="getSignaturePad">Obter assinatura!</qas-btn>
      </div>

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
    getSignaturePad () {
      alert(this.$refs.signaturePad.getSignatureData())
    }
  }
}
</script>
