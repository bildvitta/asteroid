<template>
  <!-- Utilizando o list-view apenas para facilitar para recuperar os dados dos dados. -->
  <qas-list-view v-model:fields="fields" v-model:results="results" :entity="entity" :use-filter="false">
    <template #default>
      <qas-table-generator :columns :fields="fields" :fields-props :results="results" row-key="uuid">
        <!-- <template #body-cell-name>
          <qas-toggle-visibility data-ignore-hover text="64.829.511/0001-01" />
        </template> -->
      </qas-table-generator>
    </template>
  </qas-list-view>
</template>

<script>
export default {
  name: 'UsersList',

  data () {
    return {
      fields: {},
      results: []
    }
  },

  computed: {
    entity () {
      return 'users'
    },

    columns () {
      return [
        'document',
        'name',
        'email'
      ]
    }
  },

  methods: {
    fieldsProps (row) {
      return {
        document: {
          component: 'QasBtn',
          props: {
            // color: 'negative'
          }
        },

        name: {
          component: 'QasTextTruncate',
          props: {
            maxWidth: 100
          }
        },

        email: {
          component: 'QasCopy',
          props: {}
        }

        // document: {
        //   component: 'QasToggleVisibility',
        //   props: {}
        // }
      }
    },

    actionsMenuProps (row) {
      console.log('TCL: actionsMenuProps -> row', row)
      // console.log('TCL: actionsMenuProps -> row', row)
      return {
        list: {
          visibility: {
            icon: 'sym_r_visibility',
            label: row.name,
            handler: () => alert('handler ativado')
          }
        }
      }
    }
  }
}
</script>
