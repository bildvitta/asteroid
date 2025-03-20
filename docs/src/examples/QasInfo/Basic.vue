<template>
  <div class="container q-py-lg">
    <qas-box>
      <qas-info status="info" :text />
    </qas-box>

    <qas-info class="q-mt-lg" status="error" :text />
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const text = 'Usuário incompleto, atualize para completar.'
</script>
