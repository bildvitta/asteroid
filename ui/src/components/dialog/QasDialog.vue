<template>
  <q-dialog ref="dialog" :persistent="persistent" v-bind="dialogProps" @hide="onDialogHide" @update:model-value="updateModelValue">
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

import screenMixin from '../../mixins/screen'

export default {
  name: 'QasDialog',

  components: {
    QasBtn,
    QasActions
  },

  mixins: [screenMixin],

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
    },

    usePlugin: {
      type: Boolean
    }
  },

  emits: ['update:modelValue', 'validate', 'ok', 'hide', 'update:open'],

  data () {
    return {
      model: false
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

    style () {
      return {
        maxWidth: this.maxWidth || (this.$_isSmall ? '' : '600px'),
        minWidth: this.minWidth || (this.$_isSmall ? '' : '400px')
      }
    },

    componentTag () {
      return this.useForm ? 'q-form' : 'div'
    },

    dialogProps () {
      return {
        ...(!this.usePlugin && { modelValue: this.modelValue }),
        ...this.$attrs
      }
    }
  },

  methods: {
    async submitHandler () {
      this.useForm && this.$emit('validate', await this.$refs.form.validate())
    },

    // metodo para funcionar como plugin
    show () {
      this.$refs.dialog.show()
    },

    // metodo para funcionar como plugin
    hide () {
      this.$refs.dialog.hide()
    },

    // metodo para funcionar como plugin
    onDialogHide () {
      this.$emit('hide')
    },

    updateModelValue (value) {
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
