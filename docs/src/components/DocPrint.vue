<template>
  <div>
    <h4 class="q-mb-md text-h4">Imagem de exemplo</h4>
    <q-img :alt="alt" :src="src" width="100%" />
  </div>
</template>

<script>
export default {
  name: 'DocPrint',

  props: {
    alt: {
      type: String,
      default: ''
    },

    src: {
      type: String,
      default: ''
    }
  }
}
</script>
