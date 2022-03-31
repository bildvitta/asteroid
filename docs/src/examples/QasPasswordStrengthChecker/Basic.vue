<template>
  <div class="container q-py-lg">
    <qas-password-input v-model="password" :use-strength-checker="false" />

    <div class="q-my-lg">
      <qas-password-strength-checker v-model="isStrong" :password="password" />
    </div>

    A senha está forte? {{ isStrong }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      isStrong: false
    }
  }
}
</script>
