<template>
  <div class="container q-py-lg">
    <qas-btn-dropdown :buttons-props-list="buttonsPropsList">
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>
    <qas-btn-dropdown :buttons-props-list="buttonsPropsList2" />
  </div>
</template>

<script setup>
const buttonsPropsList = {
  export: {
    label: 'Exportar arquivo',
    icon: 'sym_r_upload',
    color: 'primary',
    onClick: () => alert('Exportando...')
  },

  sync: {
    label: 'Sincronizar arquivos',
    iconRight: 'sym_r_sync',
    onClick: () => alert('Sincronizando...')
  }
}

const buttonsPropsList2 = [
  {
    label: 'Exportar arquivo',
    iconRight: undefined,
    color: 'primary',
    onClick: () => alert('Exportando...')
  }
]
</script>
