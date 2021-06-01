import QasMap from './QasMap.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasMap,
  title: 'Components/Map',

  parameters: {
    docs: {
      description: {
        component: 'Map component.'
      }
    }
  },

  argTypes: {
    // Props
    centerFocus: {
      description: 'Define the coordinate to centralize the focus.'
    },

    hasSearch: {
      description: 'Show the search input.'
    },

    markers: {
      description: 'The list of objects that define and create the main markers in the map.'
    },

    secondMarkers: {
      description: 'The list of objects that define and create the second markers in the map.'
    },

    showInfoWindow: {
      description: 'Shows the popup message on top of the marker.'
    },

    zoom: {
      description: 'Define the initial zoom.'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasMap },
  props: Object.keys(argTypes),
  template:
  '<qas-map :center-focus="{lat: -21.17663, lng: -47.820839 }" has-search :markers="$_createMarker(marker, true)" show-info-window />'
})

const marker = {
  position: { lat: -21.17663, lng: -47.820839 },
  title: 'Teste do componente QasMap',
  description: 'Ribeirão Preto',
  draggable: true
}

export const Default = Template.bind({})
Default.args = {
  marker
}

Default.parameters = {
  docs: {
    source: {
      code:
      '<qas-map :center-focus="{lat: -21.17663, lng: -47.820839 }" has-search :markers="$_createMarker(marker, true)" show-info-window  />'
    }
  }
}
