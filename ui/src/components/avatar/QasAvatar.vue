<template>
  <q-avatar class="text-bold" v-bind="attributes">
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
export default {
  name: 'QasAvatar',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary-contrast'].includes(value)
    },

    size: {
      type: String,
      default: ''
    },

    icon: {
      default: 'o_error',
      type: String
    },

    image: {
      default: '',
      type: String
    },

    title: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      hasImageError: false
    }
  },

  computed: {
    firstLetter () {
      return this.title[0].toUpperCase()
    },

    hasImage () {
      return !this.hasImageError && !!this.image
    },

    hasTitle () {
      return !!this.title
    },

    attributes () {
      const colors = {
        primary: 'white',
        'secondary-contrast': 'primary'
      }

      return {
        size: this.size,
        color: this.color,
        textColor: colors[this.color]
      }
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
