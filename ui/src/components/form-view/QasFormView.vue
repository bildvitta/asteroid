<template>
  <component :is="mx_componentTag" :class="mx_componentClass">
    <header v-if="mx_hasHeaderSlot">
      <slot name="header" />
    </header>

    <q-form ref="form" @submit="submitHandler">
      <slot />

      <slot v-if="useActions" name="actions">
        <div class="justify-end q-col-gutter-md q-my-lg row">
          <div v-if="hasCancelButton" class="col-12 col-sm-2" :class="cancelButtonClass">
            <qas-btn v-close-popup class="full-width" :data-cy="`btnCancel-${entity}`" :disable="isCancelButtonDisabled" :label="cancelButtonLabel" outline type="button" @click="cancel" />
          </div>

          <div v-if="useSubmitButton" class="col-12 col-sm-2" :class="submitButtonClass">
            <qas-btn class="full-width" :data-cy="`btnSave-${entity}`" :disable="disable" :label="submitButtonLabel" :loading="isSubmitting" type="submit" />
          </div>
        </div>
      </slot>
    </q-form>

    <footer v-if="mx_hasFooterSlot">
      <slot name="footer" />
    </footer>

    <qas-dialog v-model="showDialog" v-bind="defaultDialogProps" />

    <q-inner-loading :showing="mx_isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import { isEqualWith } from 'lodash-es'
import { extend } from 'quasar'
import { onBeforeRouteLeave } from 'vue-router'

import { useHistory } from '../../composables'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn.vue'
import QasDialog from '../dialog/QasDialog.vue'

import { viewMixin } from '../../mixins'

export default {
  name: 'QasFormView',

  components: {
    QasBtn,
    QasDialog
  },

  mixins: [viewMixin],

  props: {
    cancelButtonLabel: {
      default: 'Cancelar',
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

    useSubmitButton: {
      default: true,
      type: Boolean
    },

    beforeSubmit: {
      default: null,
      type: Function
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
          title: 'Atenção!',
          description: 'Você está deixando a página e suas alterações serão perdidas. Tem certeza que deseja sair sem salvar?'
        },

        ok: { label: 'Continuar editando' },

        cancel: { label: 'Sair' }
      }
    }
  },

  computed: {
    cancelButtonClass () {
      return this.$qas.screen.isSmall && 'order-last'
    },

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

    submitButtonClass () {
      return this.$qas.screen.isSmall && 'order-first'
    },

    isCancelButtonDisabled () {
      return this.disable || this.isSubmitting
    }
  },

  watch: {
    isSubmitting (value) {
      this.$emit('update:submitting', value)
    }
  },

  created () {
    this.useDialogOnUnsavedChanges && onBeforeRouteLeave(this.beforeRouteLeave)

    window.addEventListener('delete-success', this.setIgnoreRouterGuard)

    this.mx_fetchHandler({ form: true, id: this.id, url: this.fetchURL }, this.fetch)
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

      this.$qas.logger.group(
        'QasFormView - beforeRouteLeave -> dialog chamado, modelValue diferente do cachedResult',
        [{ modelValue: clonedModelValue, cachedResult: clonedCachedResult }]
      )

      this.handleDialog(() => {
        this.ignoreRouterGuard = true
        next()
      })
    },

    cancel () {
      this.handleCancelRoute()
    },

    async fetch (params) {
      this.mx_isFetching = true

      try {
        const payload = { form: true, id: this.id, params, url: this.fetchURL }

        this.$qas.logger.group(
          `QasFormView - fetch -> payload do parâmetro do ${this.entity}/fetchSingle`, [payload]
        )

        const response = await this.$store.dispatch(`${this.entity}/fetchSingle`, payload)

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

        if (result) {
          Object.assign(modelValue, result)
        }

        this.$qas.logger.group(
          `QasFormView - fetch -> resposta da action ${this.entity}/fetchSingle`, [response]
        )

        if (this.useDialogOnUnsavedChanges) {
          this.cachedResult = extend(true, {}, result || modelValue)
          this.$qas.logger.group('QasFormView - fetch -> cachedResult', [this.cachedResult])
        }

        this.$emit('update:modelValue', modelValue)
        this.$emit('fetch-success', response, this.modelValue)

        this.$qas.logger.group('QasFormView - fetch -> modelValue', [modelValue])
      } catch (error) {
        this.mx_fetchError(error)
        this.$emit('fetch-error', error)

        this.$qas.logger.group(
          `QasFormView - fetch -> exceção da action ${this.entity}/fetchSingle`,
          [error],
          { error: true }
        )
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
        if (!firstValue) return

        delete firstValue[key]
        delete secondValue[key]
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
        const payload = { id: this.id, payload: this.modelValue, url: this.url, ...externalPayload }

        this.$qas.logger.group(
          `QasFormView - submit -> payload do ${this.entity}/${this.mode}`, [payload]
        )

        const response = await this.$store.dispatch(`${this.entity}/${this.mode}`, payload)

        if (this.useDialogOnUnsavedChanges) {
          this.cachedResult = extend(true, {}, this.modelValue)
        }

        this.mx_setErrors()
        NotifySuccess(response.data.status.text || 'Item salvo com sucesso!')
        this.$emit('submit-success', response, this.modelValue)

        this.$qas.logger.group(
          `QasFormView - submit -> resposta da action ${this.entity}/${this.mode}`, [response]
        )
      } catch (error) {
        const errors = error?.response?.data?.errors
        const message = error?.response?.data?.status?.text
        const exceptionResponse = error?.response?.data?.exception

        const exception = errors
          ? 'Existem erros de validação no formulário.'
          : exceptionResponse || error.message

        this.mx_setErrors(errors)
        this.$emit('update:errors', this.mx_errors)

        NotifyError(message || 'Ops! Erro ao salvar item.', exception)

        this.$emit('submit-error', error)

        this.$qas.logger.group(
          `QasFormView - fetch -> exceção da action ${this.entity}/${this.mode}`,
          [error],
          { error: true }
        )
      } finally {
        this.isSubmitting = false
      }
    },

    setIgnoreRouterGuard ({ detail: { id, entity } }) {
      this.ignoreRouterGuard = this.id === id && this.entity === entity
    }
  }
}
</script>
