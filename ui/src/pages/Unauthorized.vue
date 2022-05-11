<template>
  <error-component v-bind="errorProps" />
</template>

<script>
import ErrorComponent from './ErrorComponent.vue'

export default {
  name: 'Unauthorized',

  components: {
    ErrorComponent
  },

  computed: {
    errorProps () {
      return {
        code: '401',
        title: 'Ops! Parece que você está sem acesso ao sistema!',
        buttonProps: {
          to: { path: '/auth/login' },
          label: 'Fazer login'
        }
      }
    }
  }
}
</script>
