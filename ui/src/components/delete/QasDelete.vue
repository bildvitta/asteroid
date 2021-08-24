<template>
  <component :is="tag" v-bind="$attrs" v-on="events">
    <slot />
    <qas-dialog v-model="showDialog" v-bind="dialogConfig" />
  </component>
</template>

<script>
import { Loading } from 'quasar'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn'
import QasDialog from '../dialog/QasDialog'

export default {
  components: {
    QasBtn,
    QasDialog
  },

  props: {
    customId: {
      default: '',
      type: [Number, String]
    },

    dialog: {
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

  data () {
    return {
      showDialog: false
    }
  },

  computed: {
    dialogConfig () {
      return {
        card: {
          title: 'Confirmar',
          description: 'Tem certeza que deseja excluir este item?'
        },

        ok: {
          events: { click: this.destroy },
          props: { label: 'Excluir' }
        },

        ...this.dialog
      }
    },

    events () {
      const { click, ...events } = this.$listeners
      return { click: this.confirm, ...events }
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
        this.$emit('success')
      } catch (error) {
        NotifyError('Ops! Não foi possível deletar o item.')
        this.$emit('error', error)
      } finally {
        Loading.hide()
      }
    }
  }
}
</script>
