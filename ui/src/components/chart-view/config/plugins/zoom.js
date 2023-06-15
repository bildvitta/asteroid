export const zoomPluginConfig = {
  limits: {
    x: {
      max: 'original',
      min: 'original'
    },
    y: {
      max: 'original',
      min: 'original'
    }
  },
  pan: {
    enabled: true,
    modifierKey: 'ctrl'
  },
  zoom: {
    mode: 'xy',
    pinch: {
      enabled: true
    },
    wheel: {
      enabled: true,
      modifierKey: 'ctrl'
    }
  }
}
