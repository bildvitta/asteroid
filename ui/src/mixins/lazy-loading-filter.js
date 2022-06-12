import { decamelize } from 'humps'

export default {
  props: {
    entity: {
      default: '',
      type: String
    },

    lazyLoadingProps: {
      default: () => ({
        url: '',
        params: {
          limit: 24
        },
        decamelizeFieldName: true
      }),
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
      hasFetchError: false,
      isScrolling: false,
      isLoading: false,
      filteredOptions: [],
      pagination: {
        page: 1,
        lastPage: null
      },
      search: null
    }
  },

  computed: {
    hasFilteredOptions () {
      return !!this.filteredOptions.length
    },

    virtualScrollClassName () {
      return `virtual-scroll-${this.name}`
    }
  },

  methods: {
    async filterOptionsByStore (value) {
      this.filteredOptions = []
      this.search = value
      this.pagination = {
        page: 1,
        lastPage: null
      }
      this.filteredOptions = await this.fetchOptions()
    },

    async fetchOptions () {
      try {
        if (!this.entity) throw new Error(this.missingPropMessage('entity'))
        if (!this.name) throw new Error(this.missingPropMessage('name'))

        this.hasFetchError = false
        this.isLoading = true

        const { url, params, decamelizeFieldName } = this.lazyLoadingProps

        const { data } = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            search: this.search,
            offset: (this.pagination.page - 1) * params.limit,
            ...params
          }
        })

        const { results, count } = data

        this.pagination = {
          page: this.pagination.page + 1,
          lastPage: Math.ceil(count / params.limit)
        }

        this.$emit('fetch-options-success', data)

        return this.handleOptions(results)
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-options-error', error)
      } finally {
        this.isLoading = false
      }
    },

    async onVirtualScroll ({ index }) {
      if (this.isScrolling) return

      const { scrollContainer, top } = this.getScrollContainerTop()
      const { lastPage, page } = this.pagination
      const lastIndex = this.filteredOptions.length - 1

      /**
       *  if the last page was not reached
       *  if the scroll container is at the bottom
       *  if it's not filtering
       */
      const canFetchOptions = lastPage && page <= lastPage && index === lastIndex && !this.isLoading

      if (canFetchOptions) {
        this.isScrolling = true

        const options = await this.fetchOptions()
        this.filteredOptions.push(...options)

        // solution based on Quasar Select filtering
        setTimeout(() => {
          scrollContainer.scrollTo({ top })

          // this is to prevent the virtual-scroll event to be fired again
          this.$nextTick(() => {
            this.isScrolling = false
          })
        }, 100)
      }
    },

    getScrollContainerTop () {
      const scrollContainer = document.querySelector(`.${this.virtualScrollClassName}`)
      const scrollContainerHeight = scrollContainer.offsetHeight
      const scrollContainerTop = scrollContainer.scrollTop

      return {
        scrollContainer,
        top: scrollContainerTop + (scrollContainerHeight / 2)
      }
    },

    handleOptions (options) {
      if (this.labelKey && this.valueKey && this.renameKey) {
        return options.map(item => this.renameKey(item))
      }

      return options
    },

    missingPropMessage (prop) {
      return `A propriedade "${prop}" é obrigatória quando a propriedade "useLazyLoading" está ativa.`
    }
  }
}
