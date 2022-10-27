export default {
  props: {
    customId: {
      default: '',
      type: [Number, String]
    },

    dialogProps: {
      default: () => ({}),
      type: Object
    },

    entity: {
      default: '',
      type: String
    },

    url: {
      default: '',
      type: String
    }
  },

  computed: {
    mx_defaultDialogProps () {
      return {
        card: {
          title: 'Confirmar',
          description: 'Tem certeza que deseja excluir este item?'
        },

        ok: {
          label: 'Excluir',
          onClick: this.destroy
        },

        cancel: {
          onClick: () => this.$emit('cancel')
        },

        ...this.dialogProps
      }
    },

    mx_id () {
      return this.customId || this.$route.params.id
    }
  }
}
