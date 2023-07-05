<template>
  <q-avatar class="text-bold" v-bind="attributes">
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script>
const AvatarColors = {
  Primary: 'primary',
  SecondaryContrast: 'secondary-contrast',
  Grey4: 'grey-4'
}

export default {
  name: 'QasAvatar',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: AvatarColors.Primary,
      validator: value => {
        const availableColors = Object.values(AvatarColors)

        return availableColors.includes(value)
      }
    },

    size: {
      type: String,
      default: ''
    },

    icon: {
      default: 'sym_r_error',
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
      const {
        rounded,
        square,
        fontSize,
        textColor,
        ...attributes
      } = this.$attrs

      const colors = {
        [AvatarColors.Primary]: 'white',
        [AvatarColors.SecondaryContrast]: 'primary',
        [AvatarColors.Grey4]: 'grey-8'
      }

      return {
        size: this.size,
        color: this.color,
        textColor: colors[this.color],
        ...attributes
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
