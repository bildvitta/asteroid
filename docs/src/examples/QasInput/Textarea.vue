<template>
  <div class="container q-py-lg row">
    <qas-input v-model="model" class="col-4" label="Meu input" type="textarea" />
    <qas-input v-model="model2" class="col-4" error error-message="Mensagem de erro" label="Meu input" type="textarea" />

    Model: {{ model }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      model2: ''
    }
  }
}
</script>
