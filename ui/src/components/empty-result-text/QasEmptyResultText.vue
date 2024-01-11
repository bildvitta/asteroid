<template>
  <div class="text-body1 text-grey-8">
    <slot>
      {{ props.text }}
    </slot>
  </div>
</template>

<script setup>
defineOptions({ name: 'QasEmptyResultText' })

const props = defineProps({
  text: {
    default: 'Não há itens para serem exibidos.',
    type: String
  }
})
</script>
