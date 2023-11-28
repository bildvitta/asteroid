<template>
  <div class="container spaced">
    <div class="full-width">
      <div class="q-mt-lg">
        <qas-nested-fields v-model="model" class="full-width" :field="nested" form-columns="12" :row-object="rowObject" :use-starts-empty="false">
          <template #before-fields>
            <div>Estou antes do formulário.</div>
          </template>
        </qas-nested-fields>

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
      label: 'Cidade',
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
      model: []
    }
  },

  computed: {
    rowObject () {
      return {
        name: '',
        email: '',
        cities: []
      }
    }
  }
}
</script>
