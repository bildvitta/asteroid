<template>
  <span>
    <slot>{{ label }}</slot>

    <q-btn class="q-ml-xs" color="grey-5" flat :icon="icon" round :size="size" @click="copy">
      <q-tooltip>Copiar</q-tooltip>
    </q-btn>
  </span>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { NotifyError, NotifySuccess } from '../../plugins'

export default {
  props: {
    icon: {
      default: 'o_file_copy',
      type: String
    },

    label: {
      required: true,
      type: String
    },

    size: {
      default: 'sm',
      type: String
    }
  },

  methods: {
    async copy () {
      try {
        await copyToClipboard(this.label)
        NotifySuccess('Copiado!', this.label)
      } catch (error) {
        NotifyError('Não foi possível copiar.', this.label)
      }
    }
  }
}
</script>
