<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="model2" entity="serviceOrders" :fields2="fields" :form-generator-props="formGeneratorProps" label="Meu uploader" :multiple="true" use-object-model>
        <!-- <template #bottom>
          Tetse
        </template> -->
        <!-- <template #card-bottom="{ index, updateModel }">
          <qas-input v-model="model2[index].name" @update:model-value="updateModel({ index, payload: { type: $event } })" />
        </template> -->

        <!-- <template #bottom="{ index, updateModel }">
          <qas-input v-model="model.name" @update:model-value="updateModel({ index, payload: { type: $event } })" />
        </template> -->
        <!-- <template #custom-upload="scope">
          <pre>{{ getScope(scope) }}</pre>
          <qas-avatar icon="sym_r_edit" />
        </template> -->
      </qas-uploader>

      <!-- <qas-uploader v-model="model4" entity="serviceOrders" :form-generator-props="formGeneratorProps" label="Meu uploader" :multiple="true" /> -->
    </div>

    <qas-debugger :inspect="[model2]" />
    <!-- <qas-debugger :inspect="[model, model2, model3, model4]" /> -->
    <qas-btn label="submit" type="submit" />
  </q-form>
</template>

<script>
import { required } from '../../../../ui/src/helpers'

export default {
  data () {
    return {
      model4: ['https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg'],
      model3: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
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
    fields () {
      return {
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
    },

    formGeneratorProps () {
      // const fields = {
      //   name: {
      //     type: 'text',
      //     name: 'name',
      //     label: 'Alterar nome'
      //   },

      //   email: {
      //     type: 'email',
      //     name: 'email',
      //     label: 'e-mail',
      //     required: true
      //   }
      // }

      return {
        // fields,
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
  },

  methods: {
    getScope (scope) {
      console.log(scope)
    }
  }
}
</script>
