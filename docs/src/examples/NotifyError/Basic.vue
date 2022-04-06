<template>
  <div class="container spaced text-center">
    <qas-btn @click="$qas.error('Deu erro!')">Usando plugin com injeção</qas-btn>
    <qas-btn @click="NotifyError('Deu erro!')">Usando plugin com import</qas-btn>
  </div>
</template>

<script>
import { NotifyError } from 'asteroid'

export default {
  methods: {
    NotifyError
  }
}
</script>
