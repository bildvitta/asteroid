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
        imagePath: new URL('../assets/big-shoes-sitting-on-rock.svg', import.meta.url).href,
        buttonProps: {
          to: { path: '/' },
          label: 'Voltar ao início'
        }
      }
    }
  }
}
</script>
