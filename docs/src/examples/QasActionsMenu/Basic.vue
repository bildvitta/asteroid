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
    disable: true,
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
// const list = {
//   visibility: {
//     icon: 'sym_r_visibility',
//     label: 'Visualizar',
//     handler: () => alert('handler ativado')
//   },
//   edit: {
//     icon: 'sym_r_create',
//     label: 'Editar',
//     handler: () => alert('handler ativado')
//   }
// }

const props = {
  buttonProps: {
    disable: true
  },
  list,
  splitName: 'visibility',
  useLabel1: false
}
</script>
