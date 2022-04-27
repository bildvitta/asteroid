<template>
  <div class="container spaced text-center">
    <qas-label>Usando plugin com injeção</qas-label>
    <pre>{{ $qas.screen }}</pre>

    <div>
      <qas-label>Usando plugin com import</qas-label>
      <pre>{{ Screen() }}</pre>
    </div>
  </div>
</template>

<script>
import { Screen } from 'asteroid'

export default {
  methods: {
    Screen
  }
}
</script>
