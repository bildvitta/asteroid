<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="model" add-button-label="Adicionar imagem" entity="serviceOrders" label="Meu uploader" use-object-model />
      <qas-debugger :inspect="[model]" />
    </div>
  </q-form>
</template>

<script>

export default {
  data () {
    return {
      model: {
        url: 'https://placehold.co/600x400/orange/white?text=img1',
        name: 'img1',
        format: 'image/png'
      }
    }
  }
}
</script>
