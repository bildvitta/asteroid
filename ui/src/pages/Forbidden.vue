<template>
  <div class="fixed-center text-center">
    <p class="q-my-lg text-faded">Ops, você não tem permissão para acessar esta página <strong>(403).</strong></p>
    <q-btn color="primary" flat @click="$router.push('/')">Voltar</q-btn>
  </div>
</template>