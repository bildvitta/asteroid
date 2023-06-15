import { textColor } from '../defaults'
import { legendPluginConfig, tooltipPluginConfig, zoomPluginConfig } from '../plugins'

export const line = {
  borderSkipped: true,
  borderWidth: 2,
  color: textColor,
  layout: {
    padding: {
      left: -24
    }
  },
  maintainAspectRatio: false,
  plugins: {
    legend: legendPluginConfig,
    tooltip: tooltipPluginConfig,
    zoom: zoomPluginConfig
  },
  pointStyle: false,
  responsive: true,
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
      border: {
        display: false
      },
      grid: {
        color: '#E0E0E0'
      },
      offset: true,
      ticks: {
        padding: 24,
        stepSize: 1
      }
    }
  }
}
