<template>
  <div class="container q-py-lg">
    <qas-tabs-generator v-model="model" :counters="{ tab1: 2 }" :tabs="{ tab1: 'tab-1', tab2: 'tab-2' }" />

    <div class="q-my-lg">
      model: {{ model }}
    </div>

    <qas-btn @click="model = 'tab2'">Mudar o model</qas-btn>
  </div>
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
