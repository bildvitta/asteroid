<template>
  <div class="container q-py-lg">
    <qas-alert v-model="model" color="negative" text="Aqui vai um pequeno texto para teste" title="Titulo de exemplo" />

    <div>
      model: {{ model }}
    </div>

    <qas-btn @click="model = !model">Mudar o model</qas-btn>
  </div>
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
