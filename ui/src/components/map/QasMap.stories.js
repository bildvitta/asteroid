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
    },

    // Slots
    actions: {
      description: 'Bottom section for actions.',
      table: noSummary
    },

    default: {
      description: 'Main content.',
      table: noSummary
    },

    header: {
      description: 'Header content.',
      table: noSummary
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasMap },
  props: Object.keys(argTypes),
  template:
  `<div class="q-col-gutter-md q-pa-md row">
    <qas-Map :images="images" use-header>
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <q-icon color="primary" class="col-grow" name="o_edit" />
        <q-icon color="primary" class="col-grow" name="o_delete" />
        <q-icon color="primary" class="col-grow" name="o_photo_camera" />
      </template>
    </qas-Map>
    <qas-Map :images="images" use-header>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    </qas-Map>
    <qas-Map :images="images" use-header>
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <div class="full-width">
          <div class="text-blue text-bold text-center">Ver mais</div>
        </div>
      </template>
    </qas-Map>
  </div>`
})

const images = [
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/10/10/12/54/space-1728314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg'
]

const result = {
  name: 'John Appleseed',
  email: 'john.appleseed@example.com',
  phone: '99999999999',
  gender: 'Male',
  document: '99999999999',
  address: '747 Austen View'
}

export const Default = Template.bind({})
Default.args = {
  images,
  result
}

Default.parameters = {
  docs: {
    source: {
      code:
      '<qas-Map :images="images" :result="result" />'
    }
  }
}
