<template>
  <q-dialog ref="dialog" v-model="model" v-bind="$attrs" :persistent="persistent" v-on="$listeners">
    <q-card v-bind="cardProps" class="q-pa-sm" :style="style">
      <q-card-section>
        <slot name="header">
          <div class="text-bold text-h6">{{ card.title }}</div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="description">
          <div v-if="card.description">{{ card.description }}</div>
        </slot>
      </q-card-section>

      <q-card-section>
        <slot name="actions">
          <qas-btn-actions v-bind="btnActions">
            <template #primary>
              <qas-btn v-if="ok" v-close-popup class="full-width" v-bind="defaultOk.props" v-on="defaultOk.events" />
            </template>
            <template #secondary>
              <qas-btn v-if="cancel" v-close-popup class="full-width" v-bind="defaultCancel.props" v-on="defaultCancel.events" />
            </template>
          </qas-btn-actions>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import QasBtnActions from '../btn-actions/QasBtnActions.vue'
import QasBtn from '../btn/QasBtn.vue'

export default {
  components: {
    QasBtnActions,
    QasBtn
  },

  props: {
    value: {
      type: Boolean
    },

    persistent: {
      type: Boolean,
      default: true
    },

    card: {
      type: Object,
      default: () => ({})
    },

    maxWidth: {
      type: String,
      default: ''
    },

    minWidth: {
      type: String,
      default: ''
    },

    ok: {
      type: [Object, Boolean],
      default: () => ({})
    },

    cancel: {
      type: [Object, Boolean],
      default: () => ({})
    },

    cardProps: {
      type: Object,
      default: () => ({})
    },

    btnActions: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      dialogMethods: {
        show: null,
        hide: null,
        toggle: null,
        focus: null,
        shake: null
      }
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        return this.$emit('input', value)
      }
    },

    defaultOk () {
      return {
        props: {
          label: 'Ok',
          ...this.ok?.props
        },

        events: this.ok?.events
      }
    },

    defaultCancel () {
      return {
        props: {
          label: 'Cancelar',
          outline: true,
          ...this.cancel?.props
        },

        events: this.cancel?.events
      }
    },

    defaultDialogMethods () {
      return this.dialogMethods
    },

    isSmallScreen () {
      return this.$q.screen.xs
    },

    style () {
      return {
        maxWidth: this.maxWidth || (this.isSmallScreen ? '' : '600px'),
        minWidth: this.minWidth || (this.isSmallScreen ? '' : '400px')
      }
    }
  },

  mounted () {
    this.setDialogMethods()
  },

  methods: {
    setDialogMethods () {
      for (const key in this.dialogMethods) {
        this.dialogMethods[key] = this.$refs.dialog[key]
      }
    }
  }
}
</script>
