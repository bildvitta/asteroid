<!-- Componente privado, utilizado internamente e não exportado para uso externo da biblioteca -->
<template>
  <qas-dialog v-bind="mx_defaultDialogProps" />
</template>

<script>
import { getAction } from '@bildvitta/store-adapter'

import QasDialog from '../dialog/QasDialog.vue'
import { promiseHandler } from '../../helpers'
import { deleteMixin } from '../../mixins'

export default {
  name: 'QasGalleryDeleteDialog',

  components: {
    QasDialog
  },

  mixins: [deleteMixin],

  props: {
    payload: {
      type: Array,
      default: () => []
    },

    modelKey: {
      type: String,
      default: ''
    }
  },

  emits: [
    'success',
    'error',
    'cancel'
  ],

  methods: {
    // chamado no mixin
    async destroy () {
      const { data, error } = await promiseHandler(
        getAction.call(this, {
          entity: this.entity,
          key: 'update',
          payload: {
            id: this.mx_id,
            url: this.url,
            payload: { [this.modelKey]: this.payload }
          }
        }),
        {
          errorMessage: 'Ops! Não foi possível deletar o item.',
          successMessage: 'Item deletado com sucesso!'
        }
      )

      if (data) return this.$emit('success', data)
      if (error) return this.$emit('error', error)
    }
  }
}
</script>
