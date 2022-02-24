<template>
  <component :is="mx_componentTag">
    <header v-if="mx_hasHeaderSlot">
      <slot :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" name="header" />
    </header>

    <q-form ref="form" @submit="submit">
      <slot :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" />

      <slot v-if="!readOnly" :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" name="actions">
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
      <slot :errors="mx_errors" :fields="mx_fields" :metadata="mx_metadata" name="footer" />
    </footer>

    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />

    <q-inner-loading :showing="mx_isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import { isEqualWith } from 'lodash'
import { extend } from 'quasar'
import { onBeforeRouteLeave } from 'vue-router'

// import { handleHistory } from '../../helpers/historyHandler'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'

import { viewMixin, screenMixin } from '../../mixins'

export default {
  name: 'QasFormView',

  components: {
    QasBtn,
    QasDialog
  },

  mixins: [viewMixin, screenMixin],

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

    ignoreKeysInUnsavedChanges: {
      default: () => [],
      type: Array
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
    },

    fetchingModel: {
      type: Boolean
    },

    submitingModel: {
      type: Boolean
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
    'update:fetchingModel',
    'update:submitingModel'
  ],

  data () {
    return {
      cachedResult: {},
      hasResult: false,
      isSubmiting: false,
      showDialog: false,
      ignoreRouterGuard: false,

      defaultDialogProps: {
        card: {
          title: 'Atenção!',
          description: 'Você está deixando a página e suas alterações serão perdidas. Tem certeza que deseja sair sem salvar?'
        },

        ok: { props: { label: 'Continuar editando' } },

        cancel: { props: { label: 'Sair' } }
      }
    }
  },

  computed: {
    cancelButtonClass () {
      return this.mx_isSmall && 'order-last'
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

    resolvedRoute () {
      if (this.route && Object.keys(this.route).length) {
        return this.route
      }

      return this.$route
    },

    saveButtonClass () {
      return this.mx_isSmall && 'order-first'
    },

    isCancelButtonDisabled () {
      return this.disable || this.isSubmiting
    }
  },

  watch: {
    mx_fields (fields) {
      const models = { ...this.getModelsByFields(fields), ...this.modelValue }

      if (!this.hasResult && this.showDialogOnUnsavedChanges) {
        this.cachedResult = extend(true, {}, models)
      }
    },

    isSubmiting (value) {
      this.$emit('update:submitingModel', value)
    }
  },

  created () {
    onBeforeRouteLeave(this.beforeRouteLeave)
    window.addEventListener('delete-success', this.setIgnoreRouterGuard)
    this.fetch()
  },

  onUnmounted () {
    window.removeEventListener('delete-success', this.setIgnoreRouterGuard)
  },

  methods: {
    beforeRouteLeave (to, from, next) {
      if (
        !this.showDialogOnUnsavedChanges ||
        this.ignoreRouterGuard ||
        isEqualWith(this.modelValue, this.cachedResult, this.handleIgnoreKeysInUnsavedChanges)
      ) {
        return next()
      }

      this.handleDialog(() => {
        this.ignoreRouterGuard = true
        next()
      })
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
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errorsModel: errors,
          fieldsModel: this.mx_fields,
          metadataModel: metadata
        })

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
      const acceptTypes = ['string', 'object']

      if (this.cancelRoute && acceptTypes.includes(typeof this.cancelRoute)) {
        return this.$router.push(this.cancelRoute)
      }

      const [, path] = this.$route.path.split('/')
      const resolvedPath = this.$router.resolve(`/${path}`)

      this.$router.push(resolvedPath)
    },

    handleDialog (next) {
      this.openDialog()

      // this.defaultDialogProps.ok.events = { click: () => handleHistory().push(this.$route) }
      this.defaultDialogProps.cancel.props.onClick = next
    },

    openDialog () {
      this.showDialog = true
    },

    // ignora chaves na hora de validar quando usuário está saindo da página
    handleIgnoreKeysInUnsavedChanges (firstValue, secondValue) {
      if (!this.ignoreKeysInUnsavedChanges.length) return

      this.ignoreKeysInUnsavedChanges.forEach(key => {
        delete firstValue[key]
        delete secondValue[key]
      })
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
          this.cachedResult = extend(true, {}, this.modelValue)
        }

        this.mx_setErrors()
        NotifySuccess(response.data.status.text || 'Item salvo com sucesso!')
        this.$emit('submit-success', response, this.modelValue)
      } catch (error) {
        const errors = error?.response?.data?.errors
        const message = error?.response?.data?.status?.text
        const exceptionResponse = error?.response?.data?.exception
        const exception = errors ? 'Existem erros de validação no formulário.' : exceptionResponse || error.message

        this.mx_setErrors(errors)
        this.$emit('update:errorsModel', this.mx_errors)

        NotifyError(message || 'Ops! Erro ao salvar item.', exception)

        this.$emit('submit-error', error)
      } finally {
        this.isSubmiting = false
      }
    },

    setIgnoreRouterGuard ({ detail: { id, entity } }) {
      this.ignoreRouterGuard = this.id === id && this.entity === entity
    }
  }
}
</script>
