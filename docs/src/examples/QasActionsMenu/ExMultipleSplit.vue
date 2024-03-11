<template>
  <div class="container q-py-lg">
    <qas-actions-menu v-bind="props" />
  </div>
</template>

<script setup>
const list = {
  visibility: {
    icon: 'sym_r_visibility',
    label: 'Visualizar',
    handler: () => alert('handler ativado')
  },
  edit: {
    icon: 'sym_r_create',
    label: 'Editar',
    handler: () => alert('handler ativado')
  },
  person: {
    icon: 'sym_r_person',
    label: 'Perfil',
    handler: () => alert('handler ativado')
  }
}

const props = {
  list,
  splitName: 'person'
}
</script>
