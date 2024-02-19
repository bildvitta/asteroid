<template>
  <div
    ref="qasGrabbable"
    class="flex no-wrap qas-grabbable"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { setScrollOnGrab } from '../../helpers'

defineOptions({ name: 'QasGrabbable' })

const emit = defineEmits(['grabbing'])

const qasGrabbable = ref(null)
const scrollOnGrab = ref({})
const isGrabbing = ref(false)

const classes = computed(() => {
  return {
    grabbing: isGrabbing.value
  }
})

function onGrab ({ grabbing }) {
  isGrabbing.value = grabbing

  emit('grabbing', grabbing)
}

onMounted(() => {
  scrollOnGrab.value = setScrollOnGrab(qasGrabbable.value, {
    onGrabFn: onGrab
  })
})

onUnmounted(() => {
  scrollOnGrab.value.destroyEvents()
})
</script>

<style lang="scss">
.qas-grabbable {
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }

  &.grabbing {
    * {
      pointer-events: none;
      user-select: none;
    }
  }
}
</style>
