<template>
  <q-page class="container flex flex-center spaced">
    <div class="full-width">
      <div class="q-mt-lg text-center">
        <div>
          <div>
            v-model: <pre>{{ model }}</pre>
          </div>
          <q-form>
            <qas-nested-fields v-model="model" class="full-width" :errors="errors" :field="nested" :fields-props="fieldsProps" :form-columns="formColumns" :row-object="rowObject" :use-duplicate="false" :use-inline-actions="true">
              <!-- <template #field-name="{ field }">
                {{ field }}
              </template> -->
              <!-- <template #custom-fields="{ updateValue, index, modelValue }">
                <q-select v-model="modelValue.cities" :options="['a', 'b', 'c']" @update:model-value="updateValue(modelValue, index)" />
              </template> -->
            </qas-nested-fields>

            <qas-nested-fields v-model="model2" class="full-width" :errors="errors2" :field="nested" :fields-props="fieldsProps" :form-columns="formColumns" :row-object="rowObject" :use-duplicate="true" />
            <qas-btn type="submit">salvar</qas-btn>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const errors = [
  {
    name: ['Nome inválido'],
    email: ['email obrigatorio']
  },
  {
    name: ['nome obrigatorio'],
    email: ['obrigatorio']
  }
]

const errors2 = {
  'nested.0.name': [
    'O campo documents.0.name é obrigatório.'
  ],
  'nested.1.name': [
    'O campo documents.1.name é obrigatório.'
  ],
  'nested.2.name': [
    'O campo documents.2.name é obrigatório.'
  ],
  'nested.0.email': [
    'O campo documents.0.email é obrigatório.'
  ],
  'nested.1.email': [
    'O campo documents.1.email é obrigatório.'
  ],
  'nested.2.email': [
    'O campo documents.2.email é obrigatório.'
  ]
}

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
  name: 'PageIndex',

  data () {
    return {
      nested: nested,
      errors: errors,
      errors2: errors2,
      model2: [],
      model: [
        {
          name: 'John',
          email: 'john@teste.com',
          cities: 'a'
        },
        {
          name: 'John 2',
          email: 'john@teste.com',
          cities: 'b'
        }
      ]
    }
  },

  computed: {
    rowObject () {
      return {
        name: '',
        email: '',
        cities: [],
        select: ''
      }
    },

    formColumns () {
      return {
        name: { col: 12 },
        email: { sm: 6, col: 12 },
        cities: { col: 12 }
      }
    },

    fieldsProps () {
      return {
        name: {
          label: 'TESTANDO'
        }
      }
    }
  }
}
</script>
