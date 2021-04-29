<template>
  <q-icon :color="color" :name="icon" :size="size" @click="showMobileNotify(mobileMessageProps)">
    <q-tooltip v-if="!$_isSmall" anchor="top middle" self="bottom middle">
      <div class="no-wrap row">
        <q-icon v-if="messageIcon" :name="messageIcon" :size="messageIconSize" />
        <div class="q-ml-sm text-subtitle2">{{ message }}</div>
      </div>
    </q-tooltip>
  </q-icon>
</template>

<script>
import screen from '../../mixins/screen.js'

export default {
  mixins: [screen],

  props: {
    color: {
      default: 'primary',
      type: String
    },

    icon: {
      default: '',
      type: String,
      required: true
    },

    message: {
      default: '',
      type: String,
      required: true
    },

    messageIcon: {
      default: '',
      type: String
    },

    messageIconSize: {
      default: '20px',
      type: String
    },

    mobileMessageProps: {
      default: () => ({}),
      type: Object
    },

    size: {
      default: '20px',
      type: String
    }
  },

  methods: {
    showMobileNotify (attrs) {
      if (this.$_isSmall) {
        this.$q.notify({
          ...attrs
        })
      }
    }
  }
}
</script>
