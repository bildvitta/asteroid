<template>
  <q-icon :color="color" :name="icon" :size="size" @click="showNotify(notifyProps)">
    <q-tooltip v-if="!$_isSmall" anchor="top middle" self="bottom middle">
      <div class="items-center no-wrap row" :style="tooltipStyle">
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

    notifyProps: {
      default: () => ({}),
      type: Object
    },

    size: {
      default: '20px',
      type: String
    },

    width: {
      default: '300px',
      type: String
    }
  },

  computed: {
    tooltipStyle () {
      return {
        width: this.width
      }
    }
  },

  methods: {
    showNotify (attrs) {
      if (this.$_isSmall) {
        this.$q.notify({
          message: this.message,
          ...attrs
        })
      }
    }
  }
}
</script>
