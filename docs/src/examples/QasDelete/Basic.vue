<template>
  <div class="container spaced">
    <!-- <qas-delete v-model:deleting="isDeleting" :custom-id="customId" entity="users" label="Deletar este usuário" />
    <qas-btn :custom-id="customId" entity="users" label="Deletar pelo dialog" @click="$qas.delete({ id: customId, entity: 'users' })" /> -->
    <qas-btn :custom-id="customId" entity="users" label="Deletar pelo dialog" @click="Delete({ id: customId, entity: 'users' })" />
    <!-- <qas-btn :custom-id="customId" entity="users" label="Deletar pelo dialog" @click="Delete.call(this, { id: customId, entity: 'users' })" /> -->

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

import Delete from '../../../../ui/src/plugins/delete/Delete.js'

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
    Delete,
    ...mapActions('users', ['fetchSingle', 'destroy'])
  }
}
</script>
