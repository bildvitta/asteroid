<template>
  <component v-bind="$attrs" :is="tag" @click.stop="openConfirmDialog">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>

  <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />
</template>

<script>
import { Loading } from 'quasar'
import { getAction } from '@bildvitta/store-adapter'
import { NotifyError, NotifySuccess } from '../../plugins'
import { useHistory } from '../../composables'

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
    },

    useAutoDeleteRoute: {
      default: true,
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
        const { destroyRoutes, history } = useHistory()

        const payload = { id: this.id, url: this.url }

        this.$qas.logger.group(
          `QasDelete - destroy -> Payload do parâmetro do ${this.entity}/destroy`, [payload]
        )

        await getAction.call(this, {
          entity: this.entity,
          key: 'destroy',
          payload
        })

        NotifySuccess('Item deletado com sucesso!')

        if (this.useAutoDeleteRoute) {
          // remove todas rotas que possuem o id do item excluído.
          const routesToBeDeleted = this.getRoutesToBeDeletedById(history.list)
          destroyRoutes(routesToBeDeleted)
        }

        // cria um evento para notificar que o item foi excluído no "window".
        this.createDeleteSuccessEvent()

        this.$emit('success')

        this.$qas.logger.info('QasDelete - destroy -> item deletado com sucesso!')
      } catch (error) {
        NotifyError('Ops! Não foi possível deletar o item.')
        this.$emit('error', error)

        this.$qas.logger.group(
          `QasDelete - destroy -> exceção da action ${this.entity}/destroy`,
          [error],
          { error: true }
        )
      } finally {
        Loading.hide()
        this.$emit('update:deleting', false)
      }
    },

    getRoutesToBeDeletedById (routes = []) {
      return routes.filter(({ params }) => params.id === this.id)
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
