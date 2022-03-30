<template>
  <div class="container q-py-lg">
    <qas-password-input v-model="password" />

    Senha: {{ password }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: ''
    }
  }
}
</script>
