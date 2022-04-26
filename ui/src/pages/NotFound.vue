<template>
  <div class="fixed-center text-center">
    <p class="q-my-lg text-faded">Ops, nada aqui... <strong>(404)</strong></p>
    <q-btn color="primary" flat @click="$router.push('/')">Voltar</q-btn>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
