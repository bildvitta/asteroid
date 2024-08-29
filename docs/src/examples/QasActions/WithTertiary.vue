<template>
  <div class="container q-py-lg">
    <qas-actions>
      <template #primary>
        <qas-btn class="full-width" label="Primeiro" variant="primary" />
      </template>

      <template #secondary>
        <qas-btn class="full-width" label="Segundo" variant="secondary" />
      </template>

      <template #tertiary>
        <qas-btn class="full-width" label="Terciário" variant="tertiary" />
      </template>
    </qas-actions>
  </div>
</template>

<script setup>
defineOptions({ name: 'WithTertiary' })
</script>
