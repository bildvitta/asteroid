<template>
  <div class="container q-py-lg">
    <div class="q-mb-sm text-body1">Clique em uma ação para visualizar o exemplo com loading</div>
    <qas-actions-menu v-bind="props" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'ExWithLoading' })

const loading = ref({
  visibility: false,
  edit: false,
  person: false
})

const list = computed(() => {
  return {
    visibility: {
      icon: 'sym_r_visibility',
      label: 'Visualizar',
      handler: () => { loading.value.visibility = !loading.value.visibility },
      loading: loading.value.visibility
    },
    edit: {
      icon: 'sym_r_create',
      label: 'Editar',
      handler: () => { loading.value.edit = !loading.value.edit },
      loading: loading.value.edit
    },
    person: {
      icon: 'sym_r_person',
      label: 'Perfil',
      handler: () => { loading.value.person = !loading.value.person },
      loading: loading.value.person
    }
  }
})

const props = computed(() => {
  return {
    list: list.value,
    splitName: 'person'
  }
})
</script>
