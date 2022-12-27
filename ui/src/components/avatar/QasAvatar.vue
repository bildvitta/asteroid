<template>
  <q-avatar class="text-bold" :class="avatarClasses" v-bind="attributes">
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
    dark: {
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
    avatarClasses () {
      if (this.hasImage) {
        return null
      }

      return 'bg-primary text-white'
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

    attributes () {
      const { square, rounded, ...attributes } = this.$attrs

      return attributes
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
