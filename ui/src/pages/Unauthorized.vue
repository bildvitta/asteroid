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
        description: 'Parece que você está sem acesso ao sistema. \n Sugerimos que entre em contato com o administrador.',
        imagePath: require('../assets/big-shoes-walking-the-dog.svg'),
        buttonProps: {
          to: { path: '/auth/login' },
          label: 'Fazer login'
        }
      }
    }
  }
}
</script>
