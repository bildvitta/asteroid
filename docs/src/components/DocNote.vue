<template>
  <div class="doc-note" :class="rootClass">
    <p v-if="title" class="doc-note__title">{{ title }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    },

    type: {
      default: 'block',
      type: String
    }
  },

  computed: {
    rootClass () {
      return `doc-note--${this.type}`
    }
  }
}
</script>

<style lang="scss">
@use 'sass:color';

.doc-note {
  $root: &;

  background-color: $grey-2;
  border: solid $grey-3;
  border-radius: $generic-border-radius;
  border-width: 0 5px;
  letter-spacing: 0.03em;
  margin: 16px 0;
  padding: 16px 24px;

  &--danger {
    background-color: color.scale($negative, $lightness: 95%);
    border-color: color.scale($negative, $lightness: 70%);

    .doc-code,
    .doc-token {
      background: color.scale($negative, $lightness: 90%);
    }
  }

  &--info {
    background-color: color.scale($primary, $lightness: 95%);
    border-color: color.scale($primary, $lightness: 70%);

    .doc-code,
    .doc-token {
      background: color.scale($primary, $lightness: 90%);
    }
  }

  &--tip {
    background-color: color.scale($positive, $lightness: 90%);
    border-color: color.scale($positive, $lightness: 50%);

    .doc-code,
    .doc-token {
      background: color.scale($positive, $lightness: 80%);
    }
  }

  &--warning {
    background-color: color.scale($warning, $lightness: 90%);
    border-color: color.scale($warning, $lightness: 60%);

    .doc-code,
    .doc-token {
      background: color.scale($warning, $lightness: 80%);
    }
  }

  > p,
  > ul,
  > .doc-code {
    margin-bottom: 8px;
  }

  > :last-child {
    margin-bottom: 0;
  }

  &__title {
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
}
</style>
