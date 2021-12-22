<template>
  <q-page class="container">
    <q-form @submit.prevent>
      <qas-decimal-input v-model="model" hint="Insira um valor maior ou igual 10" :rules="[customValidator]" />

      <div class="q-my-lg">
        model -> {{ model }}
      </div>

      <q-btn type="submit">Validar rules!</q-btn>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: 0
    }
  },

  methods: {
    customValidator (value) {
      return value >= 10 || 'valor precisa ser maior ou igual a 10'
    }
  }
}
</script>
