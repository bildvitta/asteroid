<template>
  <div class="bg-grey-2 column error-page items-center justify-around">
    <div class="column full-width items-center justify-center q-gutter-md q-py-md row">
      <q-img src="../assets/gear.svg" :width="gearSize" />
      <div class="text-bold text-h1 text-primary">404</div>
      <div class="text-bold text-center text-h6 text-grey-9">Ops! Parece que a página que está tentando acessar não existe!</div>
      <qas-btn class="text-bold text-primary" label="Voltar ao início" @click="$router.push('/')" />
    </div>
  </div>
</template>

<script>
import screenMixin from '../mixins/screen'
export default {
  mixins: [screenMixin],

  computed: {
    gearSize () {
      return this.$_isSmall ? '50%' : '14%'
    }
  }
}
</script>

<style lang="scss">
.error-page {
  height: 100vh;
  padding: 0 40px;
}
</style>
