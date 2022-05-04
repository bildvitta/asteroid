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
        code: '404',
        title: 'Ops! Parece que a página que está tentando acessar não existe!',
        buttonProps: {
          to: { path: '/' },
          label: 'Voltar ao início'
        }
      }
    }
  }
}
</script>
