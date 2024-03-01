<template>
  <div class="container q-py-lg">
    <qas-btn-dropdown :buttons-props-list="buttonsPropsList" use-menu-padding>
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
    icon: 'sym_r_upload'
  }
]
</script>
