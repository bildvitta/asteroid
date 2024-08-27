<template>
  <q-select v-model="model" v-bind="attributes" class="qas-select" :class="componentClasses" no-error-icon :outlined="false">
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
      <qas-badge removable :tabindex @remove="removeAtIndex(index)">
        <div class="ellipsis" :title="opt.label">
          {{ opt.label }}
        </div>
      </qas-badge>
    </template>

    <template v-if="useCustomOption" #option="scope">
      <q-item v-bind="scope.itemProps" class="qas-select__option">
        <q-item-section>
          <div class="items-center q-gutter-x-sm row">
            <q-item-label>{{ scope.opt.label }}</q-item-label>

            <div v-for="(badge, index) in getFilteredBadgeList(scope.opt)" :key="index">
              <qas-badge v-if="canShowBadge(badge)" v-bind="getBadgeProps(badge)" />
            </div>
          </div>

          <div v-if="scope.opt.caption">
            <div v-if="isCaptionArray(scope.opt.caption)" class="items-center q-col-gutter-x-sm row">
              <q-item-label v-for="(caption, index) in scope.opt.caption" :key="index" caption class="items-center q-mt-xs row">
                <div>{{ caption }}</div>

                <q-separator v-if="!isLastCaption({ caption: scope.opt.caption, index })" class="q-ml-sm" vertical />
              </q-item-label>
            </div>

            <q-item-label v-else caption class="q-mt-xs">{{ scope.opt.caption }}</q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template v-for="(_, name) in $slots" #[name]="context">
      <slot :name="name" v-bind="context || {}" />
    </template>
  </q-select>
</template>

<script>
import { getRequiredLabel } from '../../helpers'
import { searchFilterMixin } from '../../mixins'
import fuseConfig from '../../shared/fuse-config'

import { uid } from 'quasar'
import Fuse from 'fuse.js'

export default {
  name: 'QasSelect',

  mixins: [searchFilterMixin],

  props: {
    badgeProps: {
      default: () => ({}),
      type: Object
    },

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

    useAutoSelect: {
      type: Boolean
    },

    useCustomOption: {
      type: Boolean
    },

    useFetchOptionsOnCreate: {
      default: true,
      type: Boolean
    },

    useFetchOptionsOnFocus: {
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
        clearable: this.isSearchable,
        emitValue: true,
        mapOptions: true,
        outlined: true,
        dense: true,
        dropdownIcon: 'sym_r_expand_more',
        clearIcon: 'sym_r_close',
        popupContentClass: `qas-select__menu ${this.popupContentClass}`,
        useChips: this.isMultiple && this.isPopupContentOpen,

        ...this.$attrs,

        label: this.formattedLabel,
        error: this.hasError,
        inputDebounce: this.useLazyLoading ? 1200 : 0,
        loading: this.hasLoading,
        options: this.mx_filteredOptions,
        useInput: this.isSearchable,

        ...(this.isSearchable && { onFilter: this.onFilter }),

        onPopupHide: this.onPopupHide,
        onPopupShow: this.onPopupShow,

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
    },

    canSetDefaultOption () {
      return (this.required || this.useAutoSelect) && this.options.length === 1 && !this.modelValue
    },

    // redesign
    componentClasses () {
      return {
        'qas-select--has-icon': this.isSearchable || this.hasAppend,
        'qas-select--closed': !this.isPopupContentOpen,
        'qas-select--loading': this.hasLoading
      }
    },

    isDisabled () {
      return this.$attrs.disable || this.$attrs.disable === ''
    },

    isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    },

    hasAppend () {
      return !!this.$slots.append
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

    required () {
      if (!this.canSetDefaultOption) return

      this.setDefaultOption()
    },

    options: {
      handler () {
        if (this.useLazyLoading && this.mx_hasFilteredOptions) return

        if (this.fuse || this.hasFuse) this.setFuse()

        if (this.canSetDefaultOption) this.setDefaultOption()

        this.mx_filteredOptions = [...this.options]
      },

      deep: true,
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

      if (this.useFetchOptionsOnFocus && this.mx_fetchCount === 0) {
        this.mx_setFetchOptions('')
      }

      if (this.mx_isFetching) {
        this.togglePopupContentClass(true)
      }
    },

    setLazyLoading () {
      this.mx_setCachedOptions('options')

      if (this.useFetchOptionsOnCreate && !this.useFetchOptionsOnFocus) this.mx_setFetchOptions('')
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
    },

    setDefaultOption () {
      const modelValue = this.attributes.emitValue
        ? this.options[0].value
        : this.options[0]

      this.$emit('update:modelValue', modelValue)
    },

    getFilteredBadgeList ({ label, value, disable, caption, ...rest }) {
      const badgeList = Object.entries(rest).map(([key, value]) => ({ [key]: value }))

      return badgeList.filter(item => Object.keys(this.badgeProps).includes(Object.keys(item)[0]))
    },

    getBadgeProps (badge) {
      const model = Object.keys(badge)[0]

      return this.badgeProps[model](badge[model])
    },

    canShowBadge (badge) {
      const model = Object.keys(badge)[0]

      return badge[model] || this.getBadgeProps(badge).show
    },

    isCaptionArray (caption) {
      return Array.isArray(caption)
    },

    isLastCaption ({ caption, index }) {
      return index === caption.length - 1
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

  &__menu {
    .q-item {
      font-weight: 400 !important;
    }
  }

  &__option:hover .q-item__label--caption {
    color: var(--q-primary);
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

  .q-chip {
    font-size: 11px;
  }

  .q-chip__icon--remove {
    opacity: 1;
  }
}
</style>
