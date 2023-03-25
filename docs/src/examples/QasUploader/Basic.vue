<template>
  <q-form class="container spaced">
    <div>
      <qas-uploader v-model="values.model2" :columns="columns" entity="serviceOrders" :fields="fields" :form-generator-props="formGeneratorProps" v-bind="props" label="Meu uploader" :max-files="2" :multiple="true" use-object-model>
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
    <pre>{{ newModel }}</pre>
    ?
    <qas-debugger :inspect="[values]" />
    <!-- <qas-debugger :inspect="[model, model2, model3, model4]" /> -->
    <qas-btn
      label="submit" @click="values = { ...newModel }"
    />
  </q-form>
</template>

<script>
import { required } from '../../../../ui/src/helpers'

export default {
  data () {
    return {
      counter: 0,
      newModel: {
        model2: [{
          format: 'image/jpeg',
          url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
          name: 'teste-2 (5th copy).jpg',
          email: 'meu-deus'
        }]
      },
      model4: ['https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg'],
      model3: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
      values: {
        model2: [{
          format: 'image/jpeg',
          url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
          name: 'teste-2 (5th copy).jpg',
          email: 'meu-deus'
        }]
      },
      model: {
        format: 'image/jpeg',
        url: 'https://s3.amazonaws.com/uploads.assistencia-digital.nave.dev/uploads/v2/development/serviceOrders/d5648a15-c66f-401a-9c97-0a55efda0b72.jpg',
        name: 'teste-2 (5th copy).jpg'
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

    columns () {
      return { col: 12, sm: 4 }
    },

    props () {
      return {
        addButtonProps: {
          // label: 'eae'
        },

        // error: true,

        // errorMessage: 'Campo obrigatório',

        label: 'documentos',

        // useDownload: false,

        dialogProps: {
          card: {
            // title: 'qualé'
          }
        }
      }
    },

    formGeneratorProps () {
      // const { email, ...rest } = this.fields
      return {
        fields: this.fields,
        fieldsProps: {
          email: {
            'onUpdate:modelValue': value => console.log(value, '>>> !hasFormFields && hasFields'),
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

  watch: {
    values: {
      handler (value) {
        this.newModel = value
      },

      immediate: true,
      deep: true
    }
  },

  methods: {
    getScope (scope) {
      console.log(scope)
    }
  }
}
</script>
