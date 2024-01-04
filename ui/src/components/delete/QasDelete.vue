<template>
  <component v-bind="attributes" :is="props.tag" @click.stop.prevent="onDelete">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>
</template>

<script setup>
import { inject, computed, useAttrs } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'QasDelete',
  inheritAttrs: false
})

const props = defineProps({
  customId: {
    default: '',
    type: [Number, String]
  },

  dialogProps: {
    default: () => ({}),
    type: Object
  },

  entity: {
    required: true,
    type: String
  },

  tag: {
    default: 'qas-btn',
    type: String
  },

  url: {
    default: '',
    type: String
  },

  deleting: {
    type: Boolean
  },

  useAutoDeleteRoute: {
    default: true,
    type: Boolean
  },

  redirectRoute: {
    type: [Object, String],
    default: ''
  }
})

const emits = defineEmits(['success', 'error', 'update:deleting'])

const attrs = useAttrs()
const route = useRoute()

// global
const qas = inject('qas')

const id = computed(() => props.customId || route.params.id)
const isButton = computed(() => props.tag === 'qas-btn')

const attributes = computed(() => {
  return {
    ...attrs,
    color: isButton.value ? 'grey-10' : attrs.color
  }
})

function onDelete () {
  qas.delete({
    deleteActionParams: {
      entity: props.entity,
      id: id.value,
      url: props.url
    },

    dialogProps: props.dialogProps,

    useAutoDeleteRoute: props.useAutoDeleteRoute,

    redirectRoute: props.redirectRoute,

    // callbacks
    onDelete: isDeleting => emits('update:deleting', isDeleting),

    onDeleteError: error => emits('error', error),

    onDeleteSuccess: response => emits('success', response)
  })
}
</script>
