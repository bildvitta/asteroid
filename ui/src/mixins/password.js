const levels = {
  good: {
    color: 'warning',
    label: 'Good',
    progress: 0.5,
    textClass: 'text-warning'
  },

  strong: {
    color: 'positive',
    label: 'Strong',
    progress: 0.75,
    textClass: 'text-positive'
  },

  veryStrong: {
    color: 'positive',
    label: 'Very strong',
    progress: 1,
    textClass: 'text-positive'
  },

  veryWeak: {
    color: 'negative',
    label: 'Very weak',
    progress: 0,
    textClass: 'text-negative'
  },

  weak: {
    color: 'warning',
    label: 'Weak',
    progress: 0.25,
    textClass: 'text-warning'
  }
}

export default {
  props: {
    levels: {
      default: () => levels,
      type: Object
    },

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength
    minlength: {
      default: 8,
      type: [Number, String]
    },

    specials: {
      default: /[!@#$%^&*()_+\-=[\]{}|;:'",<.>/?`~]/g,
      type: RegExp
    },

    trackColor: {
      default: 'blue-grey-1',
      type: String
    },

    useLowercase: {
      default: true,
      type: Boolean
    },

    useNumbers: {
      default: true,
      type: Boolean
    },

    useSpecial: {
      default: true,
      type: Boolean
    },

    useUppercase: {
      default: true,
      type: Boolean
    }
  }
}
