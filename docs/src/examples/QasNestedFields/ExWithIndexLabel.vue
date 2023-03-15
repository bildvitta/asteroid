<template>
  <div class="container spaced">
    <div class="full-width">
      <div class="q-mt-lg text-center">
        <div>
          <qas-nested-fields v-model="model" class="full-width" :field="nested" :fields-props="fieldsProps" :form-columns="formColumns" row-label="Minha linha" :row-object="rowObject" use-destroy-always :use-duplicate="false" use-index-label :use-remove-on-destroy="false" :use-starts-empty="false" @update:model-value="onUpdateModelValue" />
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
      nested: nested,
      model: [
        {
          name: 'meu-uuid',
          email: '',
          cities: [],
          uuid: 'meu-uuid'
        },
        {
          name: 'meu-uuid2',
          email: '',
          cities: [],
          uuid: 'meu-uuid2'
        },
        {
          name: 'meu-uuid3',
          email: '',
          cities: [],
          uuid: 'meu-uuid3'
        },
        {
          name: 'meu-uuid4',
          email: '',
          cities: [],
          uuid: 'meu-uuid4'
        },
        {
          name: 'meu-uuid5',
          email: '',
          cities: [],
          uuid: 'meu-uuid5'
        },
        {
          name: 'meu-uuid6',
          email: '',
          cities: [],
          uuid: 'meu-uuid6'
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
