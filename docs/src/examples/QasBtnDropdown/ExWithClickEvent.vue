<template>
  <div class="container q-py-lg">
    <qas-label label="Evento click sem split" />

    <qas-btn-dropdown :buttons-props-list="buttonsPropsList1" @click="onClick">
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>

    <qas-label class="q-mt-lg" label="Evento click sem split" />

    <qas-btn-dropdown :buttons-props-list="buttonsPropsList2" use-split @click="onClick">
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>
  </div>
</template>

<script setup>
const buttonsPropsList1 = {
  export: {
    label: 'Exportar arquivo',
    icon: 'sym_r_upload',
    color: 'primary'
  },
  sync: {
    label: 'Sincronizar arquivos',
    iconRight: 'sym_r_sync'
  }
}

const buttonsPropsList2 = {
  export: {
    label: 'Exportar arquivo',
    icon: 'sym_r_upload',
    color: 'primary'
  }
}

function onClick () {
  alert('clicado')
}
</script>
