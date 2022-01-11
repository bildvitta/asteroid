<template>
  <q-page>
    <qas-tabs-generator v-model="model" :counters="{ tab1: 2 }" :tabs="{ tab1: 'tab1', tab2: 'tab2' }" />

    model: {{ model }}

    <qas-btn @click="model = 'tab2'">Mudar o model</qas-btn>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: 'tab1'
    }
  }
}
</script>
