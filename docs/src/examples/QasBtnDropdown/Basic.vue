<template>
  <div class="container q-py-lg">
    <qas-btn-dropdown :button-props="{ label: 'Teste', iconRight: 'sym_r_edit', useLabelOnSmallScreen: false }" use-split>
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>
  </div>
</template>
