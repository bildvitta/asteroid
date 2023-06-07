export const zoomPluginConfig = {
  limits: {
    x: { min: 'original', max: 'original' },
    y: { min: 'original', max: 'original' }
  },
  pan: {
    enabled: true,
    modifierKey: 'ctrl'
  },
  zoom: {
    wheel: {
      enabled: true,
      modifierKey: 'ctrl'
    },
    pinch: {
      enabled: true
    },
    mode: 'xy'
  }
}
