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
        description: 'Ops... Parece que você foi desconectado do sistema. \n Por favor, entre na sua conta novamente.',
        imagePath: require('../assets/big-shoes-walking-the-dog.svg'),
        buttonProps: {
          to: { path: '/auth/login' },
          label: 'Entrar novamente'
        }
      }
    }
  }
}
</script>
