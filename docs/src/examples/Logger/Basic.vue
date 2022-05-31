<template>
  <div class="container spaced text-center">
    Olhe o console do navegador!
  </div>
</template>

<script>
export default {
  created () {
    this.$qas.logger.group('Grupo de informações', ['teste'])
    this.$qas.logger.info('Apenas uma mensagem')

    this.$qas.logger.group('Grupo de informações de erro', ['teste'], true)
    this.$qas.logger.error('Apenas uma mensagem de erro')
  }
}
</script>
