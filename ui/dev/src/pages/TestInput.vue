<template>
  <q-page class="container">
      <q-form>
        <qas-input v-model="model" clearable @clear="onClear" :rules="[value => value.length || 'obrigatório']" />

        <qas-input v-model="model2" mask="phone" />

        <qas-btn type="submit">Validar!</qas-btn>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      model2: ''
    }
  },

  methods: {
    onClear () {
      alert('Foi limpado')
    }
  }
}
</script>
