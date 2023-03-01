<template>
  <div class="container spaced">
    <qas-delete v-model:deleting="isDeleting" :custom-id="customId" entity="users" label="Deletar este usuário" />

    <qas-actions-menu :button-props="{ color2: 'white' }" color="white" :delete-props="{ deleteActionParams: { entity: 'users', id: customId } }" :list="list" :use-hover-on-white-color="false" />

    <qas-actions-menu :button-props="{ color2: 'white' }" :delete-props="{ deleteActionParams: { entity: 'users', id: customId } }" :list="list" split-name="delete" />

    <!-- Remover este código -->
    <div class="q-mt-lg">
      user: <qas-debugger :inspect="[user]" />
      isDeleting: {{ isDeleting }}
    </div>
  </div>
</template>

<script>
// estes scripts tem a finalidade de utilização na documentação.
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isDeleting: false
    }
  },

  computed: {
    ...mapGetters('users', {
      userById: 'byId'
    }),

    list () {
      return {
        visibility: {
          icon: 'sym_r_visibility',
          label: 'Visualizar',
          handler: () => alert('handler ativado')
        },
        edit: {
          icon: 'sym_r_create',
          label: 'Editar',
          handler: () => alert('handler ativado')
        }
      }
    },

    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    },

    user () {
      return this.userById(this.customId)
    }
  },

  created () {
    this.fetchSingle({ id: this.customId })
  },

  methods: {
    ...mapActions('users', ['fetchSingle'])
  }
}
</script>
