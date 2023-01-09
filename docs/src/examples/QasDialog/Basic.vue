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
        useCloseButton: true,
        card: {
          title: 'Título do Dialog',
          description: 'Cerca elétrica perto do corrimão risco iminente de choque. Código da ordem de serviço: 159488 CRM ID: 1179512'
        },

        ok: false,
        // ok: true,

        // cancel: true
        cancel: false

        // ok: { onClick: () => alert('clicado') }
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
