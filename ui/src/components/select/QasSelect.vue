<template>
  <q-select v-model="model" v-bind="attributes">
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

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-select>
</template>

<script>
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
        class: 'qas-select',
        clearable: this.isSearchable,
        dense: true,
        dropdownIcon: 'expand_more',
        emitValue: true,
        mapOptions: true,
        popupContentClass: this.popupContentClass,

        ...this.$attrs,

        error: this.hasError,
        loading: this.hasLoading,
        options: this.mx_filteredOptions,
        inputClass: this.inputClass,
        inputDebounce: this.useLazyLoading ? 1200 : 0,
        inputStyle: this.inputStyle,
        useInput: this.isSearchable,
        useChips: false,

        onPopupHide: this.onPopupHide,
        onPopupShow: this.onPopupShow,

        ...(this.isSearchable && { onFilter: this.onFilter }),

        ...(this.useLazyLoading && { onVirtualScroll: this.mx_onVirtualScroll })
      }
    },

    defaultFuseOptions () {
      return {
        ...fuseConfig,
        keys: ['label', 'value'],

        ...this.fuseOptions
      }
    },

    inputClass () {
      return [
        this.$attrs['input-class'] || this.$attrs.inputClass,
        {
          absolute: !this.isPopupContentOpen && !this.mx_isFetching
        }
      ]
    },

    inputStyle () {
      return [
        this.$attrs['input-style'] || this.$attrs.inputStyle,
        {
          'caret-color': !this.isPopupContentOpen ? 'transparent' : 'initial'
        }
      ]
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
    }
  },

  watch: {
    defaultFuseOptions () {
      if (this.hasFuse) this.setFuse()
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
    this.setIsFetchingWatcher()
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

    setIsFetchingWatcher () {
      if (this.useLazyLoading) {
        this.$watch('mx_isFetching', value => {
          if (!this.isPopupContentOpen) return

          this.togglePopupContentClass(value)
        })
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

  .q-field__native span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .q-field__prepend,
  .q-field__append {
    .q-icon {
      color: $grey-8;
    }
  }
}
</style>
