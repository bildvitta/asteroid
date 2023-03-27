<template>
  <div class="container spaced">
    <div>
      <qas-signature-uploader v-model="model" :uploader-props="{ entity: 'test', label: 'Assinatura de teste', addButtonLabel: 'Adicionar assinatura' }" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  }
}
</script>
