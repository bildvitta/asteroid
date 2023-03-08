const levels = {
  0: {
    color: 'negative',
    label: 'Muito fraco',
    progress: 0.05,
    textClass: 'text-negative'
  },

  1: {
    color: 'warning',
    label: 'Fraco',
    progress: 0.25,
    textClass: 'text-warning'
  },

  2: {
    color: 'warning',
    label: 'Bom',
    progress: 0.5,
    textClass: 'text-warning'
  },

  3: {
    color: 'positive',
    label: 'Forte',
    progress: 0.75,
    textClass: 'text-positive'
  },

  4: {
    color: 'positive',
    label: 'Muito forte',
    progress: 1,
    textClass: 'text-positive'
  }
}

export default {
  props: {
    currentLevel: {
      default: 0,
      type: Number
    },

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
