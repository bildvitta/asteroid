<template>
  <div class="container q-my-xl">
    <qas-select-filter :options="options" />

    <pre>{{ options }}</pre>

    <div class="q-mt-md">
      <qas-btn label="pagina 2" to="/test/2" />
    </div>

    <div class="q-mt-md">
      <qas-btn label="pagina 3" to="/test/3" />
    </div>
  </div>
</template>

<script setup>
const options = [
  {
    label: 'Empresa 1',
    value: 'company-1'
  },
  {
    label: 'Empresa 2',
    value: 'company-2'
  },
  {
    label: 'Empresa 3',
    value: 'company-3'
  },
  {
    label: 'Empresa 4',
    value: 'company-4'
  },
  {
    label: 'Empresa 5',
    value: 'company-5'
  }
]
</script>
