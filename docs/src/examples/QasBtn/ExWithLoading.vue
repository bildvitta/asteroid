<template>
  <div class="container q-py-lg">
    <div class="q-mb-sm text-body1">Clique em uma ação para visualizar o exemplo com loading</div>

    <qas-btn class="q-mt-md" icon="sym_r_create" label="Visualizar" :loading="loading.visibility" @click="handleLoading('visibility')" />

    <br>

    <qas-btn class="q-my-md" icon="sym_r_person" label="Editar" :loading="loading.edit" variant="secondary" @click="handleLoading('edit')" />

    <br>

    <qas-btn icon="sym_r_person" label="Perfil" :loading="loading.person" variant="primary" @click="handleLoading('person')" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'ExWithLoading' })

// refs
const loading = ref({
  visibility: false,
  edit: false,
  person: false
})

// functions
async function handleLoading (fieldKey) {
  loading.value[fieldKey] = true

  await promiseSimulator()

  loading.value[fieldKey] = false
}

function promiseSimulator () {
  return new Promise(resolve => setTimeout(() => resolve(), 3000))
}
</script>
