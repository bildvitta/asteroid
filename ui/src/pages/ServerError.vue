<template>
  <div class="bg-grey-2 column error-page items-center justify-around">
    <div class="column full-width items-center justify-center q-gutter-md q-py-md row">
      <q-img src="../assets/gear.svg" :width="gearSize" />
      <div class="text-bold text-h1 text-primary">500</div>
      <div class="column items-center">
      <div class="text-bold text-h6 text-subtitle text-grey-9">Ops, ocorreu um erro interno no nosso servidor!</div>
      <div class="text-bold text-center text-subtitle text-grey-9">Tente novamente em alguns instantes.</div>
      </div>
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
