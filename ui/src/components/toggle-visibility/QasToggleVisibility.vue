<template>
  <div class="items-center no-wrap qas-toggle-visibility row">
    <div class="q-mr-sm">
      <div v-if="isVisible">
        <slot name="hidden">
          {{ props.hiddenText }}
        </slot>
      </div>

      <div v-else aria-label="Elemento de barra que aparece enquanto o conteúdo esta oculto" class="qas-toggle-visibility__hidden" />
    </div>

    <qas-btn color="grey-10" :icon="icon" @click="toggleVisibility" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

defineOptions({ name: 'QasToggleVisibility' })

const props = defineProps({
  hiddenText: {
    type: String,
    default: 'Conteúdo oculto'
  },

  useVisibleOnStart: {
    type: Boolean
  }
})

const isVisible = ref(props.useVisibleOnStart)

const icon = computed(() => isVisible.value ? 'sym_r_visibility' : 'sym_r_visibility_off')

function toggleVisibility () {
  isVisible.value = !isVisible.value
}
</script>

<style lang="scss">
.qas-toggle-visibility {
  &__hidden {
    background-color: $grey-4;
    display: block;
    height: 4px;
    width: 100px;
  }
}
</style>
