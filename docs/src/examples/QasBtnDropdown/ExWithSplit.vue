<template>
  <div class="container q-py-lg">
    <qas-btn-dropdown :buttons-props-list="buttonsPropsList" use-split>
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>
  </div>
</template>

<script setup>
const buttonsPropsList = [
  {
    label: 'Exportar arquivo',
    icon: 'sym_r_upload',
    color: 'primary',
    onClick: () => alert('Exportando...')
  },
  {
    label: 'Sincronizar arquivos',
    iconRight: 'sym_r_sync',
    onClick: () => alert('Sincronizando...')
  }
]
</script>
