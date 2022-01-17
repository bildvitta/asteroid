<template>
  <span>
    <slot>{{ text }}</slot>

    <qas-btn class="q-ml-xs" color="grey-5" flat :icon="icon" :loading="isLoading" round :size="size" @click="copy">
      <q-tooltip>Copiar</q-tooltip>
    </qas-btn>
  </span>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  name: 'QasCopy',

  props: {
    icon: {
      default: 'o_file_copy',
      type: String
    },

    size: {
      default: 'xs',
      type: String
    },

    text: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      isLoading: false
    }
  },

  methods: {
    async copy () {
      this.isLoading = true

      try {
        await copyToClipboard(this.text)
        this.$qas.success('Copiado!', this.text)
      } catch (error) {
        this.$qas.error('Não foi possível copiar.', this.text)
      } finally {
        setTimeout(() => { this.isLoading = false }, 500)
      }
    }
  }
}
</script>