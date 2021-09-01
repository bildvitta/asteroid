<template>
  <q-page class="justify-center row" padding>
    <div class="col-12">
      <qas-select v-model="slot" class="col-12" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" label="Select com slot" multiple no-option-label="Selecione um empreendimento." :options="options">
        <template #option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }} - {{ scope.opt.data.reference }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template #selected-item="scope">
          {{ scope.opt.label }} - {{ scope.opt.data.reference }},
        </template>
      </qas-select>

      <qas-select v-model="model" class="col-12 q-mt-lg" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" label="Não multiplo" no-option-label="Selecione um empreendimento." :options="options" />

      <qas-select v-model="multiple" class="col-12 q-mt-lg" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" label="multiplo" multiple no-option-label="Selecione um empreendimento." :options="options" />

      <qas-select v-model="searchable" class="col-12 q-mt-lg" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" label="Não multiplo - searchable" no-option-label="Selecione um empreendimento." :options="options" searchable />

      <qas-select v-model="searchableList" class="col-12 q-mt-lg" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" label="multiplo - searchable" multiple no-option-label="Selecione um empreendimento." :options="options" searchable />

      <qas-form-generator v-model="formGenerator.values" class="q-mt-lg" columns="fit" :fields="formGenerator.fields" :fields-props="fieldsProps" />
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      slot: [6, 7, 4],
      model: 7,
      multiple: [6, 7, 4],
      searchable: 7,
      searchableList: [6, 7, 4],

      options: [
        { label: 'Apto 1000', value: 1, data: { reference: 'Bloco 9' } },
        { label: 'Apto 1001', value: 2, data: { reference: 'Bloco 10' } },
        { label: 'Apto 2001', value: 3, data: { reference: 'Bloco 2' } },
        { label: 'Apto 2010', value: 4, data: { reference: 'Bloco 8' } },
        { label: 'Apto 8000', value: 5, data: { reference: 'Bloco 3' } },
        { label: 'Apto 5200', value: 6, data: { reference: 'Bloco 5' } },
        { label: 'Apto 7845', value: 7, data: { reference: 'Bloco 2' } },
        { label: 'Apto 2492', value: 8, data: { reference: 'Bloco 1' } }
      ],

      formGenerator: {
        values: {
          select: [6, 7, 4]
        },

        fields: {
          select: {
            default: '',
            label: 'Form generator - searchable',
            name: 'select',
            options: [
              { label: 'Apto 1000', value: 1, data: { reference: 'Bloco 9' } },
              { label: 'Apto 1001', value: 2, data: { reference: 'Bloco 10' } },
              { label: 'Apto 2001', value: 3, data: { reference: 'Bloco 2' } },
              { label: 'Apto 2010', value: 4, data: { reference: 'Bloco 8' } },
              { label: 'Apto 8000', value: 5, data: { reference: 'Bloco 3' } },
              { label: 'Apto 5200', value: 6, data: { reference: 'Bloco 5' } },
              { label: 'Apto 7845', value: 7, data: { reference: 'Bloco 2' } },
              { label: 'Apto 2492', value: 8, data: { reference: 'Bloco 1' } }
            ],
            type: 'select',
            // readonly: true,
            multiple: true,
            searchable: true
          }
        }
      }
    }
  },

  computed: {
    fieldsProps () {
      return {
        select: {
          dropdownIcon: 'o_arrow_drop_down',
          clearIcon: 'o_clear'
        }
      }
    }
  }
}
</script>
