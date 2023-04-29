import { decamelize } from 'humps'
import { isEqual } from 'lodash'
import { getNormalizedOptions } from '../helpers'
import { getAction } from '@bildvitta/store-adapter'

export default {
  props: {
    entity: {
      default: '',
      type: String
    },

    lazyLoadingProps: {
      default: () => ({}),
      type: Object
    },

    name: {
      default: '',
      type: String
    },

    useLazyLoading: {
      type: Boolean
    },

    fetching: {
      type: Boolean
    }
  },

  emits: [
    'update:modelValue',
    'update:fetching',
    'fetch-options-success',
    'fetch-options-error'
  ],

  data () {
    return {
      mx_cachedOptions: [],
      mx_watchOnceOptions: () => {},
      mx_filteredOptions: [],
      mx_hasFetchError: false,
      mx_isFetching: false,
      mx_isScrolling: false,
      mx_search: '',
      mx_fetchCount: 0,
      mx_pagination: {
        page: 1,
        lastPage: null,
        hasCount: true,
        hasNextPage: false
      }
    }
  },

  computed: {
    mx_defaultLazyLoadingProps () {
      const {
        url,
        params,
        decamelizeFieldName
      } = this.lazyLoadingProps

      const defaultParams = { limit: 48 }

      return {
        url: url || '',
        params: {
          ...defaultParams,
          ...params
        },
        decamelizeFieldName: decamelizeFieldName === undefined ? true : decamelizeFieldName
      }
    },

    mx_hasFilteredOptions () {
      return !!this.mx_filteredOptions.length
    },

    mx_isFilterByFuse () {
      return !this.useLazyLoading
    },

    mx_isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    }
  },

  created () {
    this.mx_setOptionsWatcherOnce()
  },

  watch: {
    lazyLoadingProps: {
      handler (value, oldValue) {
        if (isEqual(value, oldValue)) return

        this.mx_filterOptionsByStore('')

        this.$emit('update:modelValue', this.mx_isMultiple ? [] : '')
      }
    },

    list: {
      handler () {
        console.log('aff')
      },

      immediate: true,
      deep: true
    }
  },

  methods: {
    async mx_filterOptionsByStore (search) {
      this.mx_resetFilter(search)
      await this.mx_setFetchOptions()
    },

    mx_resetFilter (search) {
      this.mx_filteredOptions = []
      this.mx_search = search
      this.mx_pagination = {
        page: 1,
        lastPage: null,
        hasCount: true,
        hasNextPage: false
      }
    },

    async mx_onVirtualScroll ({ index, ref }) {
      const lastIndex = this.mx_filteredOptions.length - 1

      if (index === lastIndex && this.mx_canFetchOptions()) {
        await this.mx_loadMoreOptions()

        this.$nextTick(() => {
          ref.reset()
          ref.refresh(lastIndex)
        })
      }
    },

    async mx_loadMoreOptions () {
      this.mx_isScrolling = true

      const options = await this.mx_fetchOptions()
      this.mx_filteredOptions.push(...options)

      // this is to prevent the virtual-scroll event to be fired again
      this.$nextTick(() => {
        this.mx_isScrolling = false
      })
    },

    async mx_fetchOptions () {
      this.mx_fetchCount++

      try {
        if (!this.entity) this.mx_setMissingPropsMessage('entity')
        if (!this.name) this.mx_setMissingPropsMessage('name')

        this.mx_hasFetchError = false
        this.mx_isFetching = true

        this.$emit('update:fetching', true)

        const { url, params, decamelizeFieldName } = this.mx_defaultLazyLoadingProps

        const { data } = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchFieldOptions',
          payload: {
            url,
            field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
            params: {
              ...params,
              search: this.mx_search,
              offset: (this.mx_pagination.page - 1) * params.limit
            }
          }
        })

        const { results, count, hasNextPage } = data
        const hasCount = count !== undefined

        this.mx_pagination = {
          page: this.mx_pagination.page + 1,
          lastPage: hasCount ? Math.ceil(count / params.limit) : null,
          hasCount,
          hasNextPage
        }

        this.$emit('fetch-options-success', data)

        return this.mx_getNonDuplicatedOptions(results)
        // return this.mx_handleOptions(results)
      } catch (error) {
        this.$qas.logger.group(
          `Mixin: searchFilterMixin - mx_fetchOptions -> exceção da action ${this.entity}/fetchFieldOptions`,
          [error],
          { error: true }
        )

        this.mx_hasFetchError = true
        this.$emit('fetch-options-error', error)

        return []
      } finally {
        this.mx_isFetching = false
        this.$emit('update:fetching', false)
      }
    },

    async mx_setFetchOptions () {
      const options = await this.mx_fetchOptions()

      // this.mx_cachedOptions.forEach((cachedOption, cachedIndex) => {
      //   const duplicatedOptionIndex = options.findIndex(option => option.value === cachedOption.value)
      //   console.log('🚀 ~ file: search-filter.js:212 ~ this.mx_cachedOptions.forEach ~ duplicatedOptionIndex:', duplicatedOptionIndex)

      //   if (~duplicatedOptionIndex) {
      //     this.mx_cachedOptions.splice(cachedIndex, 1)
      //     options.splice(duplicatedOptionIndex, 1)
      //   }
      // })

      this.mx_filteredOptions.push(...options)
      // this.mx_filteredOptions = await this.mx_fetchOptions()
    },

    mx_getNonDuplicatedOptions (options = []) {
      if (!options.length) return []

      const nonDuplicatedOptions = [...options]

      this.mx_cachedOptions.forEach((cachedOption, cachedIndex) => {
        const duplicatedOptionIndex = nonDuplicatedOptions.findIndex(option => option.value === cachedOption.value)

        if (~duplicatedOptionIndex) {
          this.mx_cachedOptions.splice(cachedIndex, 1)
          nonDuplicatedOptions.splice(duplicatedOptionIndex, 1)
        }
      })

      return nonDuplicatedOptions
    },

    mx_canFetchOptions () {
      const { lastPage, page, hasCount, hasNextPage } = this.mx_pagination

      const hasMorePages = hasCount ? lastPage && page <= lastPage : hasNextPage

      return hasMorePages && !this.mx_isFetching && !this.mx_isScrolling && this.useLazyLoading
    },

    mx_handleOptions (options) {
      if (this.labelKey && this.valueKey) {
        return getNormalizedOptions({
          options,
          label: this.labelKey,
          value: this.valueKey
        })
      }

      return options
    },

    mx_getMissingPropsMessage (prop) {
      return `A propriedade "${prop}" é obrigatória quando a propriedade "useLazyLoading" está ativa.`
    },

    mx_setMissingPropsMessage (prop) {
      throw new Error(this.mx_getMissingPropsMessage(prop))
    },

    mx_getNormalizedFuseResults (results = []) {
      return results.map(({ item }) => item)
    },

    mx_setOptionsWatcherOnce () {
      this.$watch('list', options => {
        console.log('🚀 ~ file: search-filter.js:286 ~ mx_setOptionsWatcherOnce ~ list:', this.list)
        if (options?.length) {
          // this.options.forEach()
          this.$nextTick(() => {
            console.log('fui chamado no nextick')
          })
          this.mx_filteredOptions = options
          this.mx_cachedOptions = [...options]
          // logica
          // this.mx_watchOnceOptions()
        }
      }, { immediate: true })
    }
  }
}
