<template>
  <div v-if="model" class="q-pa-lg qas-alert relative-position rounded-borders" :class="classes">
    <qas-btn class="absolute-top-right q-mr-md q-mt-sm" :color="color" dense flat icon="o_close" rounded @click="close" />

    <div class="q-gutter-md q-mr-lg">
      <slot name="header">
        <h5 v-if="title" class="text-bold text-h5">{{ title }}</h5>
      </slot>

      <slot>
        <qas-breakline tag="p" :text="text" />
      </slot>
    </div>
  </div>
</template>

<script>
import QasBreakline from '../breakline/QasBreakline.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasAlert',

  components: {
    QasBreakline,
    QasBtn
  },

  props: {
    color: {
      default: 'primary',
      type: String
    },

    modelValue: {
      default: true,
      type: Boolean
    },

    text: {
      default: '',
      type: String
    },

    title: {
      default: '',
      type: String
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      model: true
    }
  },

  computed: {
    classes () {
      return {
        [`text-${this.color}`]: true,
        [`bg-${this.color}-contrast`]: ['primary', 'secondary'].includes(this.color)
      }
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        this.model = value
      },
      immediate: true
    }
  },

  methods: {
    close () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style lang="scss">
.qas-alert {
  border-style: solid;
  border-width: 0 10px;
}
</style>
