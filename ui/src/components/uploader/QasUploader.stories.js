import QasUploader from './QasUploader.vue'

const hides = {
  table: { disable: true }
}

export default {
  component: QasUploader,
  title: 'Components/Upload',

  parameters: {
    docs: {
      description: {
        component: 'Extends [QUploader](https://quasar.dev/vue-components/uploader). Require [Axios](https://github.com/axios/axios) to async upload files to server.'
      }
    }
  },

  argTypes: {
    // Props
    accept: hides,

    entity: {
      description: 'Used by server to know where to store files in the assets bucket.'
    },

    hint: {
      description: 'Help text.'
    },

    label: hides,

    maxFiles: {
      description: 'Max number of files to select.'
    },

    value: {
      control: null,
      description: 'File object.'
    },

    errorMessage: {
      description: 'Error message.'
    },

    picaResizeOptions: {
      description: 'Node [pica](https://github.com/nodeca/pica) resize method options.',
      table: {
        defaultValue: {
          detail: JSON.stringify({
            unsharpAmount: 160,
            unsharpRadius: 0.6,
            unsharpThreshold: 1
          })
        }
      }
    },

    acceptResizeTypes: {
      description: 'Accepted file types to resize.'
    },

    sizeLimit: {
      description: 'Max file size in pixels.'
    },

    useResize: {
      description: 'Enable resizer image to fit the sizeLimit.'
    },

    // Events
    input: {
      description: 'Fires when files change.'
    },

    // Slots
    'custom-upload': {
      description: 'Replace `QasUploader` component. The `context` will give access to all the functions and attributes of the component.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ context: 'object' }),
          summary: '{}'
        },

        type: { summary: null }
      }
    },

    header: {
      description: 'Slot in case you want to customize the `QasUploader` header.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ scope: 'object' }),
          summary: '{}'
        },

        type: { summary: null }
      }
    },

    list: {
      description: 'Slot if you want to customize the content that contains the file listing.',
      table: {
        defaultValue: {
          detail: JSON.stringify({ scope: 'object' }),
          summary: '{}'
        },

        type: { summary: null }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { QasUploader },
  props: Object.keys(argTypes),
  template:
    `<div>
      <qas-uploader v-bind="$props" />
      <qas-uploader v-bind="$props">
        <template #custom-upload="{ context }">
          <q-btn color="primary" flat no-caps @click="context.dispatchUpload">
            <q-circular-progress v-if="context.isFetching" class="q-mr-sm" color="primary" indeterminate size="20px" />
            <q-icon class="q-mr-sm" name="o_camera_alt" />
            Fazer upload
          </q-btn>
        </template>
      </qas-uploader>
    </div>`
})

export const Default = Template.bind({})

Default.args = {
  accept: '.jpg,.jpeg,.png',
  entity: 'posts/image',
  label: 'Image'
}