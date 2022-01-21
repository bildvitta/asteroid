<template>
  <q-dialog ref="dialog" :model-value="model" :persistent="persistent" @hide="onDialogHide" @update:model-value="updateModelValue">
    <q-card v-bind="cardProps" class="q-pa-sm" :style="style">
      <q-card-section>
        <slot name="header">
          <div class="text-bold text-h6">{{ card.title }}</div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <component :is="componentTag" ref="form">
          <slot name="description">
            <div v-if="card.description">{{ card.description }}</div>
          </slot>
        </component>
      </q-card-section>

      <q-card-section>
        <slot name="actions">
          <qas-actions v-bind="btnActionsProps">
            <template #primary>
              <qas-btn v-if="ok" v-close-popup="!useForm" class="full-width" v-bind="defaultOk.props" v-on="defaultOk.events" @click="submitHandler" />
            </template>
            <template #secondary>
              <qas-btn v-if="cancel" v-close-popup class="full-width" v-bind="defaultCancel.props" v-on="defaultCancel.events" />
            </template>
          </qas-actions>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasActions from '../actions/QasActions.vue'

export default {
  name: 'QasDialog',

  components: {
    QasBtn,
    QasActions
  },

  props: {
    btnActionsProps: {
      default: () => ({}),
      type: Object
    },

    cancel: {
      default: () => ({}),
      type: [Object, Boolean]
    },

    card: {
      default: () => ({}),
      type: Object
    },

    cardProps: {
      default: () => ({}),
      type: Object
    },

    maxWidth: {
      default: '',
      type: String
    },

    minWidth: {
      default: '',
      type: String
    },

    ok: {
      default: () => ({}),
      type: [Object, Boolean]
    },

    persistent: {
      default: true,
      type: Boolean
    },

    useForm: {
      type: Boolean
    },

    modelValue: {
      type: Boolean
    }
  },

  emits: ['update:modelValue', 'validate', 'ok', 'hide', 'update:open'],

  data () {
    return {
      model: false,
      dialogMethods: {
        focus: null,
        hide: null,
        shake: null,
        show: null,
        toggle: null
      }
    }
  },

  computed: {
    defaultCancel () {
      return {
        events: this.cancel?.events,

        props: {
          label: 'Cancelar',
          outline: true,
          ...this.cancel?.props
        }
      }
    },

    defaultDialogMethods () {
      return this.dialogMethods
    },

    defaultOk () {
      return {
        events: this.ok?.events,

        props: {
          label: 'Ok',
          type: this.ok?.props?.type || this.useForm ? 'submit' : 'button',
          ...this.ok?.props
        }
      }
    },

    isSmallScreen () {
      return this.$q.screen.xs
    },

    style () {
      return {
        maxWidth: this.maxWidth || (this.isSmallScreen ? '' : '600px'),
        minWidth: this.minWidth || (this.isSmallScreen ? '' : '400px')
      }
    },

    componentTag () {
      return this.useForm ? 'q-form' : 'div'
    }
  },

  watch: {
    modelValue: {
      handler (value) {
        this.model = value
      },
      immediate: true
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
    },

    async submitHandler () {
      this.useForm && this.$emit('validate', await this.$refs.form.validate())
    },

    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    updateModelValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
