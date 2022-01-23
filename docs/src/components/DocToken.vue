<template>
  <code class="doc-token"><slot>{{ decodedToken }}</slot></code>
</template>

<script>
export default {
  props: {
    token: {
      default: '',
      type: String
    }
  },

  computed: {
    decodedToken () {
      return decodeURI(this.token)
    }
  }
}
</script>

<style lang="scss">
@use 'sass:color';

.doc-token {
  background-color: color.adjust($brand-primary, $lightness: 30%);
  border-radius: $generic-border-radius;
  display: inline-block;
  letter-spacing: -0.03em;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
</style>
