<template>
  <qas-header-actions v-if="hasHeaderActions" align-columns="end">
    <template #left>
      <h3 v-if="title" class="text-h3">
        {{ title }}
      </h3>

      <div v-if="subtitle" class="text-body1 text-grey-8">
        {{ subtitle }}
      </div>
    </template>

    <template #right>
      <qas-filters v-bind="chartFiltersProps" />
    </template>
  </qas-header-actions>

  <div v-bind="parentComponentProps">
    <component :is="chartComponent.is" v-if="showChart" v-bind="chartComponent.props" />

    <div v-else-if="!isFetching">
      <slot name="empty-results">
        <qas-empty-result-text />
      </slot>
    </div>

    <q-inner-loading :showing="isFetching">
      <q-spinner color="grey" size="3em" />
    </q-inner-loading>
  </div>
</template>

<script>
// Importações do chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement
} from 'chart.js'
import { Bar as BarChart, Doughnut as DoughnutChart, Line as LineChart } from 'vue-chartjs'

// Configurações padrões
import { charts, colors as defaultColors, font } from './config'

// Plugins
import zoomPlugin from 'chartjs-plugin-zoom'
import chartDataLabels from 'chartjs-plugin-datalabels'

// Outras importações
import { extend } from 'quasar'
import { filterListByHandle } from '../../helpers'
import { getAction } from '@bildvitta/store-adapter'

const ChartTypes = {
  Bar: 'bar',
  Doughnut: 'doughnut',
  Line: 'line'
}

export default {
  name: 'QasChartView',

  components: {
    BarChart,
    DoughnutChart,
    LineChart
  },

  props: {
    beforeFetch: {
      default: null,
      type: Function
    },

    colorsList: {
      type: Array,
      default: () => []
    },

    entity: {
      required: true,
      type: String
    },

    fetching: {
      type: Boolean
    },

    filtersProps: {
      default: () => ({}),
      type: Object
    },

    height: {
      default: '380px',
      type: String
    },

    maxDoughnutSlices: {
      default: 15,
      type: Number
    },

    options: {
      default: () => ({}),
      type: Object
    },

    subtitle: {
      default: '',
      type: String
    },

    title: {
      default: '',
      type: String
    },

    type: {
      default: ChartTypes.Bar,
      type: String,
      validator: value => Object.values(ChartTypes).includes(value)
    },

    url: {
      default: '',
      type: String
    },

    useFilterButton: {
      type: Boolean
    }
  },

  emits: [
    'fetch-error',
    'fetch-success',
    'update:fetching'
  ],

  data () {
    return {
      cancelBeforeFetch: false,
      data: [],
      filters: {},
      isFetched: false,
      isFetching: false
    }
  },

  computed: {
    chartData () {
      if (!this.data.length) {
        return {
          labels: [],
          datasets: []
        }
      }

      const [dataset] = this.data
      const labels = this.getXAxisData(dataset.data.map(item => item.x))
      const colors = this.colorsList.length ? this.colorsList : defaultColors

      const datasets = this.data.map(({ label, data }, index) => {
        const backgroundColor = this.isDoughnut ? colors : colors.at(index)
        const borderColor = this.isDoughnut ? 'white' : colors.at(index)
        const yAxisData = []
        const xAxisData = []

        for (const dataKey in data) {
          const item = data[dataKey]

          if (item) {
            yAxisData.push(item.y)
            xAxisData.push(item.tooltip)
          }
        }

        return {
          backgroundColor,
          borderColor,
          data: this.getYAxisData(yAxisData),
          label,
          tooltips: this.getXAxisData(xAxisData)
        }
      })

      return {
        datasets,
        labels
      }
    },

    chartFiltersProps () {
      const { entity, useFilterButton, url } = this

      return {
        class: 'q-mb-xs',
        entity,
        url,
        useChip: false,
        useFilterButton,
        useSearch: false,
        useSpacing: false,
        useUpdateRoute: false,

        ...this.filtersProps,

        'onUpdate:currentFilters': filters => {
          this.filters = filters
          this.filtersProps['onUpdate:currentFilters']?.(filters)
        }
      }
    },

    chartOptions () {
      const { options, type } = this

      return extend(true, charts[type], options)
    },

    chartPlugins () {
      return filterListByHandle([
        {
          handle: this.isDoughnut,
          item: chartDataLabels
        },
        {
          handle: this.isBar || this.isLine,
          item: zoomPlugin
        }
      ])
    },

    chartType () {
      const components = {
        bar: 'BarChart',
        doughnut: 'DoughnutChart',
        line: 'LineChart'
      }

      return components[this.type]
    },

    chartComponent () {
      return {
        is: this.chartType,
        props: {
          data: this.chartData,
          options: this.chartOptions,
          plugins: this.chartPlugins
        }
      }
    },

    parentComponentProps () {
      return {
        class: 'relative-position',
        style: `min-height: ${this.height}`
      }
    },

    hasDataSets () {
      return !!this.chartData?.datasets.filter(dataset => dataset.data.length)?.length
    },

    hasHeaderActions () {
      return this.title || this.subtitle || this.useFilterButton
    },

    isBar () {
      return this.type === 'bar'
    },

    isDoughnut () {
      return this.type === 'doughnut'
    },

    isLine () {
      return this.type === 'line'
    },

    showChart () {
      return this.isFetched && this.hasDataSets
    },

    defaultChartItems () {
      return [
        CategoryScale,
        LinearScale,
        PointElement,
        Title,
        Tooltip,
        Legend
      ]
    },

    elementsChartItems () {
      return {
        bar: [BarElement],
        doughnut: [ArcElement],
        line: [LineElement]
      }
    }
  },

  watch: {
    filters () {
      this.handleFetchData()
    },

    isFetching (value) {
      this.$emit('update:fetching', value)
    }
  },

  created () {
    this.registerChartJS()
    this.handleFetchData()
  },

  beforeUnmount () {
    this.unregisterChartJS()
  },

  methods: {
    handleFetchData () {
      const hasBeforeFetch = typeof this.beforeFetch === 'function'
      const payload = {
        url: this.url,
        filters: this.filters
      }

      if (hasBeforeFetch && !this.cancelBeforeFetch) {
        return this.beforeFetch({
          payload,
          resolve: this.fetchData,
          done: () => {
            this.cancelBeforeFetch = true
          }
        })
      }

      this.fetchData(payload)
    },

    async fetchData (payload = {}) {
      try {
        this.isFetching = true

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchList',
          payload
        })

        const { results } = response.data
        this.data = results

        this.$emit('fetch-success', response)
      } catch (error) {
        this.$qas.error('Ops… Não conseguimos acessar as informações. Por favor, tente novamente em alguns minutos.')

        this.$emit('fetch-error', error)
      } finally {
        this.isFetching = false
        this.isFetched = true
      }
    },

    getXAxisData (data = []) {
      if (this.isDoughnut && data.length > this.maxDoughnutSlices) {
        data = data.slice(0, this.maxDoughnutSlices - 1)
        data.push('Outros')
      }

      return data
    },

    getYAxisData (data = []) {
      if (this.isDoughnut && data.length > this.maxDoughnutSlices) {
        const otherSlicesValues = data
          .slice(this.maxDoughnutSlices - 1)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        data = data.slice(0, this.maxDoughnutSlices - 1)
        data.push(otherSlicesValues)
      }

      return data
    },

    registerChartJS () {
      ChartJS.register(
        ...this.defaultChartItems,
        ...this.elementsChartItems[this.type]
      )

      ChartJS.defaults.font = font
    },

    unregisterChartJS () {
      ChartJS.unregister(
        ...this.defaultChartItems,
        ...this.elementsChartItems[this.type]
      )
    }
  }
}
</script>
