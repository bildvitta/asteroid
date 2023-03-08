<template>
  <div class="container q-py-lg">
    <qas-password-input v-model="password" v-model:currentLevel="currentLevel" :error="error" error-message="testeee" label="senha" :strength-checker-props="props" />

    Senha: {{ password }}

    {{ currentLevel }}

    <qas-btn label="teste" @click="error = !error" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false,
      password: '',
      currentLevel: 0
    }
  },

  computed: {
    props () {
      return {
        useNumbers: false
      }
    }
  }
}
</script>
