<template>
  <div
    v-if="show"
    class="bg-dark flex justify-between no-wrap q-pa-md qas-alert relative-position"
  >
    <div class="qas-alert__border-left" :class="borderClass" />

    <div class="text-body1 text-white">
      <slot>
        {{ text }}
      </slot>
    </div>

    <qas-btn
      class="q-ml-xs qas-alert__close"
      color="white"
      icon="sym_r_close"
      :use-hover-on-white-color="false"
      @click="close"
    />
  </div>
</template>

<script setup>
import { LocalStorage } from 'quasar'
import { Status, StatusColor } from '../../enums/Status'
import { computed, watch, ref } from 'vue'

defineOptions({ name: 'QasAlert' })

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },

  text: {
    type: String,
    default: ''
  },

  storageKey: {
    type: String,
    default: ''
  },

  status: {
    type: String,
    default: Status.Info,
    validator: value => Object.values(Status).includes(value)
  },

  usePersistentModelOnClose: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue)

watch(() => props.modelValue, value => {
  model.value = value
})

const colorByStatus = computed(() => {
  const status = Object.keys(Status).find(key => Status[key] === props.status)
  return StatusColor[status]
})

const borderClass = computed(() => `bg-${colorByStatus.value}`)

const storageClosedKey = computed(() => `alert-${props.storageKey}-closed`)

const isClosed = computed(() => {
  return props.usePersistentModelOnClose && LocalStorage.getItem(storageClosedKey.value)
})

const show = computed(() => !isClosed.value && model.value)

function close () {
  if (props.usePersistentModelOnClose) {
    LocalStorage.set(storageClosedKey.value, true)
  }

  model.value = false

  emit('update:modelValue', model.value)
}

</script>

<style lang="scss">
.qas-alert {
  border-radius: var(--qas-generic-border-radius);

  &__border-left {
    border-radius: var(--qas-generic-border-radius) 0 0 var(--qas-generic-border-radius);
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    width: 4px;
  }

  &__close {
    top: calc(var(--qas-spacing-sm) * -1);
  }
}
</style>
