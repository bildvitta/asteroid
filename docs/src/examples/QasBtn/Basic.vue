<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm q-mb-lg">
      <qas-btn label="teste do loading" :loading="loading" />
      <qas-btn color="white" label="teste do loading" variant="tertiary" />
      <qas-btn label="começa loading" @click="loading = true" />
      <!-- <qas-btn label="primary" variant="primary" />
      <qas-btn icon="sym_r_search" label="primary" variant="primary" />
      <qas-btn disabled label="primary" variant="primary" @click="test" />
      <qas-btn disabled icon="sym_r_search" label="primary" variant="primary" />
      <qas-btn disabled label="primary" variant="primary" />
      <qas-btn disabled icon="sym_r_search" variant="primary" />
      <qas-btn disabled icon="sym_r_search" variant="tertiary" /> -->
      <!-- <qas-btn disabled variant="primary">
        <q-icon name="sym_r_search" />
      </qas-btn> -->
      <!-- <qas-btn disabled variant="primary">
        <span>label</span>
        <q-icon name="sym_r_search" />
      </qas-btn> -->
    </div>
    <!-- <qas-btn label="Um simples botão" variant="secondary" />
    <qas-btn label="Um simples botão" variant="primary" />
    <qas-btn disabled label="Um simples botão" variant="secondary" />
    <qas-btn label="Um simples botão" variant="tertiary" />
    <qas-btn disabled label="Um simples botão" variant="tertiary" /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },

  methods: {
    test () {
      console.log('fui chamado')
    }
  }
}
</script>
