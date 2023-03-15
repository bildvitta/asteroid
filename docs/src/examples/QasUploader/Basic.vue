<template>
  <div class="container spaced">
    <div>
      <qas-uploader v-model="model" entity="serviceOrders" :form-generator-props="formGeneratorProps" label="Meu uploader" :multiple="true" use-object-model>
        <!-- <template #card-content="{ index, updateModel }">
          <qas-input v-model="model[index].type" @update:model-value="updateModel({ index, payload: { type: $event } })" />
        </template> -->
      </qas-uploader>
    </div>

    <pre>{{ model }}</pre>
    <pre>{{ values }}</pre>
  </div>
</template>

<script>
// import { filterObject } from 'asteroid'

export default {
  data () {
    return {
      model: [],
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
          label: 'e-mail'
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
