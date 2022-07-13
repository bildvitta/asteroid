import { decamelize } from 'humps'
import { isEqual } from 'lodash'

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
      mx_filteredOptions: [],
      mx_hasFetchError: false,
      mx_isLoading: false,
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

    mx_isFilterByFuse () {
      return !this.useLazyLoading
    }
  },

  watch: {
    lazyLoadingProps: {
      handler (value, oldValue) {
        if (isEqual(value, oldValue)) return

        this.mx_filterOptionsByStore('')
        this.$emit('update:modelValue', '')
      }
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

      console.log('kk eae man')

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
      try {
        if (!this.entity) this.mx_setMissingPropsMessage('entity')
        if (!this.name) this.mx_setMissingPropsMessage('name')

        this.mx_hasFetchError = false
        this.mx_isLoading = true

        this.$emit('update:fetching', true)

        const { params, decamelizeFieldName } = this.mx_defaultLazyLoadingProps
        // const { url, params, decamelizeFieldName } = this.mx_defaultLazyLoadingProps

        const { data } = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url: 'https://api-dev-produto.nave.dev/api/properties/options/property-holders',
          // url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            ...params,
            search: this.mx_search,
            offset: (this.mx_pagination.page - 1) * params.limit
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

        return this.mx_handleOptions(results)
      } catch (error) {
        this.$qas.logger.group(
          `Mixin: lazyLoadingFilter - mx_fetchOptions -> exceção da action ${this.entity}/fetchFieldOptions`,
          [error],
          { error: true }
        )

        this.mx_hasFetchError = true
        this.$emit('fetch-options-error', error)

        return []
      } finally {
        this.mx_isLoading = false
        this.$emit('update:fetching', true)
      }
    },

    async mx_setFetchOptions () {
      this.mx_filteredOptions = await this.mx_fetchOptions()
    },

    mx_canFetchOptions () {
      const { lastPage, page, hasCount, hasNextPage } = this.mx_pagination

      const hasMorePages = hasCount ? lastPage && page <= lastPage : hasNextPage

      return hasMorePages && !this.mx_isLoading && !this.mx_isScrolling && this.useLazyLoading
    },

    mx_handleOptions (options) {
      if (this.labelKey && this.valueKey && this.renameKey) {
        return options.map(item => this.renameKey(item))
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
      return results.map(result => result.item)
    }
  }
}
