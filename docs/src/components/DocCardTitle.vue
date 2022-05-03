<template>
  <section class="q-mr-md q-my-xs text-subtitle1">
    <div class="doc-card-title">{{ title }}</div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.doc-card-title {
  background: $grey-4;
  border-radius: 3px 5px 5px 0;
  color: $grey-9;
  margin-left: -24px;
  padding: 2px 10px 2px 24px;
  position: relative;

  &::after {
    border: 0 solid transparent;
    border-top-color: $grey-5;
    border-width: 9px 0 0 11px;
    content: '';
    height: 0;
    left: 0;
    position: absolute;
    top: 100%;
    width: 0;
  }
}
</style>
