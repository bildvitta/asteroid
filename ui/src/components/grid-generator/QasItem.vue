<template>
  <div>
    <header class="text-caption">
      <slot name="header">
        {{ props.label }}
      </slot>
    </header>

    <div class="text-body1 text-grey-10">
      <slot name="content">
        {{ props.value }}
      </slot>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'QasItem' })

const props = defineProps({
  label: {
    type: String,
    default: ''
  },

  value: {
    type: [String, Number, Boolean],
    default: ''
  }
})
</script>
