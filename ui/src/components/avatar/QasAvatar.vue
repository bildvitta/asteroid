<template>
  <q-avatar class="text-bold" v-bind="attributes">
    <q-img v-if="hasImage" :alt="title" :ratio="1" spinner-color="primary" spinner-size="16px" :src="image" @error="onImageLoadedError" />
    <template v-else-if="hasTitle">{{ firstLetter }}</template>
    <q-icon v-else :name="icon" />
  </q-avatar>
</template>

<script setup>
import { AvatarColors } from './enums/AvatarColors'

import { ref, computed, watch, useAttrs } from 'vue'

defineOptions({
  name: 'QasAvatar',
  inheritAttrs: false
})

const props = defineProps({
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
})

const attrs = useAttrs()

const hasImageError = ref(false)

const attributes = computed(() => {
  const {
    rounded,
    square,
    fontSize,
    textColor,
    ...attributes
  } = attrs

  const colors = {
    [AvatarColors.Primary]: 'white',
    [AvatarColors.SecondaryContrast]: 'primary',
    [AvatarColors.Grey4]: 'grey-8'
  }

  return {
    size: props.size,
    color: props.color,
    textColor: colors[props.color],
    ...attributes
  }
})

const firstLetter = computed(() => props.title[0].toUpperCase())

const hasImage = computed(() => !hasImageError.value && !!props.image)
const hasTitle = computed(() => !!props.title)

watch(() => props.image, () => {
  hasImageError.value = false
})

function onImageLoadedError () {
  hasImageError.value = true
}
</script>
