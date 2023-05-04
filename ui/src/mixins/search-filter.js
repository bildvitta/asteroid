import { decamelize } from 'humps'
import { isEqual } from 'lodash'
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

    fetching: {
      type: Boolean
    },

    useLazyLoading: {
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
      mx_fetchCount: 0,
      mx_filteredOptions: [],
      mx_foundDuplicatedOptions: [],
      mx_fromSearch: false,
      mx_hasFetchError: false,
      mx_isFetching: false,
      mx_isScrolling: false,
      mx_search: '',
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

    mx_isMultiple () {
      return this.$attrs.multiple || this.$attrs.multiple === ''
    }
  },

  watch: {
    lazyLoadingProps: {
      handler (value, oldValue) {
        if (isEqual(value, oldValue)) return

        this.mx_filterOptionsByStore('')

        this.$emit('update:modelValue', this.mx_isMultiple ? [] : '')
      }
    }
  },

  methods: {
    async mx_filterOptionsByStore (search) {
      this.mx_resetFilter(search)

      this.mx_fromSearch = !!search

      await this.mx_setFetchOptions()

      if (this.mx_cachedOptions.length && !search) this.mx_setInitialCachedOptions()
    },

    mx_resetFilter (search) {
      this.mx_filteredOptions = []
      this.mx_foundDuplicatedOptions = []
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
      } catch (error) {
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

      this.mx_filteredOptions.push(...options)
    },

    mx_setInitialCachedOptions () {
      this.mx_cachedOptions.forEach(cachedOption => {
        const hasOption = this.mx_filteredOptions.find(filteredOption => {
          return filteredOption.value === cachedOption.value
        })

        if (!hasOption && this.mx_filteredOptions.length) {
          this.mx_filteredOptions.unshift(cachedOption)
        }
      })
    },

    mx_getNonDuplicatedOptions (options = []) {
      if (this.mx_fromSearch) {
        this.mx_fromSearch = false

        return options
      }

      if (!options.length) return []

      const nonDuplicatedOptions = [...options]

      this.mx_cachedOptions.forEach(cachedOption => {
        if (this.mx_foundDuplicatedOptions.includes(cachedOption.value)) return

        const duplicatedOptionIndex = nonDuplicatedOptions.findIndex(option => {
          return option.value === cachedOption.value
        })

        if (~duplicatedOptionIndex) {
          this.mx_foundDuplicatedOptions.push(cachedOption.value)
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

    mx_getMissingPropsMessage (prop) {
      return `A propriedade "${prop}" é obrigatória quando a propriedade "useLazyLoading" está ativa.`
    },

    mx_setMissingPropsMessage (prop) {
      throw new Error(this.mx_getMissingPropsMessage(prop))
    },

    mx_getNormalizedFuseResults (results = []) {
      return results.map(({ item }) => item)
    },

    mx_setCachedOptions (model) {
      this.$watch(model, options => {
        if (!options?.length) return

        this.mx_filteredOptions = [...options]
        this.mx_cachedOptions = [...options]
      }, { immediate: true })
    }
  }
}
