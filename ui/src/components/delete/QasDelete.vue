<template>
  <component v-bind="attributes" :is="tag" @click.stop="onDelete">
    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </component>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'

export default {
  name: 'QasDelete',

  components: {
    QasBtn
  },

  inheritAttrs: false,

  props: {
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
    }
  },

  emits: [
    'success',
    'error',
    'update:deleting'
  ],

  computed: {
    attributes () {
      return {
        ...this.$attrs,
        color: this.isButton ? 'grey-9' : this.$attrs.color
      }
    },

    id () {
      return this.customId || this.$route.params.id
    },

    isButton () {
      return this.tag === 'qas-btn'
    }
  },

  methods: {
    onDelete () {
      this.$qas.delete({
        deleteActionParams: {
          entity: this.entity,
          id: this.id,
          url: this.url
        },

        dialogProps: this.dialogProps,

        useAutoDeleteRoute: this.useAutoDeleteRoute,

        // callbacks
        onDelete: isDeleting => this.$emit('update:deleting', isDeleting),

        onDeleteError: error => this.$emit('error', error),

        onDeleteSuccess: response => this.$emit('success', response)
      })
    }
  }
}
</script>
