import { textColor } from '../defaults'
import { legendPluginConfig, tooltipPluginConfig, zoomPluginConfig } from '../plugins'

export const bar = {
  barPercentage: 0.7,
  borderSkipped: true,
  borderWidth: 2,
  color: textColor,
  maintainAspectRatio: false,
  plugins: {
    legend: legendPluginConfig,
    tooltip: tooltipPluginConfig,
    zoom: zoomPluginConfig
  },
  responsive: true,
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        padding: 8
      }
    },
    y: {
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        stepSize: 1
      }
    }
  }
}
