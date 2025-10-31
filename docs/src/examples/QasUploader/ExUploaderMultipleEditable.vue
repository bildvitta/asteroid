<template>
  <q-form class="container spaced">
    <qas-uploader v-model="model" add-button-label="Adicionar imagem" entity="serviceOrders" :errors :fields="fields" :form-generator-props label="Meu uploader" multiple name="documents" use-object-model />
    <qas-debugger :inspect="[model]" />
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
    errors () {
      // return []
      return {
        'documents.0.format': [
          'Este arquivo PDF está protegido por senha.'
        ],
        'documents.4.format': [
          'Este arquivo PDF está protegido por senha.'
        ]
      }
    },
    formGeneratorProps () {
      return {
        // errors: {
        //   format: ['eae']
        // }
      }
    },

    fields () {
      return {
        format: {
          error: true,
          name: 'format',
          label: 'Formato',
          type: 'text'
        }
      }
    }
  }
}
</script>
