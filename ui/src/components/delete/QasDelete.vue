<template>
  <component :is="tag" v-bind="$attrs" @click="openConfirmDialog">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>

  <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />
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
    },

    deleting: {
      type: Boolean
    }
  },

  emits: [
    'success',
    'error',
    'update:deleting'
  ],

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
          label: 'Excluir',
          onClick: this.destroy
        },

        ...this.dialogProps
      }
    },

    id () {
      return this.customId || this.$route.params.id
    }
  },

  methods: {
    openConfirmDialog () {
      this.showDialog = true
    },

    async destroy () {
      Loading.show()
      this.$emit('update:deleting', true)

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
        this.$emit('update:deleting', false)
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
