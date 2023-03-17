<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="model" entity="serviceOrders" :form-generator-props="formGeneratorProps" label="Meu uploader" :multiple="false" use-object-model>
        <!-- <template #card-content="{ index, updateModel }">
          <qas-input v-model="model[index].type" @update:model-value="updateModel({ index, payload: { type: $event } })" />
        </template> -->
      </qas-uploader>
    </div>

    <qas-debugger :inspect="[model, model2]" />
    <qas-btn label="submit" type="submit" />
  </q-form>
</template>

<script>
import { required } from '../../../../ui/src/helpers'

export default {
  data () {
    return {
      model2: [{
        format: 'image/jpeg',
        url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
        name: 'teste-2 (5th copy).jpg',
        email: 'test@example.com'
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
          required: true
        }
      }

      return {
        fields,
        fieldsProps: {
          email: {
            rules: [value => required(value)]
          },
          name: {
            rules: [value => required(value)]
          }
        }
        // fields: filterObject(fields, [''])
      }
    }
  }
}
</script>
