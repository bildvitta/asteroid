<template>
  <q-avatar class="text-bold" :class="avatarClass" rounded>
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
export default {
  name: 'QasAvatar',

  props: {
    color: {
      default: '',
      type: String
    },

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

    textColor: {
      default: 'primary',
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
    avatarClass () {
      if (this.hasImage) {
        return null
      }

      const contrastColor = this.color ? this.color : this.contrastColor

      return [
        this.dark
          ? `bg-${this.textColor} text-${contrastColor}`
          : `bg-${contrastColor} text-${this.textColor}`
      ]
    },

    contrastColor () {
      return `${this.textColor}-contrast`
    },

    firstLetter () {
      return this.title[0].toUpperCase()
    },

    hasImage () {
      return !this.hasImageError && !!this.image
    },

    hasTitle () {
      return !!this.title
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
