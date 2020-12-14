<template>
  <q-avatar :class="classes" :color="backgroundColor" v-bind="$attrs" v-on="$listeners">
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
export const colors = [
  'amber',
  'blue',
  'blue-grey',
  'brown',
  'cyan',
  'deep-orange',
  'deep-purple',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow'
]

export default {
  props: {
    dark: {
      default: false,
      type: Boolean
    },

    icon: {
      default: 'o_error',
      type: String
    },

    image: {
      default: '',
      type: String
    },

    textColor: {
      default: '',
      type: String 
    },

    title: {
      default: '',
      type: String
    },

    token: {
      default: 0,
      type: Number
    }
  },

  data () {
    return {
      hasImageError: false
    }
  },

  computed: {
    backgroundColor () {
      if (this.color) {
        return this.color
      }
      return this.dark ? this.mainColor : `${this.mainColor}-2`
    },

    classes () {
      return [this.textColorClass]
    },

    color () {
      return this.$attrs.color
    },

    firstLetter () {
      return this.title[0].toUpperCase()
    },

    hasImage () {
      return !this.hasImageError && !!this.image
    },

    hasTitle () {
      return !!this.title
    },

    hasTextColor () {
      return !!this.textColor
    },

    mainColor () {
      if (!this.title && !this.token) {
        return 'grey'
      }

      const dividend = this.title ? this.title.length : this.token
      return colors[dividend % colors.length]
    },

    textColorClass () {
      if (this.hasTextColor) {
        return `text-${this.textColor}`
      }

      return (this.color === 'black' || this.dark)
        ? `text-${this.mainColor}-2`
        : `text-${this.mainColor}`
    }
  },

  watch: {
    image () {
      this.hasImageError = false
    }
  },

  methods: {
    onImageLoadedError () {
      this.hasImageError = true
    }
  }
}
</script>
