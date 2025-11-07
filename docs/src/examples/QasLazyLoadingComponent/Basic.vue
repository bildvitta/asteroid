<template>
  <div class="container spaced">
    <qas-lazy-loading-component>
      <div class="bg-red q-mb-md" style="width: 140px; height: 140px;">
        Conteúdo carregado preguiçosamente 1
      </div>

      <div class="bg-red q-mb-md" style="width: 140px; height: 140px;">
        Conteúdo carregado preguiçosamente 2
      </div>

      <div class="bg-red q-mb-md" style="width: 140px; height: 140px;">
        Conteúdo carregado preguiçosamente 3
      </div>

      <div class="bg-red" style="width: 140px; height: 140px;">
        Conteúdo carregado preguiçosamente 4
      </div>

      <grid-generator />
      <ex-grid-common-columns />

      <div class="bg-red" style="width: 500px; height: 500px;">
        Blocão
      </div>

      <fieldset-test />
    </qas-lazy-loading-component>
  </div>
</template>

<script setup>
import GridGenerator from '../QasGridGenerator/Basic.vue'
import ExGridCommonColumns from '../QasGridGenerator/ExGridCommonColumns.vue'
import FieldsetTest from '../QasFormGenerator/Fieldset.vue'
</script>
