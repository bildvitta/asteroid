<template>
  <div class="container q-py-lg">
    <qas-grid-item :content="{ typography: 'h4' }" label="Nome" use-inline value="John doe" />

    <qas-grid-item class="q-mt-lg" :content="{ typography: 'h4' }" label="Nome" value="John doe" />
  </div>
</template>

<script setup>
defineOptions({ name: 'WithCustomTypography' })
</script>
