export default {
  props: {
    pattern: {
      default: '',
      type: [RegExp, String]
    },

    weak: {
      default: 5,
      type: Number
    }
  },

  methods: {
    onSuccess () {
      this.$emit('password-success')
    }
  }
}
