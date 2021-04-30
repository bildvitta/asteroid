<template>
  <q-page class="container flex flex-center spaced">
    <div class="full-width">
      <div class="q-mt-lg text-center">
        <div>
          <div>
            v-model: <qas-debugger :inspect="model" />
          </div>
          <q-form>
            <qas-nested-fields v-model="model" class="full-width" :errors="errors" :field="nested" :fields-props="fieldsProps" :form-columns="formColumns" :row-object="rowObjec" :use-duplicate="true" :use-inline-actions="false">
              <!-- <template #field-name="{ field }">
                {{ field }}
              </template> -->
              <!-- <template #custom-fields="{ updateValue, index, modelValue }">
                <q-select v-model="modelValue.select" :options="['a', 'b', 'c']" @input="updateValue(modelValue, index)" />
              </template> -->
            </qas-nested-fields>
            <qas-btn type="submit">salvar</qas-btn>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
const errors = [
  // {
  //   name: ['nome obrigatorio'],
  //   email: ['obrigatorio']
  // },
  // {
  //   name: ['nome obrigatorio'],
  //   email: ['obrigatorio']
  // }
]

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
    }
    // cities: {
    //   name: 'cities',
    //   type: 'select',
    //   multiple: true,
    //   options: [
    //     {
    //       label: 'Cidade 1',
    //       value: 1
    //     },
    //     {
    //       label: 'Cidade 2',
    //       value: 2
    //     },
    //     {
    //       label: 'Cidade 3',
    //       value: 3
    //     }
    //   ]
    // }
  }
}

export default {
  name: 'PageIndex',

  data () {
    return {
      nested: nested,
      errors: errors,
      model: [
        {
          name: 'John',
          email: 'john@teste.com',
          select: 'a'
        },
        {
          name: 'John 2',
          email: 'john@teste.com',
          select: 'b'
        }
      ]
    }
  },

  computed: {
    rowObjec () {
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
