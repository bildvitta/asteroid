<template>
  <div class="container q-py-lg">
    <qas-tabs-generator v-model="model" :counters="{ tab1: 2 }" :tabs="{ tab1: 'tab-1', tab2: 'tab-2' }">
      <template #tab-tab1>
        <div>
          Estou dentro do QTab!
        </div>
      </template>
    </qas-tabs-generator>
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
