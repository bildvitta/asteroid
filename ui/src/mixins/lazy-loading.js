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
      isScrolling: false,
      hasFetchError: false,
      isFiltering: false,
      filteredOptions: [],
      filterPagination: {
        page: 1,
        lastPage: null
      },
      filterSearch: null
    }
  },

  computed: {
    virtualScrollClassName () {
      return `virtual-scroll-${this.name}`
    }
  },

  methods: {
    async filterOptionsByStore (value) {
      this.filteredOptions = []
      this.filterSearch = value
      this.filterPagination = {
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
        this.isFiltering = true

        const { url, params, decamelizeFieldName } = this.lazyLoadingProps

        const { data } = await this.$store.dispatch(`${this.entity}/fetchFieldOptions`, {
          url,
          field: decamelizeFieldName ? decamelize(this.name, { separator: '-' }) : this.name,
          params: {
            search: this.filterSearch,
            offset: (this.filterPagination.page - 1) * params.limit,
            ...params
          }
        })
        const { results, count } = data

        this.filterPagination = {
          page: this.filterPagination.page + 1,
          lastPage: Math.ceil(count / params.limit)
        }

        this.$emit('fetch-options-success', data)

        return results
      } catch (error) {
        this.hasFetchError = true
        this.$emit('fetch-options-error', error)
      } finally {
        this.isFiltering = false
      }
    },

    async onVirtualScroll ({ index }) {
      if (this.isScrolling) return

      const { scrollContainer, top } = this.getScrollContainerTop()
      const { lastPage, page } = this.filterPagination
      const lastIndex = this.filteredOptions.length - 1

      /**
       *  if the last page was not reached
       *  if the scroll container is at the bottom
       *  if it's not filtering
       */
      const canFetchOptions = lastPage && page <= lastPage && index === lastIndex && !this.isFiltering

      if (canFetchOptions) {
        this.isScrolling = true

        const options = await this.fetchOptions()
        this.filteredOptions.push(...options)

        // solution based on Quasar Select filtering
        setTimeout(() => {
          scrollContainer.scrollTo({
            top,
            behavior: 'smooth'
          })

          // this is to prevent the virtual-scroll event to be fired again after the scrollTo
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
      const afterOptionsSlotHeight = 22 // Height of the after-options slot element

      return {
        scrollContainer,
        top: scrollContainerTop + (scrollContainerHeight / 2) - afterOptionsSlotHeight
      }
    },

    missingPropMessage (prop) {
      return `A propriedade "${prop}" é obrigatória quando a propriedade "useLazyLoading" está ativa.`
    }
  }
}
