import QasMap from './QasMap.vue'

export default {
  component: QasMap,
  title: 'Components/Map',

  parameters: {
    docs: {
      description: {
        component: 'Map component. This component\'s library needs to be initialized at boot of your system.'
      }
    }
  },

  argTypes: {
    // Props
    centerPosition: {
      description: 'Define the coordinate to centralize the position.'
    },

    hasSearch: {
      description: 'Show the search input.'
    },

    markers: {
      description: 'The list of objects that define and create the main markers in the map.'
    },

    showPopup: {
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
  '<qas-map :center-position="{lat: -21.17663, lng: -47.820839 }" has-search :markers="$_createMarker(marker, true)" show-info-window />'
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
      '<qas-map :center-position="{lat: -21.17663, lng: -47.820839 }" has-search :markers="$_createMarker(marker, true)" show-info-window  />'
    }
  }
}
