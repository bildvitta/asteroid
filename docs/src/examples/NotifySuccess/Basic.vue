<template>
  <div class="container spaced text-center">
    <qas-btn @click="$qas.success('Deu certo!')">Usando plugin com injeção</qas-btn>
    <qas-btn @click="NotifySuccess('Deu certo!')">Usando plugin com import</qas-btn>
  </div>
</template>

<script>
import { NotifySuccess } from 'asteroid'

export default {
  methods: {
    NotifySuccess
  }
}
</script>
