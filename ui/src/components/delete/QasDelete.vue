<template>
  <component :is="tag" @click="confirm">
    <slot />
    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />
  </component>
</template>

<script>
import { Loading } from 'quasar'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'

export default {
  name: 'QasDelete',

  components: {
    QasBtn,
    QasDialog
  },

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
      required: true,
      type: String
    },

    tag: {
      default: 'qas-btn',
      type: String
    },

    url: {
      default: '',
      type: String
    }
  },

  emits: ['success', 'error'],

  expose: ['destroy'],

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    defaultDialogProps () {
      return {
        card: {
          title: 'Confirmar',
          description: 'Tem certeza que deseja excluir este item?'
        },

        ok: {
          props: { label: 'Excluir', onClick: this.destroy }
        },

        ...this.dialogProps
      }
    },

    id () {
      return this.customId || this.$route.params.id
    }
  },

  methods: {
    confirm () {
      this.showDialog = true
    },

    async destroy () {
      Loading.show()

      try {
        await this.$store.dispatch(`${this.entity}/destroy`, { id: this.id, url: this.url })
        NotifySuccess('Item deletado com sucesso!')
        this.createDeleteSuccessEvent()
        this.$emit('success')
      } catch (error) {
        NotifyError('Ops! Não foi possível deletar o item.')
        this.$emit('error', error)
      } finally {
        Loading.hide()
      }
    },

    createDeleteSuccessEvent () {
      const event = new CustomEvent('delete-success', {
        bubbles: false,
        cancelable: false,
        detail: {
          entity: this.entity,
          url: this.url,
          id: this.id
        }
      })

      window.dispatchEvent(event)
    }
  }
}
</script>
