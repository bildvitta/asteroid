import QasUploader from './QasUploader.vue'

const descriptionUploader = `Uploading files through a component.<br>
                             This component implements QUploader https://quasar.dev/vue-components/uploader#Introduction <br>
                             Requires a back-end server to receive the files.<br>
                             Drag-and-drop compatible.<br>
                             Require axios https://www.npmjs.com/package/axios`

export default {
  title: 'Components/QasUpload',
  component: QasUploader,
  parameters: {
    docs: {
      description: {
        component: descriptionUploader
      }
    }
  },

  argTypes: {
    // props
    entity: {
      description: 'entity is used by the backend to know the type of file that is being sent to the bucket, the backend configures what these entities will be.Vuex entity.',
      defaultValue: {
        summary: null
      }
    },

    hint: {
      description: 'The hint message is displayed when there are errors and an error message'
    },

    maxFiles: {
      description: 'Maximum number of files to contain'
    },

    label: {
      description: 'Label for the uploader',
      defaultValue: {
        summary: '\'\''
      }
    },

    accept: {
      description: 'Comma separated list of unique file type specifiers. Maps to \'accept\' attribute of native input type=file element',
      defaultValue: {
        summary: null
      }
    },

    value: {
      description: 'value stores the type and name of the uploaded file',
      control: null
    },

    // event
    input: {
      description: 'raises an event that checks if a file exists if it does not return an empty array or \'\' ',
      defaultValue: {
        summary: '\'\''
      }
    }
  }

}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QasUploader },
  template:
    '<qas-uploader v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  entity: 'posts/image',
  label: 'image',
  accept: '.jpeg,.jpg,.png'
}
