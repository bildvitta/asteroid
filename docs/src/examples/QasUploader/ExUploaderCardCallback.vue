<template>
  <q-form class="container spaced">
    <qas-uploader v-model="model" v-bind="props" />
    <qas-debugger :inspect="[model]" />
  </q-form>
</template>

<script>
export default {
  data () {
    return {
      model: [
        'https://placehold.co/600x400/orange/white?text=img1',
        'https://123placehold.co/600x400/red/white?text=img2',
        'https://placehold.co/600x400/blue/white?text=img3',
        'https://1234placehold.co/600x400/black/white?text=img4'
      ]
    }
  },

  computed: {
    props () {
      return {
        addButtonLabel: 'Adicionar imagem',
        entity: 'serviceOrders',
        label: 'Meu uploader',
        multiple: true,
        galleryCardProps: this.galleryCardPropsFn
      }
    }
  },

  methods: {
    galleryCardPropsFn ({ hasError }) {
      return {
        disable: hasError,

        buttonProps: {
          disable: hasError
        },

        errorIcon: 'sym_r_wifi_off',
        errorMessage: 'Imagem indisponível.'
      }
    }
  }
}
</script>
