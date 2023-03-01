<template>
  <div class="container spaced">
    <qas-btn :custom-id="customId" entity="users" label="Deletar usuário" @click="$qas.delete({ deleteActionParams: { id: customId, entity: 'users' } })" />

    <div class="q-mt-lg">
      user: <qas-debugger :inspect="[user]" />
      isDeleting: {{ isDeleting }}
    </div>
  </div>
</template>

<script>
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
    ...mapActions('users', ['fetchSingle', 'destroy'])
  }
}
</script>
