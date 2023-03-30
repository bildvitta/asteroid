<template>
  <div class="container spaced">
    <div>
      <qas-signature-uploader v-model="model" :uploader-props="uploaderProps" />

      <qas-debugger :inspect="[model]" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  },

  computed: {
    uploaderProps () {
      return {
        entity: 'test',
        label: 'Assinatura de teste',
        addButtonLabel: 'Adicionar assinatura'
      }
    }
  }
}
</script>
