<template>
  <div class="qas-toggle-visibility">
    <div :aria-expanded="isVisible" aria-label="Alternar visibilidade do conteúdo" class="cursor-pointer items-center no-wrap row" role="button" :style @click.prevent.stop="toggleVisibility">
      <div class="ellipsis qas-toggle-visibility__content">
        <div
          v-if="isVisible"
          class="ellipsis full-width"
          :title="props.text"
        >
          <slot>
            {{ props.text }}
          </slot>
        </div>

        <q-separator
          v-else
          size="4px"
        />
      </div>

      <qas-btn class="q-ml-sm qas-toggle-visibility__button" :icon />
    </div>
  </div>
</template>

<script setup>
import { useToggleVisibility } from '../../composables/private'

import { uid } from 'quasar'
import { computed } from 'vue'

defineOptions({ name: 'QasToggleVisibility' })

const props = defineProps({
  group: {
    type: String,
    default: ''
  },

  text: {
    type: String,
    default: ''
  },

  uuid: {
    type: String,
    default: ''
  },

  width: {
    type: String,
    default: '140px'
  }
})

const {
  isVisible,
  toggleVisibility
} = useToggleVisibility({ group: props.group, uuid: props.uuid || uid() })

const icon = computed(() => isVisible.value ? 'sym_r_visibility' : 'sym_r_visibility_off')
const style = computed(() => ({ width: props.width }))
</script>

<style lang="scss">
.qas-toggle-visibility {
  &__content {
    flex-grow: 1;
  }

  &__button {
    flex-grow: 0;
  }
}
</style>
