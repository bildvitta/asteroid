<template>
  <div class="container spaced">
    <div class="full-width">
      <div class="q-mt-lg text-center">
        <qas-box>
          <qas-nested-fields v-model="model" class="full-width" :field="nested" :fields-props="fieldsProps" :form-columns="formColumns" :row-object="rowObject" v-bind="nestedProps" />
        </qas-box>

        <!-- <div class="q-my-lg">
          Model: <qas-debugger :inspect="[model]" />
        </div> -->
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
    },

    nestedProps () {
      return {
        useAdd: true,

        useIndexLabel: true,
        useInlineActions2: true,
        useSingleLabel1: true,
        useDestroy: false,
        useDuplicate: false,

        // rowLabel: 'eae',

        headerProps: index => {
          console.log('TCL: nestedProps -> index', index)
          return {
            labelProps: {
              label: index === 0 ? 'Janeiro' : 'Fevereiro'
            },
            description: index === 0 ? 'Mês de Janeiro' : 'Mês de Fevereiro',
            badges: [
              {
                label: index === 0 ? 'New' : 'Old',
                color: 'primary',
                textColor: 'white'
              },
              {
                label: index === 0 ? 'New 2' : 'Old 2',
                color: 'green-14',
                textColor: 'white'
              }
            ],
            actionsMenuProps: {
              list: {
                // duplicate: {
                //   label: 'Qualé'
                // }
              }
            }
          }
        },

        actionsMenuProps: {
          list: {
            duplicate2: {
              label: 'Qualé'
            }
          }
        }
      }
    }
  }
}
</script>
