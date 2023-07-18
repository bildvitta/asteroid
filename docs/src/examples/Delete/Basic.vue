<template>
  <div class="container spaced">
    <qas-btn label="Deletar usuário" @click="$qas.delete(deleteParams)" />

    <div class="q-mt-lg">
      user: <qas-debugger :inspect="[user]" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('users', {
      userById: 'byId'
    }),

    customId () {
      return '31362c39-2cb5-4fe2-982a-c270f88d2462'
    },

    user () {
      return this.userById(this.customId)
    },

    deleteParams () {
      return {
        deleteActionParams: {
          id: this.customId,
          entity: 'users'
        }
        // redirectRoute: 'users' <- (Caso a intenção fosse redirecionar para a rota "users" após deletar.)
      }
    }
  },

  created () {
    this.fetchSingle({ id: this.customId })
  },

  methods: {
    ...mapActions('users', ['fetchSingle', 'destroy'])
  }
}
</script>
