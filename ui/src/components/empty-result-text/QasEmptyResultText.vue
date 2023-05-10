<template>
  <div class="text-body1 text-grey-8">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'QasEmptyResultText',

  props: {
    text: {
      default: 'Não há itens para serem exibidos.',
      type: String
    }
  }
}
</script>
