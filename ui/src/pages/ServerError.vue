<template>
  <div class="bg-grey-2 q-px-xl column page-server-error items-center justify-around">
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
      return this.$_isSmall ? '90px' : '160px'
    }
  }
}
</script>

<style lang="scss">
.page-server-error {
  min-height: 100vh;
}
</style>
