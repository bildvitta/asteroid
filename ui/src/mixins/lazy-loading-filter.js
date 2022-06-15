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
    }
  },

  data () {
    return {
      filteredOptions: [],
      hasFetchError: false,
      isLoading: false,
      isScrolling: false,
      pagination: {
        page: 1,
        lastPage: null
      },
      search: null
    }
  },

  computed: {
    $_defaultLazyLoadingProps () {
      const {
        url,
        params,
        decamelizeFieldName
      } = this.lazyLoadingProps

      const defaultParams = {
        limit: 48
      }

      return {
        url: url || '',
        params: {
          ...defaultParams,
          ...params
        },
        decamelizeFieldName: decamelizeFieldName === undefined ? true : decamelizeFieldName
      }
    },

    $_hasFilteredOptions () {
      return !!this.filteredOptions.length
    }
  },

  watch: {
    lazyLoadingProps: {
      handler (value, oldValue) {
        if (isEqual(value, oldValue)) return

        this.$_resetFilter()
        this.$emit('input', '')
      }
    }
  },

  methods: {
    async $_filterOptionsByStore (search) {
      this.$_resetFilter(search)
      await this.$_setFetchOptions()
    },

    $_resetFilter (search) {
      this.filteredOptions = []
      this.search = search
      this.pagination = {
        page: 1,
        lastPage: null
      }
    },

    async $_onVirtualScroll ({ index, ref }) {
      const lastIndex = this.filteredOptions.length - 1

      if (index === lastIndex && this.$_canFetchOptions()) {
        await this.$_loadMoreOptions()

        this.$nextTick(() => {
          ref.reset()
          ref.refresh(-1)
        })
      }
    },

    async $_loadMoreOptions () {
      this.isScrolling = true

      const options = await this.$_fetchOptions()
      this.filteredOptions.push(...options)

      // this is to prevent the virtual-scroll event to be fired again
      this.$nextTick(() => {
        this.isScrolling = false
      })
    },

    async $_fetchOptions () {
      try {
        if (!this.entity) throw new Error(this.$_getMissingPropsMessage('entity'))
        if (!this.name) throw new Error(this.$_getMissingPropsMessage('name'))

        this.hasFetchError = false

        this.isLoading = true
        this.$emit('fetching', true)

        const { url, params, decamelizeFieldName } = this.$_defaultLazyLoadingProps

        const { data } = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            ...params,
            search: this.search,
            offset: (this.pagination.page - 1) * params.limit
          }
        })

        const { results, count } = data

        this.pagination = {
          page: this.pagination.page + 1,
          lastPage: Math.ceil(count / params.limit)
        }

        this.$emit('fetch-options-success', data)

        return this.$_handleOptions(results)
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error)

        this.hasFetchError = true
        this.$emit('fetch-options-error', error)

        return []
      } finally {
        this.isLoading = false
        this.$emit('fetching', false)
      }
    },

    async $_setFetchOptions () {
      this.filteredOptions = await this.$_fetchOptions()
    },

    $_canFetchOptions () {
      const { lastPage, page } = this.pagination
      const hasMorePages = lastPage && page <= lastPage

      return hasMorePages && !this.isLoading && !this.isScrolling && this.useLazyLoading
    },

    $_handleOptions (options) {
      if (this.labelKey && this.valueKey && this.renameKey) {
        return options.map(item => this.renameKey(item))
      }

      return options
    },

    $_getMissingPropsMessage (prop) {
      return `A propriedade "${prop}" é obrigatória quando a propriedade "useLazyLoading" está ativa.`
    }
  }
}
