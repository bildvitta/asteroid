<template>
  <div class="container q-py-lg">
    <qas-btn @click="toggle">Abrir Dialog</qas-btn>

    <qas-dialog v-model="isDialogOpened" v-bind="dialogProps" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDialogOpened: false
    }
  },

  computed: {
    dialogProps () {
      return {
        card: {
          title: 'Título do Dialog',
          description: 'Descrição do Dialog'
        },

        ok: { onClick: () => alert('clicado') }
      }
    }
  },

  methods: {
    toggle () {
      this.isDialogOpened = !this.isDialogOpened
    }
  }
}
</script>
