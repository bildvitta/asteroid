<template>
  <qas-header-actions v-if="hasHeaderActions" align-columns="end">
    <template #left>
      <div v-if="title" class="text-grey-9 text-h3">
        {{ title }}
      </div>

      <div v-if="subtitle" class="text-body1 text-grey-8">
        {{ subtitle }}
      </div>
    </template>

    <template #right>
      <qas-filters v-bind="chartFiltersProps" v-model:currentFilters="filters" />
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
import { charts, colors, font } from './config'

// Plugins
import zoomPlugin from 'chartjs-plugin-zoom'
import chartDataLabels from 'chartjs-plugin-datalabels'

// Outras importações
import { extend } from 'quasar'
import { filterListByHandle } from '../../helpers'
import { getAction } from '@bildvitta/store-adapter'

const CharTypes = {
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
      default: 'bar',
      type: String,
      validator: value => Object.values(CharTypes).includes(value)
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

        ...this.filtersProps
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
      this.fetchData()
    },

    isFetching (value) {
      this.$emit('update:fetching', value)
    }
  },

  created () {
    this.registerChartJS()
    this.fetchData()
  },

  unmounted () {
    this.unregisterChartJS()
  },

  methods: {
    async fetchData () {
      try {
        this.isFetching = true

        const response = await getAction.call(this, {
          entity: this.entity,
          key: 'fetchList',
          payload: {
            url: this.url,
            filters: this.filters
          }
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
