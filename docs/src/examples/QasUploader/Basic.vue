<template>
  <div class="container spaced">
    <div>
      <qas-uploader v-model="model2" entity="serviceOrders" :form-generator-props="formGeneratorProps" label="Meu uploader" :multiple="true" use-object-model>
        <!-- <template #card-content="{ index, updateModel }">
          <qas-input v-model="model[index].type" @update:model-value="updateModel({ index, payload: { type: $event } })" />
        </template> -->
      </qas-uploader>
    </div>

    <pre>{{ model2 }}</pre>
    <pre>{{ values }}</pre>
    <qas-btn label="mudar model" @click="model = model2" />
  </div>
</template>

<script>
// import { filterObject } from 'asteroid'

export default {
  data () {
    return {
      model2: [{
        format: 'image/jpeg',
        url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
        name: 'teste-2 (5th copy).jpg'
      }],
      model: {
        format: 'image/jpeg',
        url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
        name: 'teste-2 (5th copy).jpg'
      },
      values: {
        uploader: []
      }
    }
  },

  computed: {
    formGeneratorProps () {
      const fields = {
        name: {
          type: 'text',
          name: 'name',
          label: 'Alterar nome'
        },

        email: {
          type: 'email',
          name: 'email',
          label: 'e-mail',
          default: 'email_padrao@exemplo.com'
        }
      }

      return {
        fields
        // fields: filterObject(fields, [''])
      }
    }
  }
}
</script>
