<template>
  <div class="qas-toggle-visibility">
    <div class="cursor-pointer items-center no-wrap row" role="button" :style tabindex="0" @click.prevent.stop="toggleVisibility" @keydown.enter.prevent="toggleVisibility">
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

      <qas-btn class="q-ml-sm qas-toggle-visibility__button" :icon tabindex="-1" />
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
