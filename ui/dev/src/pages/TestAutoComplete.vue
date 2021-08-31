<template>
  <q-page class="justify-center row" padding>
    <div class="col-12">
      <qas-auto-complete v-model="values" class="col-12" clear-icon="o_clear" dropdown-icon="o_arrow_drop_down" multiple no-option-text="Selecione um empreendimento." :options="options">
        <template #option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }} - {{ scope.opt.data.reference }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <template #selected-item="scope">
          {{ scope.opt.label }} - {{ scope.opt.data.reference }}
        </template>
      </qas-auto-complete>

      <qas-form-generator v-model="formGenerator.values" class="q-mt-lg" columns="fit" :fields="formGenerator.fields" :fields-props="fieldsProps" />
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      values: '',

      formGenerator: {
        values: '',

        fields: {
          select: {
            default: '',
            label: 'Select',
            name: 'select',
            options: [
              { label: 'Apto 1000', value: 1, data: { reference: 'Bloco 9' } },
              { label: 'Apto 1001', value: 2, data: { reference: 'Bloco 10' } }
            ],
            type: 'search-select'
            // readonly: true
            // multiple: true
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
