<template>
  <div v-if="isOpened" class="q-pa-lg relative-position rounded-borders tip" :class="bgColorClass">
    <q-btn class="absolute-top-right q-mr-md q-mt-sm" :color="buttonColor" dense flat icon="close" rounded @click="toggleTip" />
    <div class="q-gutter-md q-mr-lg">
      <slot name="title">
        <div class="text-bold text-h5" :class="colorClass">{{ label }}</div>
      </slot>
      <slot>
        <p :class="colorClass">{{ text }}</p>
      </slot>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'transparent'
    },

    buttonColor: {
      type: String,
      default: 'primary'
    },

    label: {
      type: String,
      default: ''
    },

    textColor: {
      type: String,
      default: 'dark'
    },

    text: {
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
    bgColorClass () {
      return `bg-${this.color}`
    },

    colorClass () {
      return `text-${this.textColor}`
    }
  },

  methods: {
    toggleTip () {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss">
.tip {
  border-width: 0 10px;
  border-style: solid;
  border-color: $primary;
}
</style>
