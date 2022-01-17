<template>
  <q-btn color="brand-primary" dense flat icon="content_copy" label="Copiar" size="10px" @click="copy">
    <q-tooltip v-model="copied" anchor="center left" class="bg-brand-primary" no-parent-event :offset="[35, 14]" self="center middle">Copiado!</q-tooltip>
  </q-btn>
</template>

<script>
import { copyToClipboard } from 'quasar'

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      copied: false,
      timer: null
    }
  },

  methods: {
    async copy () {
      await copyToClipboard(this.text)

      this.copied = true
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.copied = false
        this.timer = null
      }, 2000)
    }
  }
}
</script>
