import { textColor } from '../defaults'
import { legendPluginConfig, tooltipPluginConfig, zoomPluginConfig } from '../plugins'

export const line = {
  borderSkipped: true,
  borderWidth: 2,
  color: textColor,
  maintainAspectRatio: false,
  pointStyle: false,
  responsive: true,

  layout: {
    padding: {
      left: -24
    }
  },

  plugins: {
    legend: legendPluginConfig,
    tooltip: tooltipPluginConfig,
    zoom: zoomPluginConfig
  },

  scales: {
    x: {
      border: {
        display: false
      },

      grid: {
        color: '#E0E0E0'
      },

      ticks: {
        padding: 8
      }
    },

    y: {
      beginAtZero: true,
      offset: true,

      border: {
        display: false
      },

      grid: {
        color: '#E0E0E0'
      },

      ticks: {
        padding: 24,
        stepSize: 1
      }
    }
  }
}
