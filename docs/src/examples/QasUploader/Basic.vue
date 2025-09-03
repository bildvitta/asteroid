<template>
  <q-form class="container spaced">
    <qas-uploader v-model="model" add-button-label="Adicionar imagem" entity="customers/import/upload" label="Meu uploader" :max-file-size="20000000" multiple @rejected="onRejected" />
    <qas-debugger :inspect="[model]" />
  </q-form>
</template>

<script>
export default {
  data () {
    return {
      model: ['https://placehold1.co/600x400/orange/white?text=img1']
    }
  },

  methods: {
    onRejected (err) {
      console.log('onRejected', err)
    }
  }
}
</script>
