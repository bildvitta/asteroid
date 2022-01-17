<template>
  <q-page>
    <qas-password-input v-model="model" />

    <qas-password-input :error="true" v-model="model2" bottom-slots>
      <template #error>
        <div>
          Novo erro
        </div>
      </template>
    </qas-password-input>
    <q-input bottom-slots error type="password">
      <template #error>
        <div>
          Novo erro 2
        </div>
      </template>
    </q-input>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      model: '',
      model2: ''
    }
  }
}
</script>
