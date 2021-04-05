<template>
  <q-page padding>
    {{ teste }}
    <div>
    <q-form @submit.prevent="() => null">
    <qas-input ref="input" v-model="teste" :rules="[value => value.length || 'obrigatorio']" />
    <qas-btn @click="validate" type="submit">clique aqui</qas-btn>
    </q-form>
    </div>
  </q-page>
</template>

<script>
import vuexStoreModule from '../helpers/vuexStoreModule'

export default {
  data () {
    return {
      teste: ''
    }
  },

  methods: {
    validate () {
      const input = this.$refs.input

    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
