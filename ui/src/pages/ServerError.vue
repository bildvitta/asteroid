<template>
  <error-component v-bind="errorProps" />
</template>

<script>
import ErrorComponent from './ErrorComponent'

export default {
  components: {
    ErrorComponent
  },

  computed: {
    errorProps () {
      return {
        code: '500',
        title: 'Ops, ocorreu um erro interno no nosso servidor!',
        subtitle: 'Tente novamente em alguns instantes.'
      }
    }
  }
}
</script>
