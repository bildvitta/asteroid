<template>
  <div class="column container spaced text-center">
    <qas-btn @click="$qas.dialog(dialogConfig)">Usando plugin com injeção</qas-btn>
    <qas-btn @click="Dialog(dialogConfig)">Usando plugin com import</qas-btn>
  </div>
</template>

<script>
import { Dialog } from 'asteroid'

export default {
  data () {
    return {
      card: {
        title: 'Título do dialog',
        description: 'Descrição do dialog.'
      }
    }
  },

  computed: {
    dialogConfig () {
      return {
        card: this.card,
        cancel: this.cancel
      }
    }
  },

  methods: {
    Dialog
  }
}
</script>
