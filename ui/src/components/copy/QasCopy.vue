<template>
  <span>
    <slot>{{ label }}</slot>

    <q-btn class="q-ml-xs" color="grey-5" flat :icon="icon" round size="xs" @click="copy">
      <q-tooltip>Copiar</q-tooltip>
    </q-btn>
  </span>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { notifyError, notifySuccess } from '../../helpers'

export default {
  props: {
    icon: {
      default: 'o_file_copy',
      type: String
    },

    label: {
      required: true,
      type: String
    }
  },

  methods: {
    async copy () {
      try {
        await copyToClipboard(this.label)
        notifySuccess('Copiado!', this.label)
      } catch (error) {
        notifyError('Não foi possível copiar.', this.label)
      }
    }
  }
}
</script>
