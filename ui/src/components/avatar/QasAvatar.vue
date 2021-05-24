<template>
  <q-avatar :class="classes" rounded v-bind="$attrs" v-on="$listeners">
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
export default {
  props: {
    color: {
      default: 'primary',
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
    classes () {
      const contrastColor = this.textColor ? this.textColor : this.contrastColor

      return [
        this.dark
          ? `bg-${this.color} text-${contrastColor} text-bold`
          : `bg-${contrastColor} text-${this.color} text-bold`
      ]
    },

    contrastColor () {
      return `${this.color}-contrast`
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
