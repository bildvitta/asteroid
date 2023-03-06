<template>
  <div class="container q-py-lg">
    <qas-label label="Evento click sem split" />
    <qas-btn-dropdown :button-props="{ label: 'Usuário' }" @click="onClick">
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>

    <qas-label class="q-mt-lg" label="Evento click sem split" />
    <qas-btn-dropdown :button-props="{ label: 'Usuário', icon: 'sym_r_person' }" use-split @click="onClick">
      <q-list>
        <q-item v-for="item in 10" :key="item">
          Meu item - {{ item }}
        </q-item>
      </q-list>
    </qas-btn-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      alert('Fui clicado.')
    }
  }
}
</script>
