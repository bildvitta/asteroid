<template>
  <component :is="componentTag">
    <header v-if="hasHeaderSlot">
      <slot :errors="errors" :fields="fields" :metadata="metadata" name="header" />
    </header>

    <q-form ref="form" @submit="submit">
      <slot :errors="errors" :fields="fields" :metadata="metadata" />

      <slot v-if="!readOnly" :errors="errors" :fields="fields" :metadata="metadata" name="actions">
        <div class="justify-end q-col-gutter-md q-my-lg row">
          <div v-if="hasCancelButton" class="col-12 col-sm-2" :class="cancelButtonClass">
            <qas-btn v-close-popup="dialog" class="full-width" :data-cy="`btnCancel-${entity}`" :disable="disableCancelButton" :label="cancelButton" outline type="button" @click="cancel" />
          </div>
          <div class="col-12 col-sm-2" :class="saveButtonClass">
            <qas-btn class="full-width" :data-cy="`btnSave-${entity}`" :disable="disable" :label="submitButton" :loading="isSubmiting" type="submit" />
          </div>
        </div>
      </slot>
    </q-form>

    <footer v-if="hasFooterSlot">
      <slot :errors="errors" :fields="fields" :metadata="metadata" name="footer" />
    </footer>

    <qas-dialog v-model="showDialog" v-bind="dialogConfig" />

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </component>
</template>

<script>
import { get, isEqual, cloneDeep } from 'lodash'
import { extend } from 'quasar'

import { handleHistory } from '../../helpers/historyHandler'
import { NotifyError, NotifySuccess } from '../../plugins'

import QasBtn from '../btn/QasBtn'
import QasDialog from '../dialog/QasDialog'

import viewMixin from '../../mixins/view'

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

    value: {
      default: () => ({}),
      type: Object
    }
  },

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

    disableCancelButton () {
      return this.disable || this.isSubmitting
    }
  },

  watch: {
    fields (fields) {
      const models = { ...this.getModelsByFields(fields), ...this.value }
      this.$emit('input', models)

      if (!this.hasResult && this.showDialogOnUnsavedChanges) {
        this.cachedResult = cloneDeep(models)
      }
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    beforeRouteLeave (to, from, next) {
      if (!this.showDialogOnUnsavedChanges) {
        return null
      }

      if (isEqual(this.value, this.cachedResult)) {
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
      this.isFetching = true

      try {
        const response = await this.$store.dispatch(
          `${this.entity}/fetchSingle`, { form: true, id: this.id, params, url: this.fetchURL }
        )

        const { errors, fields, metadata, result } = response.data

        this.setErrors(errors)
        this.setFields(fields)
        this.setMetadata(metadata)

        if (result) {
          this.hasResult = true
          this.$emit('input', { ...this.value, ...result })
          this.cachedResult = this.showDialogOnUnsavedChanges && extend(true, {}, result)
        }

        this.$emit('fetch-success', response, this.value)
      } catch (error) {
        this.fetchError(error)
        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
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

      this.dialogConfig.ok.events = { click: () => handleHistory().push(this.$route) }
      this.dialogConfig.cancel.events = { click: fn }
    },

    openDialog () {
      this.showDialog = true
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
          { id: this.id, payload: this.value, url: this.url }
        )

        if (this.showDialogOnUnsavedChanges) {
          this.cachedResult = cloneDeep(this.value)
        }

        this.setErrors()
        NotifySuccess(response.data.status.text || 'Item salvo com sucesso!')
        this.$emit('submit-success', response, this.value)
      } catch (error) {
        const errors = get(error, 'response.data.errors')
        const message = get(error, 'response.data.status.text')

        const exception = errors
          ? 'Existem erros de validação no formulário.'
          : get(error, 'response.data.exception') || error.message

        this.setErrors(errors)
        NotifyError(message || 'Ops! Erro ao salvar item.', exception)

        this.$emit('submit-error', error)
      } finally {
        this.isSubmiting = false
      }
    }
  }
}
</script>
