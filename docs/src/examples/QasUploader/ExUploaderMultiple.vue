<template>
  <q-form class="container spaced">
    <qas-uploader v-model="model" add-button-label="Adicionar imagem" entity="serviceOrders" label="Meu uploader" multiple />
    <qas-debugger :inspect="[model]" />
  </q-form>
</template>

<script>
export default {
  data () {
    return {
      model: [
        'https://placehold.co/600x400/orange/white?text=img1',
        'https://placehold.co/600x400/red/white?text=img2',
        'https://placehold.co/600x400/blue/white?text=img3',
        'https://placehold.co/600x400/black/white?text=img4'
      ]
    }
  }
}
</script>
