<template>
  <!-- <div class="column error-component items-center justify-around q-px-xl">
    <div class="column full-width items-center justify-center q-gutter-md q-py-md row">
      <q-img src="../assets/gear.svg" :width="gearSize" />
      <div class="text-bold text-h1 text-primary">{{ code }}</div>
      <div class="text-bold text-center text-grey-9 text-h6">{{ title }}</div>
      <div v-if="subtitle" class="text-bold text-center text-grey-9 text-subtitle2">{{ subtitle }}</div>
      <qas-btn v-if="hasButtonProps" class="text-bold text-primary" v-bind="buttonProps" />
    </div>
  </div> -->
  <div class="container flex page-error-component">
    <div class="column full-width items-center justify-center row">
      <h2 class="q-mb-sm text-grey-9 text-h2 text-primary">{{ code }}</h2>

      <div class="q-mb-2xl text-body1 text-center text-grey-8">
        <qas-breakline :text="description" />
      </div>

      <q-img src="../assets/not-found.svg" :width="gearSize" />

      <qas-btn v-if="hasButtonProps" class="q-mt-xl" flat icon="chevron_left" v-bind="buttonProps" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorComponent',

  props: {
    buttonProps: {
      type: Object,
      default: () => ({})
    },

    code: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ''
    }
  },

  computed: {
    gearSize () {
      return this.$qas.screen.isSmall ? '265px' : '350px'
    },

    hasButtonProps () {
      return !!Object.keys(this.buttonProps).length
    }
  }
}
</script>

<style lang="scss">
.page-error-component {
  background-color: var(--qas-background-color);
  min-height: 100vh;
  padding: var(--qas-spacing-3xl) 0;

  @media (max-width: $breakpoint-xs) {
    padding: var(--qas-spacing-xl) 0;
  }
}
</style>
