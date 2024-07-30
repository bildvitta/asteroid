<template>
  <div class="qas-form-view" :class="mx_componentClass">
    <header v-if="mx_hasHeaderSlot">
      <slot name="header" />
    </header>

    <q-form ref="form" v-bind="defaultFormProps">
      <slot v-if="mx_canShowErrorSlot" name="error" />

      <slot v-else />

      <slot v-if="useActions" name="actions">
        <qas-actions>
          <template v-if="useSubmitButton" #primary>
            <qas-btn class="qas-form-view__btn" :data-cy="`form-view-submit-btn-${entity}`" :disable="disable" :label="submitButtonLabel" :loading="isSubmitting" type="submit" variant="primary" />
          </template>

          <template v-if="hasCancelButton" #secondary>
            <qas-btn v-close-popup class="qas-form-view__btn" :data-cy="`form-view-cancel-btn-${entity}`" :disable="isSubmitting" :label="cancelButtonLabel" type="button" variant="secondary" @click="cancel" />
          </template>
        </qas-actions>
      </slot>
    </q-form>

    <footer v-if="mx_hasFooterSlot">
      <slot name="footer" />
    </footer>

    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />

    <q-inner-loading :showing="mx_isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </div>
</template>

<script>
import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'

import { NotifyError, NotifySuccess } from '../../plugins'
import { useHistory } from '../../composables'
import { viewMixin } from '../../mixins'

import debug from 'debug'
import { extend } from 'quasar'
import { getAction } from '@bildvitta/store-adapter'
import { isEqualWith } from 'lodash-es'
import { onBeforeRouteLeave } from 'vue-router'

const log = debug('asteroid-ui:qas-form-view')

export default {
  name: 'QasFormView',

  components: {
    QasBtn,
    QasDialog
  },

  mixins: [viewMixin],

  props: {
    beforeSubmit: {
      default: null,
      type: Function
    },

    cancelButtonLabel: {
      default: 'Voltar',
      type: String
    },

    cancelRoute: {
      default: '',
      type: [Boolean, Object, String, Function]
    },

    customId: {
      default: '',
      type: [Number, String]
    },

    disable: {
      type: Boolean
    },

    formProps: {
      type: Object,
      default: () => ({})
    },

    mode: {
      default: 'create',
      type: String
    },

    route: {
      default: () => ({}),
      type: Object
    },

    useDialogOnUnsavedChanges: {
      default: true,
      type: Boolean
    },

    ignoreKeysInUnsavedChanges: {
      default: () => [],
      type: Array
    },

    submitButtonLabel: {
      default: 'Salvar',
      type: String
    },

    modelValue: {
      default: () => ({}),
      type: Object
    },

    submitting: {
      type: Boolean
    },

    useActions: {
      default: true,
      type: Boolean
    },

    useCancelButton: {
      default: true,
      type: Boolean
    },

    useNotifySuccess: {
      type: Boolean,
      default: true
    },

    useSubmitButton: {
      default: true,
      type: Boolean
    }
  },

  emits: [
    'submit-success',
    'submit-error',
    'fetch-success',
    'fetch-error',
    'update:modelValue',
    'update:submitting',
    'update:errors'
  ],

  data () {
    return {
      cachedResult: {},
      isSubmitting: false,
      showDialog: false,
      ignoreRouterGuard: false,

      defaultDialogProps: {
        card: {
          description: 'Você está deixando a página e suas alterações serão perdidas. Tem certeza que deseja sair sem salvar?'
        },

        ok: { label: 'Continuar editando' },

        cancel: { label: 'Sair' }
      }
    }
  },

  computed: {
    fetchURL () {
      return this.url ? (`${this.url}/${this.isCreateMode ? 'new' : 'edit'}`) : ''
    },

    hasCancelButton () {
      return !(typeof this.cancelRoute === 'boolean' && !this.cancelRoute) && this.useCancelButton
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

    defaultNotifyMessages () {
      return {
        validationError: 'Não conseguimos salvar as informações. Por favor, revise os campos e tente novamente.',
        error: 'Não conseguimos salvar as informações. Por favor, tente novamente em alguns minutos.',
        success: 'Informações salvas com sucesso.'
      }
    },

    defaultFormProps () {
      return {
        ...this.formProps,

        onSubmit: event => {
          this.submitHandler(event)
          this.formProps?.onSubmit?.(event)
        }
      }
    }
  },

  watch: {
    isSubmitting (value) {
      this.$emit('update:submitting', value)
    },

    '$route.path' () {
      this.ignoreRouterGuard = false
    }
  },

  created () {
    this.useDialogOnUnsavedChanges && onBeforeRouteLeave(this.beforeRouteLeave)

    window.addEventListener('delete-success', this.setIgnoreRouterGuard)

    this.mx_fetchHandler({ form: true, id: this.id, url: this.fetchURL }, this.fetchSingle)
  },

  onUnmounted () {
    window.removeEventListener('delete-success', this.setIgnoreRouterGuard)
  },

  methods: {
    beforeRouteLeave (to, from, next) {
      const clonedModelValue = extend(true, {}, this.modelValue)
      const clonedCachedResult = extend(true, {}, this.cachedResult)

      /**
       * Se a propriedade "useDialogOnUnsavedChanges" for false ou a variável
       * "ignoreRouterGuard" for true, então **não** iremos checar se o usuário
       * alterou algum campo antes de sair da pagina, senão iremos validar pela função isEqualWith
       * e mostrar um dialog antes do usuário sair da página.
      */
      if (
        !this.useDialogOnUnsavedChanges ||
        this.ignoreRouterGuard ||
        isEqualWith(
          clonedModelValue,
          clonedCachedResult,
          this.handleIgnoreKeysInUnsavedChanges
        )
      ) {
        return next()
      }

      this.handleDialog(() => {
        this.ignoreRouterGuard = true
        next()
      })
    },

    cancel () {
      this.handleCancelRoute()
    },

    async fetchSingle (externalPayload = {}) {
      this.mx_isFetching = true

      try {
        const payload = {
          form: true,
          id: this.id,
          url: this.fetchURL,
          ...externalPayload
        }

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchSingle',
          payload
        })

        const { errors, fields, metadata, result } = response.data

        const modelValue = { ...this.getModelsByFields(fields), ...this.modelValue }

        this.mx_setErrors(errors)
        this.mx_setFields(fields)
        this.mx_setMetadata(metadata)

        this.mx_updateModels({
          errors,
          fields: this.mx_fields,
          metadata
        })

        result && Object.assign(modelValue, result)

        if (this.useDialogOnUnsavedChanges) {
          this.cachedResult = extend(true, {}, result || modelValue)
        }

        this.$emit('update:modelValue', modelValue)
        this.$emit('fetch-success', response, this.modelValue)

        log(`[${this.entity}]:fetchSingle:success`, { response, modelValue })
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)

        log(`[${this.entity}]:fetchSingle:error`, error)
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
      if (typeof this.cancelRoute === 'function') {
        return this.cancelRoute()
      }

      if (this.cancelRoute && ['string', 'object'].includes(typeof this.cancelRoute)) {
        return this.$router.push(this.cancelRoute)
      }

      const [, path] = this.$route.path.split('/')
      const resolvedPath = this.$router.resolve(`/${path}`)

      this.$router.push(resolvedPath)
    },

    handleDialog (next) {
      this.openDialog()

      const { addRoute } = useHistory()

      this.defaultDialogProps.ok.onClick = () => addRoute(this.$route)

      this.defaultDialogProps.cancel.onClick = next
    },

    openDialog () {
      this.showDialog = true
    },

    // ignora chaves na hora de validar quando usuário está saindo da página
    handleIgnoreKeysInUnsavedChanges (firstValue, secondValue) {
      if (!this.ignoreKeysInUnsavedChanges.length) return

      this.ignoreKeysInUnsavedChanges.forEach(key => {
        if (firstValue) delete firstValue[key]

        if (secondValue) delete secondValue[key]
      })
    },

    /**
     * Se existe a propriedade com callback "beforeSubmit", então o controle de quando e como chamar o método "submit"
     * está sendo controlado fora do QasFormView, se não existir a propriedade "beforeSubmit", então o controle do método
     * submit é feito pelo próprio QasFormView, chamado pelo evento @submit.
    */
    submitHandler (event) {
      if (event) {
        event.preventDefault()
      }

      const hasBeforeSubmit = typeof this.beforeSubmit === 'function'

      if (hasBeforeSubmit) {
        return this.beforeSubmit({
          payload: { id: this.id, payload: this.modelValue, url: this.url },
          resolve: payload => this.submit(payload)
        })
      }

      this.submit()
    },

    async submit (externalPayload = {}) {
      if (this.disable) return null

      this.isSubmitting = true

      try {
        const payload = {
          id: this.id,
          payload: this.modelValue,
          url: this.url,
          ...externalPayload
        }

        const response = await getAction.call(this, {
          entity: this.entity,
          key: this.mode,
          payload
        })

        const modelValue = { ...this.modelValue, ...response.data.result }

        if (this.useDialogOnUnsavedChanges) {
          this.cachedResult = extend(true, {}, modelValue)
        }

        this.mx_setErrors()
        this.$emit('update:errors', this.mx_errors)

        this.$emit('update:modelValue', modelValue)
        this.$emit('submit-success', response, this.modelValue)

        this.createSubmitSuccessEvent({ ...payload, entity: this.entity })

        if (this.useNotifySuccess) {
          NotifySuccess(response.data.status.text || this.defaultNotifyMessages.success)
        }

        log(`[${this.entity}]:submit:success`, { response, modelValue })
      } catch (error) {
        const errors = error?.response?.data?.errors
        const message = error?.response?.data?.status?.text
        const hasFieldError = !!Object.keys(errors || {})?.length

        const defaultMessage = hasFieldError
          ? this.defaultNotifyMessages.validationError
          : this.defaultNotifyMessages.error

        this.mx_setErrors(errors)
        this.$emit('update:errors', this.mx_errors)

        NotifyError(message || defaultMessage)

        this.$emit('submit-error', error)

        log(`[${this.entity}]:submit:error`, error)
      } finally {
        this.isSubmitting = false
      }
    },

    createSubmitSuccessEvent (detail = {}) {
      const event = new CustomEvent('submit-success', {
        bubbles: false,
        cancelable: false,
        detail
      })

      window.dispatchEvent(event)
    },

    setIgnoreRouterGuard ({ detail: { id, entity } }) {
      this.ignoreRouterGuard = this.id === id && this.entity === entity
    }
  }
}
</script>

<style lang="scss">
.qas-form-view {
  &__btn {
    min-width: 132px;
    width: 100%;
  }
}
</style>
