<template>
  <div class="qas-grabbable relative-position">
    <div
      ref="grabContainer"
      class="flex no-wrap qas-grabbable__container"
      :class="classes"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { setScrollOnGrab } from '../../helpers'

defineOptions({ name: 'QasGrabbable' })

const emit = defineEmits(['grabbing'])

const grabContainer = ref(null)
const grabPosition = ref(null)
const isGrabbing = ref(false)
const scrollOnGrab = ref({})

const classes = computed(() => (
  [
    {
      grabbing: isGrabbing.value,
      'no-grab': !hasScrollOnGrab.value
    },
    `grab-${grabPosition.value}`
  ]
))

const hasScrollOnGrab = computed(() => !!Object.keys(scrollOnGrab.value).length)

function handleScrollOnGrab () {
  const { scrollWidth, offsetWidth } = grabContainer.value

  if (scrollWidth > offsetWidth) {
    return initScrollOnGrab()
  }

  if (hasScrollOnGrab.value) {
    scrollOnGrab.value.destroyEvents()
    scrollOnGrab.value.element.style.cursor = 'auto'
    scrollOnGrab.value = {}

    grabPosition.value = null
  }
}

function initScrollOnGrab () {
  if (hasScrollOnGrab.value) return

  scrollOnGrab.value = setScrollOnGrab(grabContainer.value, {
    onGrabFn: onGrab,
    onMoveFn: setGrabPosition
  })
}

function onGrab ({ grabbing }) {
  isGrabbing.value = grabbing

  emit('grabbing', grabbing)
}

function setGrab () {
  handleScrollOnGrab()
  setGrabPosition()
}

function setGrabPosition () {
  const { offsetWidth, scrollLeft, scrollWidth } = grabContainer.value

  if (!scrollLeft) {
    grabPosition.value = 'start'
  } else if (scrollLeft + offsetWidth >= scrollWidth) {
    grabPosition.value = 'end'
  } else {
    grabPosition.value = 'middle'
  }
}

onMounted(() => {
  setGrab()

  window.addEventListener('resize', setGrab)
})

onUnmounted(() => {
  window.removeEventListener('resize', setGrab)

  if (!hasScrollOnGrab.value) return

  scrollOnGrab.value.destroyEvents()
})
</script>

<style lang="scss">
.qas-grabbable {
  &__container {
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
    }

    &:not(.no-grab) {
      &:before,
      &:after {
        content: '';
        width: 24px;
        height: 100%;
        position: absolute;
        top: 0;
        pointer-events: none;
      }

      &:before {
        background: linear-gradient(-270deg, rgba($grey-1, 0.7) 0%, rgba(251, 251, 251, 0) 100%);
        left: 0;
      }

      &:after {
        background: linear-gradient(270deg, rgba($grey-1, 0.7) 0%, rgba(251, 251, 251, 0) 100%);
        right: 0;
      }

      &.grab-start {
        &:before {
          content: none;
        }
      }

      &.grab-end {
        &:after {
          content: none;
        }
      }
    }

    &.grabbing {
      * {
        pointer-events: none;
        user-select: none;
      }
    }
  }
}
</style>
