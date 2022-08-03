import QasCard from './QasCard.vue'

const noSummary = {
  type: { summary: null }
}

export default {
  component: QasCard,
  title: 'Components/Card',

  parameters: {
    docs: {
      description: {
        component: 'Simple card component.'
      }
    }
  },

  argTypes: {
    // Props
    bgImagePosition: {
      description: 'Define a position of the background image.'
    },

    images: {
      description: 'List of images.'
    },

    gutter: {
      description: 'Gutter space by Quasar convention. `q-col-gutter-{$gutter}`.'
    },

    outlined: {
      description: 'Changes the component style.'
    },

    useHeader: {
      description: 'Shows the header section.'
    },

    // Slots
    actions: {
      description: 'Bottom section for actions.',
      table: noSummary
    },

    'carousel-header': {
      description: 'Header of the carousel section',
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
  components: { QasCard },
  props: Object.keys(argTypes),
  template:
  `<div class="q-col-gutter-md q-pa-md row">
    <qas-card :images="images" use-header>
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <q-icon color="primary" class="col-grow" name="o_edit" />
        <q-icon color="primary" class="col-grow" name="o_delete" />
        <q-icon color="primary" class="col-grow" name="o_photo_camera" />
      </template>
    </qas-card>
    <qas-card :images="images" use-header>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
    </qas-card>
    <qas-card :images="images" use-header>
      <template #default>
        <div>{{ result.name }}</div>
        <div>{{ result.email }}</div>
      </template>
      <template #actions>
        <div class="full-width">
          <div class="text-blue text-bold text-center">Ver mais</div>
        </div>
      </template>
    </qas-card>
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
      '<qas-card :images="images" :result="result" />'
    }
  }
}