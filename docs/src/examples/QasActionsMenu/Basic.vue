<template>
  <div class="container q-py-lg">
    <qas-actions-menu v-bind="props" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const list = ref({
  visibility: {
    icon: 'sym_r_visibility',
    label: 'Visualizar',
    handler: () => alert('handler ativado')
  }
  // edit: {
  //   icon: 'sym_r_create',
  //   label: 'Editar',
  //   handler: () => alert('handler ativado')
  // }
  // person: {
  //   icon: 'sym_r_person',
  //   label: 'Perfil',
  //   handler: () => alert('handler ativado')
  // }
})

const deleteProps = ref({
  deleteActionParams: { entity: 'users', id: 'my-custom-id-from-user', onDeleteSuccess: () => {} }
})

setTimeout(() => {
  deleteProps.value = {}

  // delete list.value.visibility

  // list.value.edit.disable = true

  // list.value.person = {
  //   icon: 'sym_r_person',
  //   label: 'Perfil',
  //   handler: () => alert('handler ativado')
  // }
}, 3000)

const props = computed(() => {
  return {
    // disable: true,
    deleteProps: deleteProps.value,
    list: list.value,
    splitName1: 'visibility',
    useLabel: false,
    useTooltip: true
  }
})
</script>
