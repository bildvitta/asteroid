<template>
  <div class="container q-py-lg">
    <div>
      <qas-alert :text />
    </div>

    <div>
      <qas-alert class="q-mt-lg" status="error" :text />
    </div>

    <div>
      <qas-alert class="q-mt-lg" :text use-close-button />
    </div>

    <div>
      <qas-alert class="q-mt-lg" :text use-close-button use-persistent-model-on-close />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'Basic' })

const text = 'Usuário incompleto, atualize para completar.'
</script>
