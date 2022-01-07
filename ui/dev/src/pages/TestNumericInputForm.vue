<template>
  <q-page class="container">
    <q-form @submit.prevent>
      <div class="q-col-gutter-md row">
        <div class="col-6">
          <qas-numeric-input v-model="model" hint="Insira um valor maior ou igual 10" mode="decimal" :rules="[customValidator]" />
        </div>
        <div class="col-6">
          <qas-numeric-input v-model="model2" hint="Insira um valor maior ou igual 10" :rules="[customValidator]" />
        </div>
      </div>

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
      model: 0,
      model2: 0
    }
  },

  methods: {
    customValidator (value) {
      return value >= 10 || 'valor precisa ser maior ou igual a 10'
    }
  }
}
</script>
