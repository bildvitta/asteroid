<template>
  <error-component v-bind="errorProps" />
</template>

<script>
import ErrorComponent from './ErrorComponent.vue'

export default {
  name: 'ServerError',

  components: {
    ErrorComponent
  },

  computed: {
    errorProps () {
      return {
        code: '500',
        description: 'Ops... O sistema está passando por uma instabilidade. \n Já identificamos o problema e estamos trabalhando na solução.',
        imagePath: require('../assets/big-shoes-sitting-on-rock.svg'),
        buttonProps: {
          to: { path: '/' },
          label: 'Voltar ao início'
        }
      }
    }
  }
}
</script>
