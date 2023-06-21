<template>
  <div class="container spaced">
    <div class="full-width">
      <div class="q-mt-lg text-center">
        <div>
          <qas-nested-fields v-model="model" class="full-width" :field="nested" row-label="Minha linha" :row-object="rowObject" use-destroy-always :use-duplicate="false" use-index-label :use-remove-on-destroy="false" :use-starts-empty="false">
            <template #fields="{ index, updateValue }">
              <div>
                Estou no lugar do QasFormView
              </div>

              <qas-form-generator
                v-model="model[index]"
                class="full-width"
                :columns="formColumns"
                :fields="nested.children"
                :fields-props="fieldsProps"
                @update:model-value="updateValue($event, index)"
              />
            </template>
          </qas-nested-fields>
        </div>

        <div class="q-my-lg">
          Model: <qas-debugger :inspect="[model]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const nested = {
  name: 'nested',
  type: 'nested',
  label: 'Meu nested',
  children: {
    name: {
      name: 'name',
      type: 'text',
      label: 'Nome'
    },
    email: {
      name: 'email',
      type: 'email',
      label: 'E-mail'
    },
    cities: {
      name: 'cities',
      type: 'select',
      label: 'Cidades',
      options: [
        {
          label: 'Cidade 1',
          value: 1
        },
        {
          label: 'Cidade 2',
          value: 2
        },
        {
          label: 'Cidade 3',
          value: 3
        }
      ]
    }
  }
}

export default {
  data () {
    return {
      nested,
      model: [
        {
          name: 'Teste 1',
          email: '',
          cities: [],
          uuid: 'meu-uuid1'
        },
        {
          name: 'Teste 2',
          email: '',
          cities: [],
          uuid: 'meu-uuid2'
        },
        {
          name: 'Teste 3',
          email: '',
          cities: [],
          uuid: 'meu-uuid3'
        },
        {
          name: 'Teste 4',
          email: '',
          cities: [],
          uuid: 'meu-uuid4'
        }
      ]
    }
  },

  computed: {
    rowObject () {
      return {
        name: '',
        email: '',
        cities: []
      }
    },

    formColumns () {
      return {
        name: { col: 12 },
        email: { col: 12 },
        cities: { col: 12 }
      }
    },

    fieldsProps () {
      return {
        name: {
          label: 'Novo label'
        }
      }
    }
  }
}
</script>
