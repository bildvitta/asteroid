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
        code: '403',
        title: 'Ops, parece que você não tem acesso para este recurso!',
        buttonProps: {
          to: { path: '/' },
          label: 'Voltar ao início'
        }
      }
    }
  }
}
</script>
