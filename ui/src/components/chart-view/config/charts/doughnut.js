import { tooltipPluginConfig } from '../plugins'
import { percent } from '../../../../helpers'

function percentageFormat (value, context) {
  const total = context.dataset.data.reduce((accumulator, currentValue, index) => {
    if (context.chart._hiddenIndices?.[index]) return accumulator

    return accumulator + currentValue
  }, 0)

  const percentage = (value * 100) / total
  const places = percentage % 1 ? 2 : 0

  return percentage >= 5 ? percent(percentage, places) : ''
}

export const doughnut = {
  borderSkipped: true,
  borderWidth: 1,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: 'white',
      font: {
        weight: 600
      },
      formatter: percentageFormat
    },
    legend: {
      align: 'center',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16
      },
      position: 'bottom'
    },
    tooltip: tooltipPluginConfig
  },
  responsive: true
}

export const maxDoughnutSlices = 15
