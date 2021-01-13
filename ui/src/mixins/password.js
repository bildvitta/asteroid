export default {
  props: {
    veryWeak: {
      type: Number,
      default: 1
    },

    weak: {
      type: Number,
      default: 5
    },

    pattern: {
      type: [RegExp, String],
      default: ''
    }
  },

  created () {
    if (this.veryWeak >= this.weak) {
      throw new Error('Prop "weak" must be greater than prop "veryWeak".')
    }
  },

  methods: {
    onSuccess () {
      this.$emit('password-success')
    }
  }
}
