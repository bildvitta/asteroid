<template>
  <div class="container error-component flex">
    <div class="column full-width items-center justify-center row">
      <h2 :aria-label="ariaLabelCode" class="q-mb-sm text-grey-9 text-h2" role="heading">
        {{ code }}
      </h2>

      <div class="q-mb-2xl text-body1 text-center text-grey-8">
        <qas-breakline :text="description" />
      </div>

      <q-img alt="ilustração do código de erro" class="error-component__image" :src="imagePath" />

      <qas-btn v-if="hasButtonProps" class="q-mt-xl" v-bind="buttonProps" color="primary" icon="chevron_left" variant="tertiary" />
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
    },

    imagePath: {
      type: String,
      default: ''
    }
  },

  computed: {
    hasButtonProps () {
      return !!Object.keys(this.buttonProps).length
    },

    ariaLabelCode () {
      return `Código de erro ${this.code}`
    }
  }
}
</script>

<style lang="scss">
.error-component {
  background-color: var(--qas-background-color);
  min-height: 100vh;
  padding: var(--qas-spacing-3xl) 0;

  &__image {
    width: 300px;
  }

  @media (max-width: $breakpoint-xs) {
    padding: var(--qas-spacing-xl) 0;

    &__image {
      width: 265px;
    }
  }
}
</style>
