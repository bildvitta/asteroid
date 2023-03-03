<template>
  <div class="container q-py-lg">
    <qas-btn-dropdown :button-props="{ label: 'Usuário', icon: 'sym_r_person' }" use-split>
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>

      <template #left-button>
        <qas-btn label="Botão customizado!" />
      </template>
    </qas-btn-dropdown>
  </div>
</template>
