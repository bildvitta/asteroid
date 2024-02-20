<template>
  <div class="app-slider-board full-width overflow-hidden relative-position">
    <div ref="slider" class="app-slider-board__container" v-bind="attrs" @mousedown="mouseDown" @mousemove="mouseMove">
      <div class="app-slider-board__content q-px-md">
        <slot />
      </div>
      <slot name="slider-side" />
    </div>
  </div>
</template>

<script setup>
import smoothscroll from 'smoothscroll-polyfill'
import { ref, onMounted, onUnmounted, useAttrs } from 'vue'

defineOptions({ name: 'AppSliderBoard' })

const attrs = useAttrs()

const start = ref(1)
const difference = ref(0)
const drag = ref(false)
const slider = ref(null)

onMounted(() => {
  console.log('xddddddddddddddddddd')
  window.__forceSmoothScrollPolyfill__ = true
  smoothscroll.polyfill()

  window.addEventListener('mouseup', mouseUp)
})

onUnmounted(() => {
  window.removeEventListener('mouseup', mouseUp)
})

function mouseDown (event) {
  event.preventDefault()

  start.value = event.clientX + slider.value.scrollLeft
  difference.value = 0
  drag.value = true
}

function mouseMove (event) {
  event.preventDefault()

  if (!drag.value) {
    return null
  }

  difference.value = start.value - (event.clientX + slider.value.scrollLeft)
  slider.value.scrollLeft += difference.value
}

function mouseUp (event) {
  event.preventDefault()

  let tick = 1
  drag.value = false

  const animate = () => {
    const step = Math.sin(tick)

    if (step <= 0) {
      difference.value = 0
      window.cancelAnimationFrame(animate)
    } else {
      slider.value.scrollLeft += difference.value * step
      tick -= 0.02

      window.requestAnimationFrame(animate)
    }
  }

  animate()
}
</script>

<style lang="scss">
.app-slider-board {
  width: 100%;
  overscroll-behavior-x: none;

  &:after {
    content: '';
    width: 64px;
    height: 100%;
    background: linear-gradient(270deg, $grey-1 0%, rgba(251, 251, 251, 0) 100%);
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
  }

  &__container {
    cursor: grab;
    overflow-x: auto;
    position: relative;
    white-space: nowrap;
    max-height: inherit;
    display: flex;
    padding-bottom: 10px;
    scrollbar-width: thin;
    scrollbar-color: rgba(184, 211, 224, 0.6) transparent;

    &::-webkit-scrollbar {
      height: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(184, 211, 224, 0.6);
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(167, 194, 207, 1);
    }
  }

  &__content {
    display: flex;
  }
}
</style>
