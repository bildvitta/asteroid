<template>
  <div class="q-px-xl column error-component items-center justify-around">
    <div class="column full-width items-center justify-center q-gutter-md q-py-md row">
      <q-img src="../assets/gear.svg" :width="gearSize" />
      <div class="text-bold text-h1 text-primary">{{ code }}</div>
      <div class="text-bold text-center text-h6 text-grey-9">{{ title }}</div>
      <div v-if="subtitle" class="text-bold text-center text-subtitle text-grey-9">{{ subtitle }}</div>
      <qas-btn v-bind="buttonProps" v-if="hasButtonProps" class="text-bold text-primary" />
    </div>
  </div>
</template>

<script>
import screenMixin from '../mixins/screen'

export default {
  name: 'ErrorComponent',

  mixins: [screenMixin],

  props:{
    code: {
      type: String,
      required: true 
    },

    title: {
      type: String,
      required: true 
    },

    subtitle: {
      type: String,
      default: '' 
    },

    buttonProps: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    gearSize () {
      return this.$_isSmall ? '90px' : '160px'
    },

    hasButtonProps () {
      return !!Object.keys(this.buttonProps).length
    }
  }
}
</script>

<style lang="scss">
.error-component {
  min-height: 100vh;
  background-color: var(--qas-background-color); 
}
</style>
