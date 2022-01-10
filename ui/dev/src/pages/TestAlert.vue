<template>
  <q-page>
    <qas-alert v-model="model" class="q-ma-lg" color="negative" title="AAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAA" text="Aqui vai um pequeno texto para teste" />

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
