<template>
  <div class="container q-py-lg">
    <qas-actions>
      <template #primary>
        <qas-btn label="Primeiro" variant="primary" />
      </template>

      <template #secondary>
        <qas-btn label="Segundo" variant="secondary" />
      </template>

      <template #tertiary>
        <qas-btn label="Terciário" variant="tertiary" />
      </template>
    </qas-actions>
  </div>
</template>

<script setup>
defineOptions({ name: 'WithTertiary' })
</script>
