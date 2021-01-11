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
        this.$qas.success('Copiado!', this.label)
      } catch (error) {
        console.log(this.$qas)
        this.$qas.error('Não foi possível copiar.', this.label)
      }
    }
  }
}
</script>
