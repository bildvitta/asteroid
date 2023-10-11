<template>
  <div class="container q-py-lg">
    <qas-btn @click="toggle">Abrir Dialog</qas-btn>

    <qas-dialog v-model="isDialogOpened" v-bind="dialogProps">
      <template #description>
        <qas-field v-model="description" :field="field" label="Descrição" />
      </template>
    </qas-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDialogOpened: false,
      isLoading: false,
      description: ''
    }
  },

  computed: {
    dialogProps () {
      return {
        useForm: true,

        card: {
          title: 'Título do dialog'
        },

        ok: {
          label: 'Fechar',
          loading: this.isLoading
        },

        onCancel: this.onCancel,
        onOk: this.onOk
      }
    },

    field () {
      return {
        name: 'description',
        type: 'text',
        label: 'Descrição'
      }
    }
  },

  methods: {
    toggle () {
      this.isDialogOpened = !this.isDialogOpened
    },

    onCancel () {
      this.isDialogOpened = false
      this.$qas.error('Evento cancel finalizado.')
    },

    onOk () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
        this.isDialogOpened = false
        this.$qas.success('Evento ok finalizado.')
      }, 2000)
    }
  }
}
</script>
