<template>
  <q-page>
    <qas-alert v-model="model" class="q-ma-lg" color="negative" title="Titulo de exemplo" text="Aqui vai um pequeno texto para teste" />

    model: {{ model }}

    <qas-btn @click="model = !model">Mudar o model</qas-btn>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: true
    }
  }
}
</script>
