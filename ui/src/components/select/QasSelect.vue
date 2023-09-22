<template>
  <q-select v-model="model" class="qas-select" v-bind="attributes">
    <template v-if="isSearchable" #prepend>
      <q-icon name="sym_r_search" />
    </template>

    <template #no-option>
      <slot v-if="!mx_isFetching" name="no-option">
        <q-item>
          <q-item-section class="text-grey">
            {{ noOptionLabel }}
          </q-item-section>
        </q-item>
      </slot>
    </template>

    <template #after-options>
      <slot v-if="mx_isFetching" name="after-options">
        <div class="flex justify-center q-pb-sm">
          <q-spinner-dots color="primary" size="20px" />
        </div>
      </slot>
    </template>

    <template v-if="attributes.useChips" #selected-item="{ opt, tabindex, index, removeAtIndex }">
      <q-chip
        class="q-px-sm q-py-xs"
        color="light-blue-2"
        dense
        :disable="attributes.disable"
        icon-remove="sym_r_close"
        :label="opt.label"
        removable
        square
        :tabindex="tabindex"
        text-color="grey-9"
        @remove="removeAtIndex(index)"
      />
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-select>
</template>

<script>
import { getRequiredLabel } from '../../helpers'
import { uid } from 'quasar'
import { searchFilterMixin } from '../../mixins'
import Fuse from 'fuse.js'
import fuseConfig from '../../shared/fuse-config'

export default {
  name: 'QasSelect',

  mixins: [searchFilterMixin],

  inheritAttrs: false,

  props: {
    fuseOptions: {
      default: () => ({}),
      type: Object
    },

    label: {
      type: String,
      default: ''
    },

    modelValue: {
      default: () => [],
      type: [Array, Object, String, Number, Boolean]
    },

    noOptionLabel: {
      default: 'Nenhum resultado foi encontrado.',
      type: String
    },

    options: {
      default: () => [],
      type: Array
    },

    required: {
      type: Boolean
    },

    useFetchOptionsOnCreate: {
      default: true,
      type: Boolean
    },

    useSearch: {
      type: Boolean,
      default: undefined
    }
  },

  emits: ['popup-hide', 'popup-show', 'update:modelValue', 'virtual-scroll'],

  data () {
    return {
      fuse: null,
      isPopupContentOpen: false
    }
  },

  computed: {
    attributes () {
      return {
        class: this.componentClass,
        clearable: this.isSearchable,
        dense: true,
        dropdownIcon: 'sym_r_expand_more',
        clearIcon: 'sym_r_close',
        emitValue: true,
        mapOptions: true,
        popupContentClass: this.popupContentClass,

        ...this.$attrs,

        label: this.formattedLabel,
        error: this.hasError,
        loading: this.hasLoading,
        options: this.mx_filteredOptions,
        inputDebounce: this.useLazyLoading ? 1200 : 0,
        useInput: this.isSearchable,
        useChips: this.$attrs.multiple && this.isPopupContentOpen,

        onPopupHide: this.onPopupHide,
        onPopupShow: this.onPopupShow,

        ...(this.isSearchable && { onFilter: this.onFilter }),

        ...(this.useLazyLoading && { onVirtualScroll: this.mx_onVirtualScroll })
      }
    },

    componentClass () {
      return {
        'qas-select--closed': !this.isPopupContentOpen,
        'qas-select--loading': this.hasLoading
      }
    },

    defaultFuseOptions () {
      return {
        ...fuseConfig,
        keys: ['label', 'value'],

        ...this.fuseOptions
      }
    },

    isSearchable () {
      return this.hasFuse || this.useLazyLoading
    },

    hasError () {
      return this.mx_hasFetchError || this.$attrs.error
    },

    hasLoading () {
      return this.mx_isFetching || this.$attrs.loading
    },

    hasFuse () {
      // se for "undefined" (default) cai na logica por quantidade da option
      if (this.useSearch === false) return false

      /*
      * quantidade de option que precisa ter para o fuse funcionar automaticamente
      * sem necessidade de passar prop manualmente
      */
      const autoFuseQuantity = 10
      const hasAutoFuseSearch = this.options.length >= autoFuseQuantity && !this.useLazyLoading

      return hasAutoFuseSearch
    },

    model: {
      get () {
        return this.modelValue
      },

      set (value) {
        this.$emit('update:modelValue', value)
      }
    },

    popupContentClass () {
      return `qas-select__popup-content-${uid()}`
    },

    formattedLabel () {
      return getRequiredLabel({ label: this.label, required: this.required })
    }
  },

  watch: {
    defaultFuseOptions () {
      if (this.hasFuse) this.setFuse()
    },

    mx_isFetching (value) {
      if (!this.isPopupContentOpen || !this.useLazyLoading) return

      this.togglePopupContentClass(value)
    },

    options: {
      handler () {
        if (this.useLazyLoading && this.mx_hasFilteredOptions) return

        if (this.fuse || this.hasFuse) this.setFuse()

        this.mx_filteredOptions = this.options
      },

      immediate: true
    }
  },

  created () {
    this.setSearchMethod()
  },

  methods: {
    setFuse () {
      this.fuse = new Fuse(this.options, this.defaultFuseOptions)
    },

    async onFilter (value, update) {
      if (this.useLazyLoading && value !== this.mx_search) {
        await this.mx_filterOptionsByStore(value)
      }

      if (!this.useLazyLoading && this.hasFuse) {
        this.filterOptionsByFuse(value)
      }

      update()
    },

    filterOptionsByFuse (value) {
      if (value === '') {
        this.mx_filteredOptions = this.options
        return
      }

      const results = this.fuse.search(value)

      this.mx_filteredOptions = this.mx_getNormalizedFuseResults(results)
    },

    onPopupHide () {
      this.isPopupContentOpen = false
      this.$emit('popup-hide')
    },

    onPopupShow () {
      this.isPopupContentOpen = true
      this.$emit('popup-show')

      if (this.mx_isFetching) {
        this.togglePopupContentClass(true)
      }
    },

    setLazyLoading () {
      this.mx_setCachedOptions('options')

      if (this.useFetchOptionsOnCreate) this.mx_setFetchOptions('')
    },

    setSearchMethod () {
      if (this.useLazyLoading) return this.setLazyLoading()

      if (this.hasFuse) this.setFuse()
    },

    async togglePopupContentClass (force) {
      await this.$nextTick()

      const popupContentElement = document.querySelector(`.${this.popupContentClass}`)

      if (popupContentElement) {
        popupContentElement.classList.toggle('qas-select__is-fetching', force)
      }
    }
  }
}
</script>

<style lang="scss">
.qas-select {
  &__is-fetching {
    cursor: not-allowed !important;

    .q-virtual-scroll__content {
      pointer-events: none;

      .q-item {
        color: $grey-6;
      }
    }
  }

  &--closed {
    .q-field__native span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:not(.qas-select--loading) {
      .q-field__native .q-field__input {
        position: absolute;
        caret-color: transparent;
      }
    }
  }

  .q-field__prepend,
  .q-field__append {
    .q-icon {
      color: $grey-8;
    }
  }

  .q-field__focusable-action {
    opacity: 1;
  }

  .q-chip__icon--remove {
    color: $grey-9;
    opacity: 1;
  }
}
</style>
