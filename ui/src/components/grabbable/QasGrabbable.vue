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
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { setScrollOnGrab } from '../../helpers'

defineOptions({ name: 'QasGrabbable' })

const props = defineProps({
  useScrollBar: {
    type: Boolean
  }
})

const emit = defineEmits(['grabbing'])

const grabContainer = ref(null)
const grabPosition = ref(null)
const isGrabbing = ref(false)
const scrollOnGrab = ref({})

const classes = computed(() => {
  const baseClass = 'qas-grabbable__container'

  return [
    {
      [`${baseClass}--grabbing`]: isGrabbing.value,
      [`${baseClass}--no-grab`]: !hasScrollOnGrab.value,
      [`${baseClass}--no-scroll`]: !props.useScrollBar
    },
    `${baseClass}--grab-${grabPosition.value}`
  ]
})

const hasScrollOnGrab = computed(() => !!Object.keys(scrollOnGrab.value).length)

function handleScrollOnGrab () {
  const { scrollWidth, offsetWidth } = grabContainer.value

  if (scrollWidth > offsetWidth) {
    initScrollOnGrab()
    initEvents()
    setGrabPosition()

    return
  }

  destroyEventsAndResetGrab()
}

function initScrollOnGrab () {
  if (hasScrollOnGrab.value) return

  scrollOnGrab.value = setScrollOnGrab(grabContainer.value, {
    onGrabFn: onGrab,
    onMoveFn: setGrabPosition
  })
}

function initEvents () {
  grabContainer.value.addEventListener('scroll', setGrabPosition)
}

function destroyEventsAndResetGrab () {
  if (!hasScrollOnGrab.value) return

  grabContainer.value.removeEventListener('scroll', setGrabPosition)

  scrollOnGrab.value.destroyEvents()
  scrollOnGrab.value.element.style.cursor = 'auto'
  scrollOnGrab.value = {}

  grabPosition.value = null
}

function onGrab ({ isGrabbing: grabbing }) {
  isGrabbing.value = grabbing

  emit('grabbing', grabbing)
}

function setGrabPosition () {
  const { offsetWidth, scrollLeft, scrollWidth } = grabContainer.value
  const offset = 16

  if (scrollLeft <= offset) {
    grabPosition.value = 'start'
  } else if (scrollLeft + offsetWidth + offset >= scrollWidth) {
    grabPosition.value = 'end'
  } else {
    grabPosition.value = 'middle'
  }
}

onMounted(() => {
  handleScrollOnGrab()

  window.addEventListener('resize', handleScrollOnGrab)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleScrollOnGrab)

  destroyEventsAndResetGrab()
})
</script>

<style lang="scss">
.qas-grabbable {
  &__container {
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    overflow-x: auto;
    scrollbar-color: $grey-4 transparent;

    &::-webkit-scrollbar {
      height: 12px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $grey-4;
      border-radius: var(--qas-generic-border-radius);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: $grey-5;
    }

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
      left: -5px;
    }

    &:after {
      background: linear-gradient(270deg, rgba($grey-1, 0.7) 0%, rgba(251, 251, 251, 0) 100%);
      right: -5px;
    }

    &--no-scroll {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        width: 0;
      }
    }

    &--no-grab:before,
    &--no-grab:after,
    &--grab-start:before,
    &--grab-end:after {
      content: none !important;
    }
  }
}
</style>
