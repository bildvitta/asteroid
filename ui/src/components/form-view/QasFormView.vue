<template>
  <component :is="mx_componentTag">
    <header v-if="mx_hasHeaderSlot">
      <slot :errors="$data.mx_errors" :fields="$data.mx_fields" :metadata="$data.mx_metadata" name="header" />
    </header>

    <q-form ref="form" @submit="submit">
      <slot :errors="$data.mx_errors" :fields="$data.mx_fields" :metadata="$data.mx_metadata" />

      <slot v-if="!readOnly" :errors="$data.mx_errors" :fields="$data.mx_fields" :metadata="$data.mx_metadata" name="actions">
        <div class="justify-end q-col-gutter-md q-my-lg row">
          <div v-if="hasCancelButton" class="col-12 col-sm-2" :class="cancelButtonClass">
            <qas-btn v-close-popup="dialog" class="full-width" :data-cy="`btnCancel-${entity}`" :disable="isCancelButtonDisabled" :label="cancelButton" outline type="button" @click="cancel" />
          </div>
          <div class="col-12 col-sm-2" :class="saveButtonClass">
            <qas-btn class="full-width" :data-cy="`btnSave-${entity}`" :disable="disable" :label="submitButton" :loading="isSubmiting" type="submit" />
          </div>
        </div>
      </slot>
    </q-form>

    <footer v-if="mx_hasFooterSlot">
      <slot :errors="$data.mx_errors" :fields="$data.mx_fields" :metadata="$data.mx_metadata" name="footer" />
    </footer>

    <qas-dialog v-model="showDialog" v-bind="dialogConfig" />

    <q-inner-loading :showing="$data.mx_isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import { get, isEqual, cloneDeep } from 'lodash'
import { extend } from 'quasar'

// import { handleHistory } from '../../helpers/historyHandler'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'

import { viewMixin } from '../../mixins'

export default {
  components: {
    QasBtn,
    QasDialog
  },

  mixins: [viewMixin],

  props: {
    cancelButton: {
      default: 'Cancelar',
      type: String
    },

    cancelRoute: {
      default: '',
      type: [Boolean, Object, String]
    },

    customId: {
      default: '',
      type: [Number, String]
    },

    disable: {
      type: Boolean
    },

    mode: {
      default: 'create',
      type: String
    },

    readOnly: {
      type: Boolean
    },

    route: {
      default: () => ({}),
      type: Object
    },

    showDialogOnUnsavedChanges: {
      default: true,
      type: Boolean
    },

    submitButton: {
      default: 'Salvar',
      type: String
    },

    modelValue: {
      default: () => ({}),
      type: Object
    },

    fieldsModel: {
      default: () => ({}),
      type: Object
    },

    errorsModel: {
      default: () => ({}),
      type: Object
    },

    metadataModel: {
      default: () => ({}),
      type: Object
    }
  },

  emits: [
    'submit-success',
    'submit-error',
    'fetch-success',
    'fetch-error',
    'update:modelValue',
    'update:fieldsModel',
    'update:errorsModel',
    'update:metadataModel',
    'update:isFetchingModel'
  ],

  data () {
    return {
      cachedResult: {},
      hasResult: false,
      isSubmiting: false,
      showDialog: false,

      dialogConfig: {
        card: {
          title: 'Atenção!',
          description: 'Você está deixando a página e suas alterações serão perdidas. Tem certeza que deseja sair sem salvar?'
        },

        ok: {
          props: { label: 'Continuar editando' },
          events: null
        },

        cancel: {
          props: { label: 'Sair' },
          events: null
        }
      }
    }
  },

  computed: {
    cancelButtonClass () {
      return this.isMobile && 'order-last'
    },

    fetchURL () {
      return this.url ? (`${this.url}/${this.isCreateMode ? 'new' : 'edit'}`) : ''
    },

    hasCancelButton () {
      return !(typeof this.cancelRoute === 'boolean' && !this.cancelRoute)
    },

    id () {
      return this.customId || this.resolvedRoute.params.id
    },

    isCreateMode () {
      return this.mode === 'create'
    },

    isMobile () {
      return this.$q.screen.xs
    },

    resolvedRoute () {
      if (this.route && Object.keys(this.route).length) {
        return this.route
      }

      return this.$route
    },

    saveButtonClass () {
      return this.isMobile && 'order-first'
    },

    isCancelButtonDisabled () {
      return this.disable || this.isSubmiting
    }
  },

  watch: {
    '$data.mx_fields': {
      handler (fields) {
        const models = { ...this.getModelsByFields(fields), ...this.modelValue }
        console.log('cai no fields', models)
        this.$emit('update:modelValue', models)

        if (!this.hasResult && this.showDialogOnUnsavedChanges) {
          this.cachedResult = cloneDeep(models)
        }
      },
      immediate: true
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    beforeRouteLeave (to, from, next, fromDelete) {
      if (!this.showDialogOnUnsavedChanges) {
        return null
      }

      if (fromDelete || isEqual(this.modelValue, this.cachedResult)) {
        return next()
      }

      this.handleDialog(next)
    },

    cancel () {
      if (!this.dialog) {
        this.handleCancelRoute()
      }
    },

    async fetch (params) {
      this.mx_isFetching = true

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/fetchSingle`, { form: true, id: this.id, params, url: this.fetchURL }
        )

        const { errors, fields, metadata, result } = response.data

        this.mx_setErrors(errors)
        console.log('🚀 ~ file: QasFormView.vue ~ line 249 ~ fetch ~ errors', errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.handleModels({ errorsModel: errors, fieldsModel: this.mx_fields, metadataModel: metadata })
        // this.$emit('update:fieldsModel', fields)

        if (result) {
          this.hasResult = true
          this.$emit('update:modelValue', { ...this.modelValue, ...result })
          this.cachedResult = this.showDialogOnUnsavedChanges && extend(true, {}, result)
        }

        this.$emit('fetch-success', response, this.modelValue)
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.mx_isFetching = false
      }
    },

    getModelsByFields (fields) {
      const models = {}

      for (const field in fields) {
        models[field] = fields[field].default
      }

      return models
    },

    handleCancelRoute () {
      if (this.cancelRoute) {
        return this.$router.push(this.cancelRoute)
      }

      const [, path] = this.$route.path.split('/')
      const resolvedPath = this.$router.resolve(`/${path}`).route.path

      this.$router.push(resolvedPath)
    },

    handleDialog (fn) {
      this.openDialog()

      // this.dialogConfig.ok.events = { click: () => handleHistory().push(this.$route) }
      this.dialogConfig.cancel.events = { click: fn }
    },

    openDialog () {
      this.showDialog = true
    },

    handleModels (models) {
      for (const key in models) {
        console.log(`update:${key}`, models[key])
        this.$emit(`update:${key}`, models[key])
      }
    },

    async submit (event) {
      if (event) {
        event.preventDefault()
      }

      if (this.disable || this.readyOnly) {
        return null
      }

      this.isSubmiting = true

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/${this.mode}`,
          { id: this.id, payload: this.modelValue, url: this.url }
        )

        if (this.showDialogOnUnsavedChanges) {
          this.cachedResult = cloneDeep(this.modelValue)
        }

        this.mx_setErrors()
        NotifySuccess(response.data.status.text || 'Item salvo com sucesso!')
        this.$emit('submit-success', response, this.modelValue)
      } catch (error) {
        const errors = get(error, 'response.data.errors')
        const message = get(error, 'response.data.status.text')

        const exception = errors
          ? 'Existem erros de validação no formulário.'
          : get(error, 'response.data.exception') || error.message

        this.mx_setErrors(errors)
        this.$emit('update:errorsModel', this.mx_errors)
        NotifyError(message || 'Ops! Erro ao salvar item.', exception)

        this.$emit('submit-error', error)
      } finally {
        this.isSubmiting = false
      }
    }
  }
}
</script>
