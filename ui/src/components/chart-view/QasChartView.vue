<template>
  <div v-bind="componentProps">
    <component :is="chartType" v-if="showChart" v-bind="chartProps" />

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
      validator: value => ['bar', 'doughnut', 'line'].includes(value)
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
        const borderColor = this.isDoughnut ? '#FFFFFF' : colors.at(index)

        return {
          backgroundColor,
          borderColor,
          data: this.getYAxisData(data.map(item => item.y)),
          label,
          tooltips: this.getXAxisData(data.map(item => item.tooltip))
        }
      })

      return {
        datasets,
        labels
      }
    },

    chartFilters () {
      const { entity, useFilterButton, url } = this

      return {
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

    chartProps () {
      return {
        data: this.chartData,
        options: this.chartOptions,
        plugins: this.chartPlugins
      }
    },

    chartType () {
      const components = {
        bar: 'BarChart',
        doughnut: 'DoughnutChart',
        line: 'LineChart'
      }

      return components[this.type]
    },

    componentProps () {
      return {
        class: 'relative-position',
        style: `min-height: ${this.height}`
      }
    },

    hasDataSets () {
      return !!this.chartData?.datasets.filter(dataset => dataset.data.length)?.length
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
    }
  },

  watch: {
    filters: {
      handler () {
        this.fetchData()
      }
    },

    isFetching (value) {
      this.$emit('update:fetching', value)
    }
  },

  created () {
    this.setInitialConfig()
    this.fetchData()
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

    setInitialConfig () {
      const defaultChartItems = [
        CategoryScale,
        LinearScale,
        PointElement,
        Title,
        Tooltip,
        Legend
      ]

      const elementsChartItems = {
        bar: [BarElement],
        doughnut: [ArcElement],
        line: [LineElement]
      }

      ChartJS.register(
        ...defaultChartItems,
        ...elementsChartItems[this.type]
      )

      ChartJS.defaults.font = font
    }
  }
}
</script>