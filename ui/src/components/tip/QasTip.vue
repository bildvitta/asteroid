<template>
  <div v-if="isOpened" class="q-pa-lg qas-tip relative-position rounded-borders" :class="classes" :style="styles">
    <q-btn class="absolute-top-right q-mr-md q-mt-sm" :color="color" dense flat icon="close" rounded @click="close" />
    <div class="q-gutter-md q-mr-lg" :class="colorClass">
      <slot name="header">
        <div v-if="title" class="text-bold text-h5">{{ title }}</div>
      </slot>
      <slot>
        <p>{{ text }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'transparent'
    },

    color: {
      type: String,
      default: 'primary'
    },

    text: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isOpened: true
    }
  },

  computed: {
    classes () {
      return [`bg-${this.bgColor}`, `text-${this.color}`]
    },

    styles () {
      return { borderColor: this.color }
    }
  },

  methods: {
    close () {
      this.isOpened = false
    }
  }
}
</script>

<style lang="scss">
.qas-tip {
  border-style: solid;
  border-width: 0 10px;
}
</style>
