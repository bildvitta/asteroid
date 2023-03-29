<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="model" add-button-label="Adicionar imagem" entity="serviceOrders" :grid-generator-props="gridGeneratorProps" label="Meu uploader" multiple use-object-model />
      <qas-debugger :inspect="[model]" />
    </div>
  </q-form>
</template>

<script>
export default {
  data () {
    return {
      model: [
        {
          url: 'https://placehold.co/600x400/orange/white?text=img1',
          name: 'img1',
          format: 'image/png'
        },
        {
          url: 'https://placehold.co/600x400/red/white?text=img2',
          name: 'img2',
          format: 'image/png'
        },
        {
          url: 'https://placehold.co/600x400/blue/white?text=img3',
          name: 'img3',
          format: 'image/png'
        },
        {
          url: 'https://placehold.co/600x400/black/white?text=img4',
          name: 'img4',
          format: 'image/png'
        }
      ]
    }
  },

  computed: {
    gridGeneratorProps () {
      return {
        fields: {
          format: {
            name: 'format',
            label: 'Formato',
            type: 'text'
          }
        }
      }
    }
  }
}
</script>
