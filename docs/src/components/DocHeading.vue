<template>
  <div class="doc-heading">
    <component :is="tag" class="doc-heading__title" :class="titleClass">
      <slot>{{ title }}</slot>
      <q-badge v-if="badge" class="doc-heading__badge q-ml-sm" color="brand-primary" :label="badge" />
    </component>
  </div>
</template>

<script>
export default {
  props: {
    badge: {
      default: '',
      type: String
    },

    level: {
      default: 1,
      type: Number,
      validator: value => {
        return value > 0 && value < 7
      }
    },

    title: {
      default: '',
      type: String
    }
  },

  computed: {
    tag () {
      return `h${this.level}`
    },

    titleClass () {
      return `doc-heading__title--level-${this.level}`
    }
  }
}
</script>

<style lang="scss">
.doc-heading {
  color: $brand-primary;

  &__title {
    line-height: 1;

    // &::after {
    //   content: ' #';
    //   font-size: 75%;
    //   opacity: 0;
    //   transition: opacity 250ms;
    // }

    // &:hover::after {
    //   opacity: 1;
    // }
  }

  &__title--level- {
    &1 {
      font-size: 3rem;
      font-weight: 600;
      margin: 0 0 0.5em;
      padding: 1rem 0;
    }

    &2 {
      border-bottom: 1px solid $grey-4;
      font-size: 2rem;
      font-weight: 600;
      margin: 4rem 0 1.5rem;
      padding: 0.5rem 0;
    }

    &3 {
      font-size: 1.7rem;
      margin: 2.5rem 0 1.5rem;
      padding: 0.45rem 0;
    }

    &4 {
      font-size: 1.4rem;
      margin: 1.6rem 0 1.3rem;
      padding: 0.25rem 0;
    }

    &5 {
      font-size: 0.9rem;
      margin: 1.5rem 0;
    }

    &6 {
      font-size: 0.8rem;
      margin: 1.5rem 0;
    }
  }

  &__badge {
    vertical-align: super;
  }
}
</style>
