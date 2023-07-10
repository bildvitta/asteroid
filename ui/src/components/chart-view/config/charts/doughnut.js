import { tooltipPluginConfig } from '../plugins'
import { percent } from '../../../../helpers'

function getPercentFormat (value, context) {
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
  responsive: true,
  plugins: {
    datalabels: {
      color: 'white',
      font: {
        weight: 600
      },
      formatter: getPercentFormat
    },

    legend: {
      align: 'center',
      labels: {
        padding: 16,
        pointStyle: 'circle',
        usePointStyle: true
      },
      position: 'bottom'
    },

    tooltip: tooltipPluginConfig
  }
}
